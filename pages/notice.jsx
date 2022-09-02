import dayjs from "dayjs";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import Markdown from "react-native-markdown-display";
require("dayjs/locale/ko");

export default function Notice({ navigation, route }) {
  const { title, content, publisher, published_date } = route.params;
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ minHeight: "100%" }}
    >
      <View style={styles.container}>
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
            {title}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 5 ,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text>{publisher.name}</Text>
            <Text>
              {dayjs(published_date).locale("ko").format("YYYY-MM-DD A hh:mm")}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "#F0F3F4",
              marginTop: 10,
              padding: 8,
              borderRadius: 15
            }}
          >
            <Markdown>{content}</Markdown>
          </View>
        </View>
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
  },
});
