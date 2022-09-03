import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { client } from "../utils/client";
import Lottie from "lottie-react-native";
import dayjs from "dayjs";

const Notice = ({ navigation }) => {
  const [notices, setNotices] = useState();
  useEffect(() => {
    client("GET", "/push/notice").then(data => {
      if (data.error) return;
      setNotices(data.data);
    });
  }, []);
  const goNoticePage = (data) => {
    navigation.navigate('alert', {
      ...data
    })
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.title}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              style={{
                marginRight: 4,
                ...styles.font,
              }}
              name="bell"
            />
            <Text
              style={{
                fontWeight: "900",
                ...styles.font,
              }}
            >
              알림
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("alerts");
            }}
          >
            <Text style={styles.font}>더보기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alertContainer}>
          {notices ? (
            <>
              {notices.length === 0 ? (
                <><Text style={{
                  marginTop: "auto",
                  marginBottom: "auto"
                }}>등록된 공지가 없습니다</Text></>
              ) : (
                <>
                  {notices.slice(0, 3).map(notice => (
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
                        flexDirection: "row"
                      }}
                      onPress={() => {
                        goNoticePage(notice)
                      }}
                    >
                      <Text style={{
                        fontWeight: "600",
                        maxWidth: "73%"
                      }} numberOfLines={1}>{notice.title}</Text>
                      <Text>{dayjs(notice.published_date).format('YYYY-MM-DD')}</Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: "90%",
    marginTop: 20,
  },
  font: {
    fontSize: 16,
  },
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 3,
    paddingLeft: 3,
  },
  alertContainer: {
    minHeight: 100,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 20,
  },
});

export default Notice;
