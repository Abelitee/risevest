import React, { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons as Icon } from "@expo/vector-icons";
import tw from "twrnc";
import { BoardValues } from "../static/onboarding";
import { RootStackScreenProps } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingScreen({
  navigation,
}: RootStackScreenProps<"Onboarding">) {
  const [active, setActive] = useState(0);

  const ref = useRef<Carousel<number>>(null);

  const color =
    active === 0
      ? "#FE7122"
      : active === 1
      ? "#B80074"
      : active === 2
      ? "#0898A0"
      : "#0898A0";

  async function handleNav(value: any) {
    await AsyncStorage.setItem("onboarding", "true");
    navigation.navigate(value);
  }

  const RenderComp: React.FC<{ item: any; index: number }> = ({
    item,
    index,
  }) => {
    return (
      <View style={[[styles.renderBox], { backgroundColor: item.bg }]}>
        <View style={[tw`bg-transparent items-center mt-10 mb-20 `]}>
          <item.img maxHeight={wp(60)} maxWidth={wp(60)} />
        </View>

        <View style={tw`bg-transparent mt-15`}>
          <Text style={[styles.title, { color: item.color }]}>
            {item.title}
          </Text>

          <Text style={styles.sub}>{item.sub}</Text>
        </View>
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
        inactiveSlideScale={1}
        onBeforeSnapToItem={(idx) => {
          setActive(idx);
        }}
      />

      <View style={tw`absolute top-90 left-40 bg-transparent`}>
        <Dots color={color} />
      </View>

      <View style={tw`absolute bottom-30 px-5 bg-transparent w-100`}>
        {active !== 2 ? (
          <View style={styles.base}>
            <TouchableOpacity
              style={styles.back}
              disabled={active === 0 ? true : false}
              onPress={() => {
                active !== 0 && ref.current?.snapToItem(0);
              }}
            >
              <Icon
                name="arrow-back"
                size={wp(6)}
                color={active !== 0 ? color : "#94A1AD"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                ref.current?.snapToItem(active + 1);
              }}
            >
              <Text style={[styles.next, { color: color }]}>Next</Text>

              <Icon name="arrow-forward" size={wp(6)} color={color} />
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
    // justifyContent: "center",
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
