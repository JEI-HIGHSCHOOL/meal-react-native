import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Meals from "../components/Meal";
import Info from "../components/Info";
import Notice from "../components/Notice";
import Icon from "react-native-vector-icons/FontAwesome";


export default function Index({navigation}) {
  return (
    <View style={styles.container}>
      <Meals />
      <Notice navigation={navigation}/>
      <Info />
      <TouchableOpacity
        style={styles.muisc}
        onPress={() => {
            navigation.navigate('노래')
        }}
      >
        <Text style={styles.text}>유튜브</Text>
        <Icon
          style={{
            marginLeft: "auto",
            marginTop: "auto",
          }}
          icon="music"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    display: "flex",
    minWidth: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
  muisc: {
    marginTop: 12,
    height: "20%",
    display: "flex",
    alignItems: "flex-start",
    width: "91%",
    height: 120,
    backgroundColor: "#F05D1A",
    borderRadius: 20,
    marginRight: 3,
  },
  text: {
    color: "white",
    fontSize: 17,
    marginTop: 18,
    fontWeight: "900",
    marginLeft: 17
  },
});
