import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { IconButton, Colors } from "react-native-paper";
const Info = () => {
  const openHomepage = () => {
    Linking.canOpenURL("http://jn.icehs.kr/main.do").then((supported) => {
      if (supported) {
        Linking.openURL("http://jn.icehs.kr/main.do");
      } else {
        console.log("Don't know how to open URI: http://jn.icehs.kr/main.do");
      }
    });
  };
  const openFacebook = () => {
    const url = "https://www.facebook.com/JEI.HIGHSCHOOL";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  const openYoutube = () => {
    const url = "https://www.youtube.com/channel/UCO6JX_J5uQ0lTIO2d19-9ZA";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const openInstargram = () => {
    const url = "https://www.instagram.com/jn_highschool";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <>
      <ScrollView
        style={{
          width: "90%",
          overflow: "visible",
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.homepage}
            onPress={() => {
              openHomepage();
            }}
          >
            <Text style={styles.text}>홈페이지</Text>
            <IconButton
              style={{
                marginLeft: "auto",
                marginTop: "auto",
              }}
              icon="home"
              size={32}
              color={Colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.facebook}
            onPress={() => {
              openFacebook();
            }}
          >
            <Text style={styles.text}>페이스북</Text>
            <IconButton
              style={{
                marginLeft: "auto",
                marginTop: "auto",
              }}
              icon="facebook"
              size={32}
              color={Colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.youtube}
            onPress={() => {
              openYoutube();
            }}
          >
            <Text style={styles.text}>유튜브</Text>
            <IconButton
              style={{
                marginLeft: "auto",
                marginTop: "auto",
              }}
              icon="youtube"
              size={32}
              color={Colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.kakaotalk}
            onPress={() => {
              openInstargram();
            }}
          >
            <Text style={styles.text}>카카오톡</Text>
            <IconButton
              style={{
                marginLeft: "auto",
                marginTop: "auto",
              }}
              icon="chat"
              size={32}
              color={"#3A1D1D"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.instargram}
            onPress={() => {
              openInstargram();
            }}
          >
            <Text style={styles.text}>인스타그램</Text>
            <IconButton
              style={{
                marginLeft: "auto",
                marginTop: "auto",
              }}
              icon="instagram"
              size={32}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  homepage: {
    width: 110,
    height: 120,
    backgroundColor: "#F05D1A",
    borderRadius: 15,
    marginRight: 7,
  },
  facebook: {
    width: 110,
    height: 120,
    backgroundColor: "#4267B2",
    borderRadius: 15,
    marginRight: 7,
  },
  youtube: {
    width: 110,
    height: 120,
    backgroundColor: "#FF0000",
    borderRadius: 15,
    marginRight: 7,
  },
  kakaotalk: {
    width: 110,
    height: 120,
    backgroundColor: "#F7E600",
    borderRadius: 15,
    marginRight: 7
  },
  instargram: {
    width: 110,
    height: 120,
    backgroundColor: "#282828",
    borderRadius: 15,
  },
  text: {
    color: "white",
    marginLeft: 15,
    fontSize: 17,
    marginTop: 18,
    fontWeight: "900",
  },
});

export default Info;
