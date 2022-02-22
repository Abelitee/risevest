import React, { useState, useRef } from "react";

import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons as Icon } from "@expo/vector-icons";
import tw from "twrnc";
import { BoardValues } from "../static/onboarding";
import { Color } from "react-native-svg";
import { RootStackScreenProps } from "../types";

export default function OnboardingScreen({
  navigation,
}: RootStackScreenProps<"Onboarding">) {
  const [active, setActive] = useState(0);

  const ref = useRef<Carousel<number>>(null);

  const RenderComp: React.FC<{ item: any; index: number }> = ({
    item,
    index,
  }) => {
    function handleNav(value: any) {
      navigation.navigate(value);
    }
    return (
      <View style={[[styles.renderBox], { backgroundColor: item.bg }]}>
        <View style={[tw`bg-transparent items-center mt-10 `, {maxHeight: wp(70)}]}>
          <item.img maxHeight={wp(60)}  maxWidth={wp(60)} />

          <Dots color={item.color} />
        </View>

        <View style={tw`bg-transparent`}>
          <Text style={[styles.title, { color: item.color }]}>
            {item.title}
          </Text>

          <Text style={styles.sub}>{item.sub}</Text>
        </View>

        {index !== 2 ? (
          <View style={styles.base}>
            <TouchableOpacity
              style={styles.back}
              disabled={index === 0 ? true : false}
              onPress={() => {
                index !== 0 && ref.current?.snapToItem(0);
              }}
            >
              <Icon
                name="arrow-back"
                size={wp(6)}
                color={index !== 0 ? item.color : "#94A1AD"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                ref.current?.snapToItem(index + 1);
              }}
            >
              <Text style={[styles.next, { color: item.color }]}>Next</Text>

              <Icon name="arrow-forward" size={wp(6)} color={item.color} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.signUp}
              onPress={() => {
                handleNav("SignUp");
              }}
            >
              <Text style={[styles.authTitle, { color: "white" }]}>
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                handleNav("SignIn");
              }}
            >
              <Text style={[styles.authTitle, { color: "#0898A0" }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const Dots: React.FC<{ color: string }> = ({ color }) => {
    return (
      <Pagination
        dotsLength={BoardValues.length}
        activeDotIndex={active}
        containerStyle={{
          //   backgroundColor: "rgba(0, 0, 0, 0.75)",
          width: wp(20),
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          backgroundColor: color,
        }}
        inactiveDotStyle={{
          backgroundColor: "#C4C4C4",
          width: 8,
          height: 8,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        data={BoardValues}
        decelerationRate="fast"
        renderItem={RenderComp}
        sliderWidth={wp(100)}
        itemWidth={wp(100)}
        onSnapToItem={(idx) => {
          setActive(idx);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: wp(7),
    fontWeight: "bold",
    fontFamily: "tomato",
  },
  sub: {
    fontSize: wp(4),
    marginTop: wp(3),
  },
  renderBox: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: wp(8),
    paddingHorizontal: wp(5),
  },
  base: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  back: {
    padding: wp(3),
    borderRadius: 8,
    backgroundColor: "rgba(113, 135, 156, 0.1)",
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(113, 135, 156, 0.1)",
    borderRadius: 8,
    padding: wp(3),
  },
  next: {
    fontSize: wp(4),
    marginRight: wp(3),
    fontFamily: "DMB",
  },
  signUp: {
    padding: wp(5),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0898A0",
  },
  signIn: {
    padding: wp(4),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(113, 135, 156, 0.1)",
    marginTop: wp(2),
  },
  authTitle: {
    fontSize: wp(4),
    fontFamily: "DMB",
  },
});
