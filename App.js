import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import Meals from "./components/Meal";
import Info from "./components/Info";
import Notice from "./components/Notice";
import Ads from "./components/Ads";

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.logo} source={require("./assets/logo.gif")} />
      <Meals />
      <Notice />
      <Info />
      <Ads/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    minWidth: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  logo: {
    marginTop: 60,
    marginBottom: 10,
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
});
