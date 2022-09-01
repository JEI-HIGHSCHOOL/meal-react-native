import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Meals from "../components/Meal";
import Info from "../components/Info";
import Notice from "../components/Notice";
import { IconButton, Colors } from "react-native-paper";

export default function Index({ navigation }) {
  return (
    <ScrollView
      contentContainerStyle={{minHeight: "100%"}}
    >
      <View style={styles.container}>
        <Meals />
        <Info />
        <TouchableOpacity
          style={styles.music}
          onPress={() => {
            navigation.navigate("노래");
          }}
        >
          <Text style={styles.text}>노래 신청하기</Text>
          <Text style={styles.description}>
            점심시간에 듣고싶은 노래가 있나요?
          </Text>
          <IconButton
            style={{
              marginLeft: "auto",
              marginTop: "auto",
            }}
            icon="music"
            size={32}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Notice navigation={navigation} />
      </View>
    </ScrollView>
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
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
  music: {
    marginTop: 15,
    height: "20%",
    display: "flex",
    alignItems: "flex-start",
    width: "90%",
    height: 120,
    backgroundColor: "#6470F7",
    borderRadius: 15,
    marginRight: 3,
  },
  text: {
    color: "white",
    fontSize: 17,
    marginTop: 18,
    fontWeight: "900",
    marginLeft: 17,
  },
  description: {
    color: "white",
    fontSize: 15,
    marginTop: 2,
    fontWeight: "500",
    marginLeft: 17,
  },
});
