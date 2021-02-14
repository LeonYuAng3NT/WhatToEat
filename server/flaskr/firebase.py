import logging
import os

from flask import Flask, jsonify, request
import flask_cors
from google.appengine.ext import ndb
import google.auth.transport.requests
import google.oauth2.id_token
import requests_toolbelt.adapters.appengine

# Use the App Engine Requests adapter. This makes sure that Requests uses
# URLFetch.
requests_toolbelt.adapters.appengine.monkeypatch()
HTTP_REQUEST = google.auth.transport.requests.Request()

app = Flask(__name__)
flask_cors.CORS(app)


class Order(ndb.Model):
    """NDB model class for a user's note.
    Key is user id from decrypted token.
    """
    friendly_id = ndb.StringProperty()
    message = ndb.TextProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

def schedule_recommandation(request):
    """Responds to any HTTP request.

    """
    request_json = request.get_json()
    if request.args and 'order' in request.args:
        return request.args.get('order')
    elif request_json and 'order' in request_json:
        return request_json['order']
    else:
        return schedule


# [START gae_python_query_database]
def query_database(user_id):
    """Fetches all notes associated with user_id.
    Notes are ordered them by date created, with most recent note added
    first.
    """
    ancestor_key = ndb.Key(Note, user_id)
    query = Note.query(ancestor=ancestor_key).order(-Note.created)
    orders = query.fetch()
    result = schedule_recommandation(jsonify(order))
    note_messages = []

    for order in order:
        note_messages.append({
            'friendly_id': order.friendly_id,
            'order': order.message,
            'time_created': order.created
        })

    return note_messages



@app.route('/orders', methods=['GET'])
def list_orders():
    """Returns a list of orders added by the current Firebase user."""

    # Verify Firebase auth.
    # [START gae_python_verify_token]
    id_token = request.headers['Authorization'].split(' ').pop()

    claims = google.oauth2.id_token.verify_firebase_token(
        id_token, HTTP_REQUEST, audience=os.environ.get('GOOGLE_CLOUD_PROJECT'))
    if not claims:
        return 'Unauthorized', 401
    # [END gae_python_verify_token]

    notes = query_database(claims['sub'])

    return jsonify(notes)


@app.route('/orders', methods=['POST', 'PUT'])
def add_note():
    """
    Adds a order to the user's notebook. The request should be in this format:
        {
            "message": "note message."
        }
    """

    # Verify Firebase auth.
    id_token = request.headers['Authorization'].split(' ').pop()
    claims = google.oauth2.id_token.verify_firebase_token(
        id_token, HTTP_REQUEST, audience=os.environ.get('GOOGLE_CLOUD_PROJECT'))
    if not claims:
        return 'Unauthorized', 401

    # [START gae_python_create_entity]
    data = request.get_json()

    # Populates order properties according to the model,
    # with the user ID as the key name.
    order = Order(
        parent=ndb.Key(Order, claims['sub']),
        message=data['message'])

    # Some providers do not provide one of these so either can be used.
    order.friendly_id = claims.get('name', claims.get('email', 'Unknown'))
    # [END gae_python_create_entity]

    # Stores order in database.
    order.put()

    return 'OK', 200


@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500