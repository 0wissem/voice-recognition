import { Platform } from "react-native";

export const IS_IOS: boolean = Platform.OS === "ios";
export const IS_ANDROID: boolean = Platform.OS === "android";
/**
 * Test if device is android api 33 or plus
 * @returns boolean
 */
export const IS_ANDROID_API_33_OR_GREATER: boolean =
  Platform.OS === "android" && Platform.Version >= 33;
