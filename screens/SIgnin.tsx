import { useState, useRef } from "react";

import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Toast from "react-native-toast-message";

import tw from "twrnc";
import TextField from "../components/Textfield";
import { usePost } from "../services/queries";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function SignIn({ navigation }: RootStackScreenProps<"SignIn">) {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  const passRef = useRef<TextInput>(null);
  const colorScheme = useColorScheme();

  const color = Colors[colorScheme];

  async function handleSuccess(data: any) {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("userInfo", jsonValue);
    await AsyncStorage.setItem("token", data?.token);
    navigation.navigate("Root");
  }

  function handleError(error: Error) {
    const toast = () =>
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: error.message,
        topOffset: 50,
        visibilityTime: 5000,
      });

    toast();
  }

  function handleSignUp() {
    navigation.replace("SignUp");
  }

  const { isLoading, mutate: handleLogin } = usePost({
    url: "/sessions",
    payload: {
      email_address: email,
      password,
    },
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => handleError(error),
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={tw`flex-col flex-1 mb-14 justify-between`}
    >
      <View>
        <View style={tw`mt-16  mb-9`}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.sub}>
            Let's get you logged in to get back to building your
            dollar-denominated investment portfolio.
          </Text>
        </View>

        <View style={tw`mb-6`}>
          <TextField
            value={email}
            label="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            enablesReturnKeyAutomatically={true}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              passRef.current?.focus();
            }}
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
            style={tw`mt-3`}
            onChangeText={(text) => {
              setPassword(text);
            }}
            onSubmitEditing={() => {
              handleLogin();
            }}
          />
        </View>

        <View style={tw`mt-6`}>
          <Button
            title="Sign In"
            isLoading={isLoading}
            style={email && password ? tw`opacity-100` : tw`opacity-50`}
            disabled={email && password && !isLoading ? false : true}
            onPress={() => {
              handleLogin();
            }}
          />

          <Text style={styles.forgot}>I forgot my password</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.altCase} onPress={handleSignUp}>
        <Text style={styles.altText}>
          Don't have an account?{" "}
          <Text style={tw`text-[${color.primary}] text-base`}>Sign up</Text>
        </Text>
      </TouchableOpacity>
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
  forgot: {
    fontSize: wp(3.5),
    color: "#0898A0",
    textAlign: "center",
    fontFamily: "DMB",
    marginTop: wp(5),
  },
  altCase: {},
  altText: {
    fontSize: wp(3.5),
    color: "#71879C",
    textAlign: "center",
    fontFamily: "DMB",
    marginTop: wp(5),
  },
});
