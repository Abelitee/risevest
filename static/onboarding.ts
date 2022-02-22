import { SvgProps } from "react-native-svg";
import Badge from "../assets/images/badge.svg";
import Scope from "../assets/images/scope.svg";
import Meter from "../assets/images/meter.svg";

interface valueNode {
  title: string;
  sub: string;
  color: string;
  bg: string;
  img: React.FC<SvgProps>;
}

export const BoardValues: valueNode[] = [
  {
    title: "Quality assets",
    sub: "Rise invests your money into the best dollar investments around the world.",
    color: "#FE7122",
    bg: "#FEFAF7",
    img: Badge,
  },
  {
    title: "Superior Selection",
    sub: "Our expert team and intelligent algorithms select assets that beat the markets.",
    color: "#B80074",
    bg: "#FDF4F9",
    img: Scope,
  },
  {
    title: "Better Performance",
    sub: "You earn more returns, achieve more of your financial goals and protect your money from devaluation.",
    color: "#0898A0",
    bg: "#F6FFFE",
    img: Meter,
  },
];
