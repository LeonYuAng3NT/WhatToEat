import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground
} from 'react-native';

// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';

import Img from '../components/Img';
import { Card } from '../components';


const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class OrderGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      'switch-1': true,
      'switch-2': false,
    };
  }



  toggleSwitch = switchId => this.setState({ [switchId]: !this.state[switchId] });

  renderButtons = () => {
    const { navigation } = this.props;
    return (
      <Block flex>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Button textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
              style={styles.button}
              onPress={() => navigation.navigate('NetworkGroup')}
            >
              ORDER NOW!
            </Button>
          </Block>
        </Block>
      </Block>
    );
  };

  renderText = () => {
    return (
      <Block flex style={styles.group} center>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular' }} >
            Order with this group to save on shared expenses.
          </Text>
        </Block>
      </Block>
    );
  };

  renderCards = () => {
    scrollX = new Animated.Value(0);
    cards = [articles[5], articles[6], articles[7]]
    return (
      <Block flex style={styles.group}>
        <ScrollView
          horizontal={true}
          style={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            width: width * 3
          }}>
          {cards.map((item, index) => {
            return <Card key={index} item={item} full titleStyle={styles.productTitle} imageStyle={ { height: 300, width: '100%', resizeMode: 'contain' } }/>
          })}
        </ScrollView>

      </Block>

    );
  };
  render() {
    
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          {this.renderCards()}
          {this.renderButtons()}
          {this.renderText()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontal: 10
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18
  }
});

export default OrderGroup;
