import Lottie from "lottie-react-native";
import { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

export default function MusicSubmit({ navigation, route }) {
  const [time, setTime] = useState(5);
  const { count } = route.params;

  useEffect(() => {
    const countingInterval = setInterval(() => {
      setTime(time => time - 1);
    }, 1000);

    const resetPage = setTimeout(() => {
      navigation.reset({
        routes: [
          {
            name: "home",
          },
        ],
      });
    }, 5000);

    return () => {
      clearInterval(countingInterval)
      clearTimeout(resetPage)
    }
  }, []);

  return (
    <View style={pageStyles.container}>
      <Lottie
        source={require("../assets/animation/submitmusic.json")}
        autoPlay
        style={{
          width: 150,
          height: 150,
        }}
      />
      <Text
        style={{
          marginTop: 17,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        노래가 정상적으로 신청되었습니다
      </Text>
      <View
        style={{
          marginTop: 4,
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
        }}
      >
        <Text
          style={{
            fontSize: 45,
            fontWeight: "600",
          }}
        >
          {count}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          번째 신청곡
        </Text>
      </View>
      <Text
        style={{
          position: "absolute",
          bottom: 13,
          fontSize: 15,
          fontWeight: "500",
        }}
      >
        {time}초 뒤 메인 페이지로 이동합니다
      </Text>
    </View>
  );
}

const pageStyles = StyleSheet.create({
  alertBox: {
    backgroundColor: "rgb(255,251,235)",
    padding: 10,
    width: "90%",
    borderRadius: 5,
  },
  alertTitle: {
    color: "rgb(180,83,9)",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 5,
  },
  alertText: {
    color: "rgb(180,83,9)",
  },
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "auto",
  },
});
