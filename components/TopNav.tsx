import { Text, View, ScrollView } from "../components/Themed";
import tw from "twrnc";

import Close from "../assets/images/close.svg";
import Back from "../assets/images/back.svg";
import { TouchableOpacity } from "react-native";

type navNode = React.ComponentProps<typeof View> & {
  title?: string;
  close?: boolean;
  action?: () => void;
};

export function TopNav({
  title,
  close,
  action,
  style,
  ...restOfProps
}: navNode) {
  return (
    <View style={[tw`flex-row  items-center mt-3`, style]} {...restOfProps}>
      <TouchableOpacity onPress={action}>
        {close ? <Close /> : <Back />}
      </TouchableOpacity>

      <View style={tw`flex-1 items-center pr-10`}>
        <Text style={[tw`text-2xl `, { fontFamily: "tomatoB" }]}>{title}</Text>
      </View>
    </View>
  );
}
