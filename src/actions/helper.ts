import axios from "axios";
import _ from "lodash";
import storage from "./storage";
import { AsyncStorage } from "react-native";
import { AUTH } from "../constants/storage";

export const auth = { token: "", userId: "" };

export const setAuth = ({ token, userId }) => {
  auth.token = token;
  auth.userId = userId;
  storage.save(AUTH, auth);
};

export const doJsonRequest = opts => {
  return axios(opts).then(response => response.data);
};

export const doJsonAuthRequest = async opts => {
  const token = await getToken()
  opts = { ...opts, headers: { authorization: token } };
  return axios(opts).then(response => response.data);
};

export const getToken = async () => {
  const auth = await AsyncStorage.getItem(AUTH);
  const user = JSON.parse(auth);
  return user.token;
};

export function getRandomColor(chatId) {
  const colors = ['#FFCCFF', '#9999FF', '#66CCCC', '#11AAFF', "#22AAAA",
    '#FFCC00', '#FFCCCC', '#996699', '#66CCFF', "#332244"];
  const rand = chatId.charCodeAt(0) % colors.length;
  return colors[rand];
}

export function getChatImage(chatId) {
  const images = ['https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=350',
   'https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/w_644,c_limit/best-face-oil.png', 
   'https://facefacts.scot/images/science/Q2_high_health_f.jpg', 
   'https://www.thestar.com.my/~/media/online/2017/11/22/05/22/maybank-hamirullah2.ashx/?w=620&h=413&crop=1&hash=1840EC0FACFE705AAE7D9E9CB0A2FB133BF55E1D', 
   "https://i-cdn.phonearena.com//images/article/100601-image/Apple-marketing-chief-Phil-Schiller-says-Androids-Face-ID-attempts-will-all-stink.jpg",
    'http://maritime-connector.com/user_picture/daa957d5ef5973aac8a87eeffc4876dd1512657943.jpg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRNbQaAy6wEzyHH2vmMI2NuOx72NZa2KZHEwgAUAU5l14GXnEM', 
    'https://www.id-logistics.com/en/wp-content/uploads/sites/20/2015/02/jesus-hernandez.jpg', 
    'https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-england-most-beautiful-face.jpg', 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsSmajgED1waX8Ji9_FVUiTLTaFb8GwkZtbjYCGe2CoDedDQ2"];
  const rand = chatId.charCodeAt(0) % images.length;
  return images[rand];
}
