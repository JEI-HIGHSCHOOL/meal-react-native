import { Link } from "@react-navigation/native";
import dayjs from "dayjs";
import Lottie from "lottie-react-native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { client } from "../utils/client";
require("dayjs/locale/ko");

export default function Notice({ navigation, route }) {
  const { title, content, publisher, published_date, noticeId } = route.params;
  const [_title, setTitle] = useState();
  const [_content, setContent] = useState();
  const [_publisher, setPublisher] = useState();
  const [_published_date, setPublished_date] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    if (noticeId) {
      client("GET", `/push/notice/${noticeId}`).then(res => {
        if (res.error) {
          setError(res.message);
        } else {
          setTitle(res.data.title);
          setContent(res.data.content);
          setPublisher(res.data.publisher);
          setPublished_date(res.data.published_date);
        }
      });
    } else {
      setTitle(title);
      setContent(content);
      setPublisher(publisher);
      setPublished_date(published_date);
    }
  }, []);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ minHeight: "100%" }}
    >
      <View style={styles.container}>
        {!_title || !_content || !_published_date || !_publisher ? (
          <>
            {error ? (
              <>
                <View
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "60%",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                  >
                    {error}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      borderRadius: 5,
                      height: 35,
                      width: "30%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f58a5b",
                    }}
                    onPress={() => {
                      navigation.reset({
                        routes: [
                          {
                            name: "home",
                          },
                          {
                            name: "alerts",
                          },
                        ],
                      });
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      알림 목록으로
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Lottie
                  source={require("../assets/animation/loading.json")}
                  autoPlay
                  loop
                  style={{
                    height: "100%",
                    width: "40%",
                    marginTop: "auto",
                  }}
                />
              </View>
            )}
          </>
        ) : (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "90%",
                marginTop: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                {_title}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 5,
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text>{_publisher.name}</Text>
                <Text>
                  {dayjs(_published_date)
                    .locale("ko")
                    .format("YYYY-MM-DD A hh:mm")}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#F0F3F4",
                  marginTop: 10,
                  paddingRight: 8,
                  paddingLeft: 8,
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRadius: 15,
                }}
              >
                <Markdown>{_content}</Markdown>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
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
    overflow: "scroll",
  },
});
