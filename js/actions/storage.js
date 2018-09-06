import { AsyncStorage } from "react-native";

const save = (key, data) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
};

export default {
  save
};
