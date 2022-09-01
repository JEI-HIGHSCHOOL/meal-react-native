import { Image, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import Index from "./pages/index";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ads from "./components/Ads";
import Music from "./pages/music";
import Notice from "./pages/notice";
import MusicSubmit from "./pages/musicsubmit";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { getDevice, registerForPushNotificationsAsync } from "./utils/device";
import { client } from "./utils/client";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const Stack = createStackNavigator();
  const registerNotification = async () => {
    registerForPushNotificationsAsync()
      .then(async pushToken => {
        if (pushToken) {
          await SecureStore.setItemAsync("push_token", pushToken);
          const deviceId = await getDevice()
          await client('POST', '/push/device', {
            deviceId: deviceId,
            token: pushToken
          })
          return;
        }

        Alert.alert("경고", "알림 설정이 꺼저있습니다. 알림설정을 켜주세요!");
      })
      .catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    registerNotification();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer
        theme={{
          colors: {
            background: "#fff",
          },
        }}
      >
        <Stack.Navigator initialRouteName="index">
          <Stack.Screen
            name="홈"
            component={Index}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTintColor: "#000",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="노래"
            component={Music}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTintColor: "#000",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="공지"
            component={Notice}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTintColor: "#000",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="musicsubmit"
            component={MusicSubmit}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTintColor: "#000",
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
