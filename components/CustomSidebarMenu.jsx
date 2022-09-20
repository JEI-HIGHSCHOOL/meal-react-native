import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  Image,
} from "react-native";
import { RewordAds } from "./Ads"
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const navList = [
  { title: "홈", link: "index", icon: "home" },
  { title: "알림", link: "alerts", icon: "bell" },
  { title: "노래 신청하기", link: "Music", icon: "music" },
];
const CustomSidebarMenu = ({ navigation }) => {
  return (
    <View
      style={{
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "#fff",
        flex: 1
      }}
    >
      <View
        style={{
          height: 200,
          backgroundColor: "#f0f3f4",
          paddingTop: 50,
        }}
      >
        <Image
          style={{
            height: 72,
            width: 72,
            borderRadius: 37,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          source={require("../assets/logo.png")}
        />
        <Text
          style={{
            marginTop: 15,
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
            lineHeight: 31,
            letterSpacing: 0,
            textAlign: "center",
            color: "#272727",
          }}
        >
          인천재능고등학교
        </Text>
      </View>
      <View>
        {navList.map((data, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 5,
                paddingTop: 27,
                paddingLeft: 30,
              }}
              onPress={() => {
                navigation.navigate(data.link);
              }}
            >
              <Icon name={data.icon} size={18} />
              <Text
                style={{
                  marginLeft: 12,
                  color: "#272727",
                  fontSize: 16,
                  lineHeight: 19,
                }}
              >
                {data.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{marginTop: "auto"}}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
              paddingTop: 27,
              paddingLeft: 30,
            }}
            onPress={() => {
              RewordAds()
            }}
          >
            <Icon name="advertisements" size={18} />
            <Text
              style={{
                marginLeft: 12,
                color: "#272727",
                fontSize: 16,
                lineHeight: 19,
              }}
            >
              앱 유지비 (광고)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomSidebarMenu;
