import { AntDesign } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component, useLayoutEffect, useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const Browser = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title ? route.params.title : "브라우저",
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: route.params.url,
        }}
        style={{ flex: 1, marginBottom: 10 }}
      />
    </View>
  );
};
export default Browser;
