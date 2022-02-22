import Question from "../assets/images/question.svg";
import Calender from "../assets/images/calender.svg";
import Setting from "../assets/images/setting.svg";
import { SvgProps } from "react-native-svg";
import { KeyboardTypeOptions } from "react-native";

interface valueNode {
  title: string;
  sub: string;
  img: React.FC<SvgProps>;
}

export interface incomeNode {
  question?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
}

interface textChangeNode {
  text: string;
  index: number;
  stateFunctions: {
    setPlanName: React.Dispatch<React.SetStateAction<string>>;
    setPlanAmount: React.Dispatch<React.SetStateAction<string>>;
  };
}

export const planValues: valueNode[] = [
  {
    title: "Give us a few details",
    sub: "Tell us what you want to achieve and we will help you get there.",
    img: Question,
  },
  {
    title: "Turn on auto-invest",
    sub: "The easiest way to get your investment working for you is to fund to periodically. ",
    img: Calender,
  },
  {
    title: "Modify as you progress",
    sub: "You are in charge. Make changes to your plan, from adding funds, funding source, adding money to your wallet and more.",
    img: Setting,
  },
];

export const incomeValues: incomeNode[] = [
  {
    question: "What are you saving for?",
    keyboardType: "default",
  },
  {
    question: "How much do need?",
    keyboardType: "number-pad",
  },
  {
    question: "When do you want to withdraw?",
  },
];

export function handleTextChangeP({
  text,
  index,
  stateFunctions,
}: textChangeNode) {
  if (index === 0) {
    return stateFunctions.setPlanName(text);
  }

  if (index === 1) {
    return stateFunctions.setPlanAmount(text);
  }
}
