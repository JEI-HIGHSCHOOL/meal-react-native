import { Image, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";

import Ads from "./components/Ads";
import CustomSidebarMenu from "./components/CustomSidebarMenu";

import Index from "./screens/index";
import Music from "./screens/music";
import Notice from "./screens/notice";
import NoticeList from "./screens/noticeList";
import MusicSubmit from "./screens/musicsubmit";
import Browser from "./screens/webview";

import { getDevice, registerForPushNotificationsAsync } from "./utils/device";
import { client } from "./utils/client";

import "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const prefix = Linking.createURL("/");

export default function App() {
  const registerNotification = async () => {
    registerForPushNotificationsAsync()
      .then(async (pushToken) => {
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
      .catch((error) => {
        console.log(error);
      });
  };

  const linking = {
    prefixes: [prefix, "jhschool://"],
    initialRouteName: "home",
    config: {
      screens: {
        home: "home",
        alert: "notice/:noticeId",
        Music: "music",
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
          async (response) => {
            const url = response.notification.request.content.data.url;
            await Linking.openURL(prefix + "home"); // 우선 최초화면으로 먼저 이동합니다. 이렇게 하지 않으면, 변수만 다른(:roomId) 동일한 화면이(ChatRoom) 이미 열려있던 경우, deep link로 인한 화면이동이 발생하지 않습니다.
            await Linking.openURL(prefix + url);
            closeSplash();
          }
        );

      return () => {
        Linking.removeEventListener("url", onReceiveURL);
        subscription.remove();
      };
    },
  };

  const closeSplash = async () => {
    await SplashScreen.hideAsync();
  };
  useEffect(() => {
    registerNotification();
    closeSplash();
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
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={() => (
              <Drawer.Navigator
                drawerContent={(props) => (
                  <CustomSidebarMenu navigation={props.navigation} />
                )}
                mode="modal"
              >
                <Drawer.Screen
                  options={{
                    headerTitle: () => <HeaderLogo />,
                    headerTitleAlign: "center",
                    headerTintColor: "#000",
                    headerBackgroundContainerStyle: {
                      backgroundColor: "white",
                    },
                    headerLeftLabelVisible: false,
                  }}
                  name="index"
                  component={Index}
                />
              </Drawer.Navigator>
            )}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="Webview"
            component={Browser}
            options={{
              headerTitle: "브라우저",
              headerTitleAlign: "center",
              headerTintColor: "#000",
              headerBackgroundContainerStyle: {
                backgroundColor: "white",
              },
              headerLeftLabelVisible: false,
            }}
          />
          <Drawer.Screen
            name="Music"
            component={Music}
            options={{
              headerTitle: "노래신청",
              headerTitleAlign: "center",
              headerTintColor: "#000",
              headerBackgroundContainerStyle: {
                backgroundColor: "white",
              },
              headerLeftLabelVisible: false,
            }}
          />
          <Drawer.Screen
            name="alerts"
            component={NoticeList}
            options={{
              headerTitle: "알림목록",
              headerTitleAlign: "center",
              headerTintColor: "#000",
              headerBackgroundContainerStyle: {
                backgroundColor: "white",
              },
              headerLeftLabelVisible: false,
            }}
          />
          <Drawer.Screen
            name="alert"
            component={Notice}
            options={{
              headerTitle: "알림",
              headerTitleAlign: "center",
              headerTintColor: "#000",
              headerBackgroundContainerStyle: {
                backgroundColor: "white",
              },
              headerLeftLabelVisible: false,
            }}
          />
          <Drawer.Screen
            name="musicsubmit"
            component={MusicSubmit}
            options={{
              headerTitle: "노래신청",
              headerTitleAlign: "center",
              headerTintColor: "#000",
              headerBackgroundContainerStyle: {
                backgroundColor: "white",
              },
              headerLeftLabelVisible: false,
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
        width: 200,
        height: 24,
      }}
    />
  );
}
