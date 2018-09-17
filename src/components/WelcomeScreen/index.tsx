import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import { goToAuth } from "../../navigation/navigation";
import SignIn from "../SignIn";
import styled from "styled-components";

const { width } = Dimensions.get("window");

const photos = [
  {
    image: require("../../assets/welcome1.png"),
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: require("../../assets/welcome2.png"),
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },

  {
    image: require("../../assets/welcome3.png"),
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];

export default class Welcome extends Component {
  private scrollX = new Animated.Value(0);
  public render() {
    const position: any = Animated.divide(this.scrollX, width);

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width, height: width + 100 }}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: this.scrollX } } }
            ])}
            onMomentumScrollEnd={() => {
              if (position.__getValue() / width > 2) {
                goToAuth();
              }
            }}
            scrollEventThrottle={16}
          >
            {photos.map((item, i) => {
              return (
                <View
                  key={i}
                  style={{
                    width,
                    height: width + 100,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image
                    style={{ width: width - 100, height: width - 100 }}
                    source={item.image}
                  />
                  <Text style={{ width: "80%" }}>{item.text}</Text>
                </View>
              );
            })}
            <View
              style={{
                width,
                height: width + 100,
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size="large" color="#000" />
            </View>
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row" }}>
          {photos.map((_, i) => {
            const opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],

              extrapolate: "clamp"
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: "#595959",
                  margin: 8,
                  borderRadius: 5
                }}
              />
            );
          })}
        </View>
        <View>
          <TouchableOpacity
            onPress={goToAuth}
            style={{ padding: 50, alignItems: "center" }}
          >
            <SkipButtonText>Skip</SkipButtonText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const SkipButtonText = styled(Text)`
  color: #bdbdbd;
  font-size: 12px;
`;
