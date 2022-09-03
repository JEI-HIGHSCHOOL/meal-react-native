import * as SecureStore from "expo-secure-store";
import { isDevice } from "expo-device";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const getDevice = async () => {
  const fetchUUID = await SecureStore.getItemAsync("secure_deviceid");
  if (!fetchUUID) {
    const uuid = uuidv4();
    await SecureStore.setItemAsync("secure_deviceid", uuid);
    return uuid;
  } else {
    return fetchUUID;
  }
};

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync({experienceId: '@kdh89811/jh-school-meal-app',})).data;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "알림",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};
