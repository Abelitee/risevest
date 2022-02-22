/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Constants from "expo-constants";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import OnboardingScreen from "../screens/Onboarding";
import SignUpScreen from "../screens/Signup";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";

import HomeIcon from "../assets/images/home.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  PlanParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  SignUpParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { SignUpInfo } from "../components/SignupComp";
import SignIn from "../screens/SIgnin";
import Home from "../screens/Home";
import { PlanScreen } from "../screens/CreatePlan";
import { PlanInfo, PlanReview } from "../components/CreatePlanComp";
import SuccessModal from "../components/SuccessModal";
import { View } from "../components/Themed";
import tw from "twrnc";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors[colorScheme].background,
          paddingTop: Constants.statusBarHeight,
        },
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePlan"
        component={PlanNavigator}
        options={{
          presentation: "modal",
        }}
      />

      <Stack.Screen name="SignIn" component={SignIn} />


      <Stack.Screen name="SignUp" component={SignUpNavigator} />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="SuccessModal" component={SuccessModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

// SignUp navigator

const SignUpStack = createNativeStackNavigator<SignUpParamList>();

function SignUpNavigator() {
  const colorScheme = useColorScheme();

  return (
    <SignUpStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          // paddingTop: Constants.statusBarHeight,
          backgroundColor: Colors[colorScheme].background,
        },
      }}
    >
      <SignUpStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <SignUpStack.Screen name="SignUpInfo" component={SignUpInfo} />
    </SignUpStack.Navigator>
  );
}

// Plan navigator

const PlanStack = createNativeStackNavigator<PlanParamList>();

function PlanNavigator() {
  const colorScheme = useColorScheme();

  return (
    <PlanStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
      }}
    >
      <PlanStack.Screen name="PlanInfo" component={PlanInfo} />
      <PlanStack.Screen name="PlanReview" component={PlanReview} />
      <PlanStack.Screen name="PlanScreen" component={PlanScreen} />
    </PlanStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      // initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarItemStyle: { backgroundColor: Colors[colorScheme].background2 },
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          tabBarShowLabel: false,
        }}
      />

      {/* <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      /> */}

      {/* <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <View style={tw`items-center my-3 bg-transparent `}>
      {/* <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} /> */}
      <HomeIcon />
      <View style={tw`h-2 w-2 bg-[#41BCC4] rounded-full mt-2`} />
    </View>
  );
}

export const getData = async (name: string) => {
  try {
    const value = await AsyncStorage.getItem(name);
    const jsonValue = value ? JSON.parse(value) : null;

    return jsonValue;
  } catch (e) {
    console.log(e);
    console.error("shit could not be read");
  }
};
