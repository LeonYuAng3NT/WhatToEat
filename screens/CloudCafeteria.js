import React, { useCallback } from "react";
import { StyleSheet, Dimensions, ScrollView, View, Linking} from "react-native";
//import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");

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

  return <Button title={children} onPress={handlePress} />;
};

class CloudCafeteria extends React.Component {

  render() {
    return (
      <Block style={styles.container}>
      <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
    </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CloudCafeteria;
