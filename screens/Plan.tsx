import { useState } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Text, View, ScrollView } from "../components/Themed";
import { PlanStackScreenProps } from "../types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import * as Progress from "react-native-progress";

import tw from "twrnc";

import { planValues } from "../static/createPlan";
import { TopNav } from "../components/TopNav";
import Ellipse from "../assets/images/ellipse.svg";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import { SlideAreaChart } from "react-native-slide-charts";
import PerformanceChart from "../components/PlanComp";
import { useGet } from "../services/queries";
import { ErrorComp } from "../components/ErrorComp";
import { BarIndicator } from "react-native-indicators";

export function PlanScreen({
  navigation,
  route,
}: PlanStackScreenProps<"PlanScreen">) {
  const { planId } = route.params;

  const colorScheme = useColorScheme();
  const color = Colors[colorScheme];

  const { isLoading, isError, data, error, refetch } = useGet({
    url: "/plans/" + planId,
    id: planId,
  });

  if (isLoading) {
    return (
      <BarIndicator
        color={color.primary}
        size={wp(6.7)}
        count={5}
        style={tw`my-2.5`}
      />
    );
  }
  if (isError) {
    return (
      <View style={tw`flex-1 justify-center`}>
        <ErrorComp title="Failed to fetch plan Info" action={() => refetch()} />
      </View>
    );
  }

  function handleNext() {
    navigation.navigate("CreatePlan");
  }

  function handleBack() {
    navigation.goBack();
  }

  const planDtls = [
    {
      title: "Total earnings",
      value: "$ 0.00",
    },
    {
      title: "Current earnings",
      value: "$ 0.00",
    },
    {
      title: "Deposit value",
      value: "$ 0.00",
    },
    {
      title: "Balance in Naira (*₦505)",
      value: "₦ 0.00",
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-1 px-5 `}>
      <ImageBackground
        source={require("../assets/images/cart.jpg")}
        style={tw`overflow-hidden h-30 -mx-5 px-5 shadow-xl justify-center`}
        blurRadius={19}
      >
        <TopNav
          title={data.plan_name}
          sub="Business"
          color="white"
          action={handleBack}
          RightIcon={Ellipse}
          style={tw`bg-transparent`}
        />
      </ImageBackground>

      <View style={tw`justify-center items-center mt-7`}>
        <Text style={tw`text-base text-[#71879C]`}>Plan Balance</Text>
        <Text style={[tw`text-2xl`, { fontFamily: "tomatoB" }]}>
          $ {data.invested_amount}.00
        </Text>
        <Text style={tw`text-base text-[#71879C]`}>~ ₦0.00</Text>

        <Text style={tw`text-lg mt-2`}>Gains</Text>
        <Text style={tw`text-lg text-[#27BF41]`}>+$0.00 • +0% </Text>
      </View>

      <View>
        <View style={tw`flex-row justify-between mt-5`}>
          <Text style={tw`text-base text-[#71879C]`}>0.00 achieved</Text>
          <Text style={tw`text-base text-[#71879C]`}>
            Target: $ {data.target_amount}
          </Text>
        </View>

        <Progress.Bar
          progress={0}
          width={wp(90)}
          color={color.primary}
          unfilledColor="rgba(113,135,156,0.1)"
          borderWidth={0}
          height={wp(1.5)}
          borderRadius={wp(4)}
          style={tw`mt-3`}
        />
      </View>

      <View>
        <View
          style={tw`self-center justify-center items-center py-2 px-4 rounded-full bg-[rgba(113,135,156,0.1)] my-5`}
        >
          <Text style={tw`text-base text-[#71879C]`}>
            Results are updated monthly
          </Text>
        </View>

        <Button
          title="+ Fund plan"
          titleColor={color.primary}
          style={tw`bg-[rgba(113,135,156,0.1)] py-4`}
        />
      </View>

      <PerformanceChart data={data} />
      <View style={tw`mb-10`}>
        {planDtls.map((res, idx) => {
          return (
            <View style={tw`my-2`} key={idx}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-lg text-[#71879C]`}>{res.title}</Text>
                <Text style={tw`text-lg`}>{res.value}</Text>
              </View>
              <View
                style={tw`border border-[rgba(113,135,156,0.1)] rounded-full mt-3`}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
