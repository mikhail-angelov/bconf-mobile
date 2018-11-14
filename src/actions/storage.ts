import { AsyncStorage } from "react-native";

export const saveAuth = (key, data) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
};

export const saveChatlistTimestamp = (key, data) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
};