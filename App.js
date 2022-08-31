import { View, Image, ScrollView, Button } from "react-native";
import Index from "./pages/index";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ads from "./components/Ads";
import Music from "./pages/music";
import Notice from "./pages/notice";
import MusicSubmit from "./pages/musicsubmit";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const Stack = createStackNavigator();
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
            name="알림"
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
