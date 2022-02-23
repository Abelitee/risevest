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
import { CreatePlan } from "../screens/CreatePlan";
import { PlanInfo, PlanReview } from "../components/CreatePlanComp";
import SuccessModal from "../components/SuccessModal";
import { View } from "../components/Themed";
import tw from "twrnc";
import { PlanScreen } from "../screens/Plan";

interface NavigationNode {
  colorScheme: ColorSchemeName;
  onboarding: boolean;
  token: boolean;
}

export default function Navigation({
  colorScheme,
  token,
  onboarding,
}: NavigationNode) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator token={token} onboarding={onboarding} />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({
  onboarding,
  token,
}: {
  onboarding: boolean;
  token: boolean;
}) {
  const colorScheme = useColorScheme();

  const defaultRoute = !onboarding ? "Onboarding" : !token ? "SignIn" : "Root";

  return (
    <Stack.Navigator
      initialRouteName={defaultRoute}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors[colorScheme].background,
          paddingTop: Constants.statusBarHeight,
        },
      }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />

      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      <Stack.Screen name="Plan" component={PlanNavigator} />

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
      <PlanStack.Screen name="PlanScreen" component={PlanScreen} />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <PlanStack.Screen
          name="CreatePlan"
          component={CreatePlan}
          options={{ presentation: "modal" }}
        />
        <PlanStack.Screen name="PlanInfo" component={PlanInfo} />
        <PlanStack.Screen name="PlanReview" component={PlanReview} />
      </Stack.Group>
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
