import { Platform } from "react-native";

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";
/**
 * Test if device is android api 33 or plus
 * @returns boolean
 */
export const IS_ANDROID_API_33_OR_GREATER =
  Platform.OS === "android" && Platform.Version >= 33;
