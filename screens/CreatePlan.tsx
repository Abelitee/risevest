import { ImageBackground } from "react-native";
import { Text, View, ScrollView } from "../components/Themed";
import { PlanStackScreenProps } from "../types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import tw from "twrnc";
import Button from "../components/Button";

import { planValues } from "../static/createPlan";
import { TopNav } from "../components/TopNav";

export function CreatePlan({ navigation }: PlanStackScreenProps<"CreatePlan">) {
  function handleNext() {
    navigation.navigate("PlanInfo");
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <View style={tw`flex-1 px-5 justify-between`}>
      <View>
        <TopNav title="Create a plan" close={true} action={handleBack} />

        <View style={tw`justify-center items-center`}>
          <Text style={tw`text-lg text-[#71879C] my-3`}>
            Reach your goals faster
          </Text>

          <ImageBackground
            source={require("../assets/images/cart.jpg")}
            style={tw`rounded-full overflow-hidden my-10 w-30 h-30 shadow-xl`}
          />
        </View>

        <View>
          {planValues.map((value, idx) => {
            return (
              <View style={tw`flex-row pr-10 mt-7`} key={idx}>
                <value.img width={wp(10)} />

                <View style={tw`ml-5`}>
                  <Text style={[tw`text-lg`, { fontFamily: "DMB" }]}>
                    {value.title}
                  </Text>

                  <Text style={tw`mt-1 text-base text-[#71879C]`}>
                    {value.sub}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <Button title="Continue" style={tw`mb-20`} onPress={handleNext} />
    </View>
  );
}
