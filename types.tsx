/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Onboarding: undefined;
  SignUp: NavigatorScreenParams<SignUpParamList> | undefined;
  SignIn: undefined;
  Plan: NavigatorScreenParams<PlanParamList> | undefined;
  SuccessModal: {
    nextScreen: keyof RootStackParamList;
    title?: string;
    sub?: string;
    btnTitle?: string;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

// SignUp Stack

export type SignUpStackScreenProps<Screen extends keyof SignUpParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SignUpParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type SignUpParamList = {
  SignUpScreen: undefined;
  SignUpInfo: {
    email: string;
    password: string;
  };
};

export type PlanStackScreenProps<Screen extends keyof PlanParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PlanParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type PlanParamList = {
  PlanScreen: {
    planId: string;
  };
  CreatePlan: undefined;
  PlanInfo: undefined;
  PlanReview: {
    planName?: string;
    planDate: Date;
    planAmount?: string;
    planProj: {
      total_invested: number;
      total_returns: number;
    };
  };
};
