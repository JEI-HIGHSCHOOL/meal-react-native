import { Image, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import Index from "./screens/index";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ads from "./components/Ads";
import Music from "./screens/music";
import Notice from "./screens/notice";
import NoticeList from "./screens/noticeList";
import MusicSubmit from "./screens/musicsubmit";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getDevice, registerForPushNotificationsAsync } from "./utils/device";
import { client } from "./utils/client";
import * as Linking from "expo-linking";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const Stack = createStackNavigator();
const prefix = Linking.createURL("/");

export default function App() {
  const registerNotification = async () => {
    registerForPushNotificationsAsync()
      .then(async pushToken => {
        if (pushToken) {
          await SecureStore.setItemAsync("push_token", pushToken);
          const deviceId = await getDevice();
          await client("POST", "/push/device", {
            deviceId: deviceId,
            token: pushToken,
          });
          return;
        }

        Alert.alert("경고", "알림 설정이 꺼저있습니다. 알림설정을 켜주세요!");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const linking = {
    prefixes: [prefix],
    initialRouteName: "home",
    config: {
      screens: {
        home: "home",
        alert: "notice/:noticeId",
      },
    },
    async getInitialURL() {
      let url = await Linking.getInitialURL();

      if (url != null) {
        return url;
      }

      const response = await Notifications.getLastNotificationResponseAsync();
      url = response?.notification.request.content.data.url;

      return url;
    },
    subscribe(listener) {
      const onReceiveURL = ({ url }) => listener(url);
      // Listen to incoming links from deep linking
      Linking.addEventListener("url", onReceiveURL);

      // Listen to expo push notifications
      const subscription =
        Notifications.addNotificationResponseReceivedListener(
          async response => {
            const url = response.notification.request.content.data.url;
            await Linking.openURL(prefix + "home"); // 우선 최초화면으로 먼저 이동합니다. 이렇게 하지 않으면, 변수만 다른(:roomId) 동일한 화면이(ChatRoom) 이미 열려있던 경우, deep link로 인한 화면이동이 발생하지 않습니다.
            await Linking.openURL(prefix + url);
            closeSplash()
          }
        );

      return () => {
        Linking.removeEventListener("url", onReceiveURL);
        subscription.remove();
      };
    },
  };

  const closeSplash = async() => {
    await SplashScreen.hideAsync()
  }
  useEffect(() => {
    registerNotification();
    closeSplash()
  }, []);
  
  return (
    <>
      <NavigationContainer
        linking={linking}
        theme={{
          colors: {
            background: "#fff",
          },
        }}
      >
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="홈">
          <Stack.Screen
            name="home"
            component={Index}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Music"
            component={Music}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="alerts"
            component={NoticeList}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="alert"
            component={Notice}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="musicsubmit"
            component={MusicSubmit}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
        <Ads />
      </NavigationContainer>
    </>
  );
}

function HeaderLogo() {
  return (
    <Image
      source={require("./assets/page_logo.png")}
      style={{
        marginTop: 4,
      }}
    />
  );
}
