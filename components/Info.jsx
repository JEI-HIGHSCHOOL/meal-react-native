import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton, Colors } from "react-native-paper";

const Info = () => {
  const openHomepage = () => {
    Linking.canOpenURL("http://jn.icehs.kr/main.do").then(supported => {
      if (supported) {
        Linking.openURL("http://jn.icehs.kr/main.do");
      } else {
        console.log("Don't know how to open URI: http://jn.icehs.kr/main.do");
      }
    });
  };
  const openFacebook = () => {
    const url = "https://www.facebook.com/JEI.HIGHSCHOOL";
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  const openYoutube = () => {
    const url = "https://www.youtube.com/channel/UCO6JX_J5uQ0lTIO2d19-9ZA";
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const openInstargram = () => {
    const url = "https://www.instagram.com/jn_highschool";
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const openKakao = () => {
    const url = "http://pf.kakao.com/_IxiccC";
    Linking.canOpenURL(url).then(supported => {
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
          width: "100%",
          overflow: "scroll",
          
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
              openKakao();
            }}
          >
            <Text
              style={{
                ...styles.text,
                color: "#3A1D1D",
              }}
            >
              카카오톡
            </Text>
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
          <LinearGradient
            start={{ x: 0, y: 0.9 }}
            end={{ x: 0.5, y: 0 }}
            colors={[
              "#833AB4",
              "#C13584",
              "#E1306C",
              "#FD1D1D",
              "#F56040",
              "#F77737",
              "#FCAF45",
            ]}
            style={styles.instargram}
          >
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
          </LinearGradient>
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
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  homepage: {
    width: 120,
    height: 120,
    backgroundColor: "#F05D1A",
    borderRadius: 15,
    marginRight: 13,
  },
  facebook: {
    width: 120,
    height: 120,
    backgroundColor: "#4267B2",
    borderRadius: 15,
    marginRight: 13,
  },
  youtube: {
    width: 120,
    height: 120,
    backgroundColor: "#FF0000",
    borderRadius: 15,
    marginRight: 13,
  },
  kakaotalk: {
    width: 120,
    height: 120,
    backgroundColor: "#fef01b",
    borderRadius: 15,
    marginRight: 13,
  },
  instargram: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  text: {
    color: "white",
    marginLeft: 15,
    fontSize: 17,
    marginTop: 15,
    fontWeight: "900",
  },
});

export default Info;
