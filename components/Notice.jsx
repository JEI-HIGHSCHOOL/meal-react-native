import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Notice = () => {
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
          <TouchableOpacity>
            <Text style={styles.font}>더보기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alertContainer}>
          <Text style={{ fontSize: 15 }}>업데이트 예정</Text>
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
    justifyContent: "center",
  },
});

export default Notice;
