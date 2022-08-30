import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { TextInput } from "react-native-paper";
import { client } from "../utils/client";
import styles from "../utils/styles";
import { getDevice} from "../utils/device"

export default function Music({ navigation }) {
  const [song, setSong] = useState();
  const addSong = async() => {
    const deviceId = await getDevice()
    client('POST', '/music/add', {
      deviceId,
      song
    }).then((res) => {
      if(res.error) {
        Alert.alert('오류', res.message,[{
          text: "확인",
          style: "cancel"
        }])
      }
    })
  }
  return (
    <ScrollView style={{ minHeight: "100%", height: "100%" }}>
      <View style={styles.container}>
        <View style={pageStyles.alertBox}>
          <Text style={pageStyles.alertTitle}>
            {" "}
            신청하시기 전에 다음 사항을 확인해 주세요!
          </Text>
          <Text style={pageStyles.alertText}>
            ㆍ그날 틀지 못한 노래는 리스트에서 삭제됩니다
          </Text>
          <Text style={pageStyles.alertText}>
            ㆍ신청한 노래 중에서 중복되는 노래들은 제외됩니다
          </Text>
          <Text style={pageStyles.alertText}>
            ㆍ신청이 들어온 순서로 재생하고 11:50 ~ 12:45 까지입니다
          </Text>
          <Text style={pageStyles.alertText}>
            ㆍ불건전하거나 혼란을 야기 할 수 있는 노래는 신청을 금지합니다
          </Text>
        </View>
        <TextInput
          label="노래 제목과 가수 이름을 적어주세요"
          mode="outlined"
          style={{
            marginTop: 12,
            ...styles.input,
          }}
          onChangeText={setSong}
          placeholder="( EX : 멜로망스 / 사랑인가봐 )"
          outlineColor="#f0f2f3"
          activeOutlineColor="#f58a5b"
        />
        <TouchableOpacity style={{
          marginTop: 12,
          borderRadius: 5,
          height: 45,
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:"#f58a5b"
        }} onPress={() => {addSong()}}>
          <Text style={{
            color: "white"
          }}>신청하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const pageStyles = StyleSheet.create({
  alertBox: {
    backgroundColor: "rgb(255,251,235)",
    padding: 10,
    width: "90%",
    borderRadius: 20,
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
});
