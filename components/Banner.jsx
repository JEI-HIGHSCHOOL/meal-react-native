import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  Linking,
} from "react-native";
import { IconButton, Colors } from "react-native-paper";
import React, { useState, useEffect } from "react";
import Swiper from "react-native-swiper";
import { client } from "../utils/client";
import { checkUrlForm } from "../utils/utils";
import { APP_URL } from "../config.json"

const Banner = ({ navigation }) => {
  const [banner, setBanner] = useState();
  useEffect(() => {
    client("GET", "/banners").then((res) => {
      if (res.error) return;
      setBanner([
        {
          title: "노래 신청하기",
          description: "점심시간에 듣고싶은 노래가 있나요?",
          icon: "music",
          color: "#6470F7",
          url: "Music",
        },
        {
          title: "실시간 셔틀버스",
          description: "현재 셔틀버스의 위치를 확인하세요",
          icon: "bus",
          color: "#6397f2",
          url: "Webview",
          params: {
            url: APP_URL + "/busmap",
            title: "셔틀버스",
          }
        },
        ...res.data,
      ]);
    });
  }, []);

  const openURL = (url) => {
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
      <View
        style={{
          height: "20%",
          display: "flex",
          justifyContent: "center",
          marginTop: 12,
          maxWidth: "100%",
          minWidth: "100%",
          overflow: "visible",
        }}
      >
        {!banner || banner.length === 0 ? (
          <Swiper
            autoplayTimeout={10}
            loop={true}
            autoplay
            showsPagination
            bounces={true}
            height={"100%"}
            dotStyle={styles.NonActiveDot}
            activeDotStyle={styles.activeDot}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{
                ...styles.swiper,
                backgroundColor: "#6470F7",
              }}
              onPress={() => {
                navigation.navigate("Music");
              }}
            >
              <Text style={styles.text}>노래 신청하기</Text>
              <Text style={styles.description}>
                점심시간에 듣고싶은 노래가 있나요?
              </Text>
              <IconButton
                style={{
                  marginLeft: "auto",
                  marginTop: "auto",
                }}
                icon="music"
                size={32}
                color={Colors.white}
              />
            </TouchableOpacity>
          </Swiper>
        ) : (
          <Swiper
            autoplayTimeout={10}
            loop={true}
            autoplay
            showsPagination
            bounces={true}
            height={"100%"}
            dotStyle={styles.NonActiveDot}
            activeDotStyle={styles.activeDot}
          >
            {banner.map((banner, index) => (
              <TouchableOpacity
                activeOpacity={1}
                key={index}
                style={{
                  ...styles.swiper,
                  backgroundColor: banner.color,
                }}
                onPress={() => {
                  if(checkUrlForm(banner.url)) {
                    openURL(banner.url);
                  } else {
                    navigation.navigate(banner.url, banner.params);
                  };
                }}
              >
                <Text style={styles.text}>{banner.title}</Text>
                <Text style={styles.description}>{banner.description}</Text>
                <IconButton
                  style={{
                    marginLeft: "auto",
                    marginTop: "auto",
                  }}
                  icon={banner.icon}
                  size={32}
                  color={Colors.white}
                />
              </TouchableOpacity>
            ))}
          </Swiper>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  swiper: {
    height: "20%",
    display: "flex",
    alignItems: "flex-start",
    width: "90%",
    height: 120,
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    color: "white",
    fontSize: 17,
    marginTop: 18,
    fontWeight: "900",
    marginLeft: 17,
  },
  description: {
    color: "white",
    fontSize: 15,
    marginTop: 3,
    fontWeight: "500",
    marginLeft: 17,
  },
  NonActiveDot: {
    backgroundColor: "#f7e1d7",
  },
  activeDot: {
    backgroundColor: "#f58a5b",
  },
});

export default Banner;
