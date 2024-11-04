import { NativeModules, Platform } from "react-native";

export const systemLanguage: string = Platform.select({
  ios:
    NativeModules.SettingsManager?.settings?.AppleLocale ||
    NativeModules.SettingsManager?.settings?.AppleLanguages[0],
  android: NativeModules.I18nManager.localeIdentifier,
});
