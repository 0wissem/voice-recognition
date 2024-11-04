import { ObjectValue } from "./types";

export const colors = {
  RED: "#CD001A",
  GREY_MEDIUM: "#667085",
  WHITE: "#ffffff",
  BLACK: "#000000",
  TEXT_PARAGRAPH: "#374955",
  ERROR: "#FF0000",
  SHADOW: "#101828",
} as const;

export type colorEnumType = ObjectValue<typeof colors>;
