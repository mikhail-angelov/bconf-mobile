import firebase from 'react-native-firebase';


export default async (message) => {
    // handle your message
    console.log("recieved background notification", message)
    return Promise.resolve();
}