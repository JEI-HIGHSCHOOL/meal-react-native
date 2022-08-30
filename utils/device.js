import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const getDevice = async () => {
  const fetchUUID = await SecureStore.getItemAsync("secure_deviceid");
  if(!fetchUUID) {
    const uuid = uuidv4();
    await SecureStore.setItemAsync("secure_deviceid", uuid);
    return uuid;
  } else {
    return fetchUUID;
  }
};
