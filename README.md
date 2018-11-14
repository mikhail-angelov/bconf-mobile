# MobileDemo chat

MobileDemo is a simple chat mobile application built using React Native (0.57). 

*Note: for now it's adapted to work on iOS only. Android version will be ready soon.*

|  |  |  |
| ------------- | ------------- | ------------- |
| <img src="https://github.com/mikhail-angelov/mobile-demo/blob/master/screenshots/screenshot1.png" width="300"/>  | <img src="https://github.com/mikhail-angelov/mobile-demo/blob/master/screenshots/screenshot2.png" width="300"/>  | <img src="https://github.com/mikhail-angelov/mobile-demo/blob/master/screenshots/screenshot3.png" width="300"/>  |
| <img src="https://github.com/mikhail-angelov/mobile-demo/blob/master/screenshots/screenshot4.png" width="300"/>  | <img src="https://github.com/mikhail-angelov/mobile-demo/blob/master/screenshots/screenshot10.png" width="300"/>  | <img src="https://github.com/mikhail-angelov/mobile-demo/blob/master/screenshots/screenshot5.png" width="300"/>  |
| <img src="https://github.com/mikhail-angelov/mobile-demo/blob/master/screenshots/screenshot6.png" width="300"/>  | <img src="https://github.com/mikhail-angelov/mobile-demo/blob/master/screenshots/screenshot8.png" width="300"/>  | <img src="https://github.com/mikhail-angelov/mobile-demo/blob/master/screenshots/screenshot9.png" width="300"/>  |
### Tech

MobileDemo uses a number of open source projects to work properly:

* [React Native] - v.0.57
* [Wix React native navigation] - v.2
* [TypeScript]
* [Styled Components]
* [Redux]
* [Firebase]

### Installation

Note: you have to get your own api keys for the following services to test the app. Create an .env file and place in in the root folder of the app.
The file content should look like this:
```
GITHUB_CLIENT_ID=xxxxxxx
GITHUB_SECRET=xxxxxxxx
FACEBOOK_APP_ID=xxxxxxx
FACEBOOK_APP_NAME=xxxxxx
FACEBOOK_APP_ID_PREFIX=xxxxx
GOOGLE_API_KEY=xxxxxx
```
Install the dependencies

```sh
$ cd mobiledemo
$ npm install
```
Download native FaceookSDK from [here](https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip). 

Unzip the package and place it in the ~/Documents/FacebookSDK folder on your computer.

### Start the app on the simulator

You need XCode installed to run the app on the simulator.
```
$ react-native run-ios
```
