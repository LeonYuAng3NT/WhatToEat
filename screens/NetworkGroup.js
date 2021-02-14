import React, { useCallback } from "react";
import { StyleSheet, Dimensions, ScrollView, View, Linking} from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");

class NetworkGroup extends React.Component {

  renderETA = () => {
    return (
        <Block flex style={styles.group} center>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text style={{ fontFamily: 'montserrat-regular' }} >
              ETA until your food arrives: 15min
            </Text>
          </Block>
        </Block>
      );
  }

  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
        <Card item={articles[0]} horizontal />
          <Block flex row>
            <Card
              item={articles[1]}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
    <Block flex center style={styles.home}>
      {this.renderETA()}
      {this.renderArticles()}
      
    </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  }
});

export default NetworkGroup;
