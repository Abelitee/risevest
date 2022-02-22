import { useState, useRef } from "react";

import { ScrollView } from "../components/Themed";

import tw from "twrnc";
import { Balance, NeedHelp, PlanCard, Quote } from "../components/HomeComp";

import Rise from "../assets/images/rise.svg";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <ScrollView style={tw`flex-1 px-5`} showsVerticalScrollIndicator={false}>
      <Balance />

      <PlanCard navigation={navigation} />

      <NeedHelp />

      <Quote />

      <Rise style={tw`my-7 self-center`} />
    </ScrollView>
  );
}
