import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground
} from 'react-native';

import Articles from '../screens/Articles';
// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';
import Img from '../components/Img';
import { Card } from '../components';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const supportedURL = "https://discord.gg/R4CRU4Qf";
const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <Button  color="info"
    textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
    style={styles.button} title={children} onPress={handlePress} />;
  };
  
class Group extends React.Component {
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
          <OpenURLButton
              url={supportedURL}
            >
              Join Discord Channel
            </OpenURLButton>
          </Block>
        
          <Block center>
            <Button
              color="info"
              onPress={() => navigation.navigate('OrderSolo')}
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
              style={styles.button}
            >
              Order Now
            </Button>
          </Block>
          <Block center>
            <Button
              color="info"
              onPress={() => navigation.navigate('OrderGroup')}
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
           
              style={styles.button}
            >
              Order Now with the Group
            </Button>
          </Block>
        </Block>
    </Block>
    );
  };
 
  renderSwitches = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block row middle space="between" style={{ marginBottom: theme.SIZES.BASE }}>
            <Text
              style={{ fontFamily: 'montserrat-regular' }}
              size={14}
              color={nowTheme.COLORS.TEXT}
            >
              Join this Group
            </Text>
            <Switch
              value={this.state['switch-1']}
              onValueChange={() => this.toggleSwitch('switch-1')}
            />
          </Block>

        </Block>
      </Block>
    );
  };


  renderCards = () => {
    scrollX = new Animated.Value(0);
    cards = [articles[5], articles[6]]
    return (
      <Block flex style={styles.group}>
        <ScrollView
          horizontal={true}
          style={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            width: width * 2
          }}>
          {cards.map((item, index) => {
            return <Card key={index} item={item} full titleStyle={styles.productTitle} imageStyle={ { height: 300, width: '100%', resizeMode: 'contain' } }/>
          })}
        </ScrollView>

      </Block>

    );
  };

  renderAlbums = () => {
    const { navigation } = this.props;

    return (
      <Block flex style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}>
        <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
          <Block row space="between">
            <Text bold size={16} color="#333" style={{ marginTop: 3 }}>
               Related Groups
            </Text>
            <Button small color="transparent" textStyle={{ color: nowTheme.COLORS.PRIMARY, fontSize: 14 }}>
              View All
            </Button>
          </Block>
          <Block row space="between" style={{ marginTop: theme.SIZES.BASE, flexWrap: 'wrap' }}>
            {Images.Viewed.map((img, index) => (
              <Block key={`viewed-${img}`} style={styles.shadow}>
                <Image resizeMode="cover" source={img} style={styles.albumThumb} />
              </Block>
            ))}
          </Block>
        </Block>
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
          {this.renderAlbums()}
          {this.renderButtons()}
          {this.renderSwitches()}
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

export default Group;
