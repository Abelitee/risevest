import { useState, useRef } from "react";

import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, View } from "../components/Themed";
import { SignUpStackScreenProps } from "../types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons as Icon } from "@expo/vector-icons";

import tw from "twrnc";
import TextField from "../components/Textfield";
import { inputChecker } from "../static/signup";

export default function SignUpScreen({
  navigation,
}: SignUpStackScreenProps<"SignUpScreen">) {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);



  const passReg = new RegExp("^(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{8,}$");

  const passResult = passReg.test(password);

  const passRef = useRef<TextInput>(null);

  function handleNav() {
    navigation.navigate("SignUpInfo", { email, password });
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={tw`mt-16 mb-9 `}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.sub}>
          Start building your dollar-denominated investment portfolio
        </Text>
      </View>

      <View style={tw`mb-10`}>
        <TextField
          value={email}
          label="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={false}
          onSubmitEditing={() => passRef.current?.focus()}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <TextField
          label="Password"
          value={password}
          refs={passRef}
          keyboardType="visible-password"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={false}
          password={{ isSecure, setIsSecure }}
          style={tw`mt-6`}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>

      <View>
        {inputChecker.map((value, idx) => {
          const result = value.test;
          return (
            <View style={tw`flex-row items-center`} key={idx}>
              <Icon
                name={
                  result.test(password) === true
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                color="#0898A0"
                size={wp(6)}
                style={tw`mr-2`}
              />
              <Text style={styles.reqText}>{value.title}</Text>
            </View>
          );
        })}
      </View>

      <View style={tw`mt-10`}>
        <TouchableOpacity
          style={[styles.btn, { opacity: passResult == true ? 1 : 0.5 }]}
          disabled={passResult === true ? false : true}
          onPress={handleNav}
        >
          <Text style={[styles.btnText, { color: "white" }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: wp(5.8),
    fontFamily: "tomato",
  },
  sub: {
    fontSize: wp(4),
    color: "#71879C",
    marginTop: wp(3),
  },
  textCase: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E8ED",
    borderRadius: 8,
    marginVertical: wp(2),
  },
  textInput: {
    flex: 1,
    padding: wp(4),
    fontFamily: "DMB",
    color: "#222222",
    fontSize: wp(3.8),
  },
  reqText: {
    fontSize: wp(3.8),
  },
  btn: {
    padding: wp(3.5),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0898A0",
  },
  btnText: {
    fontSize: wp(4),
    fontFamily: "DMB",
  },
});
