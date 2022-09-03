import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { client } from "../utils/client";
import dayjs from "dayjs";
import Icon from "@expo/vector-icons/FontAwesome";
import Lottie from "lottie-react-native"

export default function Notice({ navigation }) {
  const [notices, setNotices] = useState();
  useEffect(() => {
    client("GET", "/push/notice").then((data) => {
      if (data.error) return;
      setNotices(data.data);
    });
  }, []);
  const goNoticePage = (data) => {
    navigation.navigate("alert", {
      ...data,
    });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "90%",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Icon
          style={{
            marginRight: 4,
            fontSize: 18
          }}
          name="bell"
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          등록된 알림
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {notices ? (
          <>
            {notices.length === 0 ? (
              <>
                <Text>
                  등록된 알림이 없습니다
                </Text>
              </>
            ) : (
              <>
                {notices.map((notice) => (
                  <TouchableOpacity
                    key={notice._id}
                    style={{
                      backgroundColor: "#F0F3F4",
                      width: "100%",
                      padding: 12,
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderRadius: 15,
                      marginTop: 2,
                      marginBottom: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                    onPress={() => {
                      goNoticePage(notice);
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        maxWidth: "73%"
                      }}
                      numberOfLines={1}
                    >
                      {notice.title}
                    </Text>
                    <Text>
                      {dayjs(notice.published_date).format("YYYY-MM-DD")}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </>
        ) : (
          <Lottie
            source={require("../assets/animation/loading.json")}
            autoPlay
            loop
          />
        )}
      </View>
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
});
