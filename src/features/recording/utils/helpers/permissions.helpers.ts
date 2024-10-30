import { Audio } from "expo-av";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

export const isAudioPermissionDenied = async (): Promise<boolean> => {
  try {
    const { status } = await Audio.getPermissionsAsync();

    if (status === Audio.PermissionStatus.DENIED) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to check audio permission:", error);
    return false;
  }
};
// Function to request audio recording permission and handle denial by opening settings
export const requestAudioPermission = async (): Promise<boolean> => {
  const blockedPermission = await isAudioPermissionDenied();
  if (blockedPermission) {
    askToOpenSettingsAlert();
    return false;
  }

  try {
    const { status } = await Audio.requestPermissionsAsync();

    if (status === Audio.PermissionStatus.GRANTED) {
      return true;
    } else if (status === Audio.PermissionStatus.DENIED) {
      return false;
    }
    return false;
  } catch (error) {
    console.error("Failed to request audio permission:", error);
    return false;
  }
};

// Function to open app settings
export const openAppSettings = async (): Promise<void> => {
  try {
    await Linking.openSettings();
  } catch (error) {
    console.error("Failed to open app settings:", error);
  }
};

// Function to show an alert asking to go to app settings
export const askToOpenSettingsAlert = (): void => {
  Alert.alert("Audio permission required", "Open app settings?", [
    { onPress: openAppSettings, text: "Yes" },
    { onPress: () => {}, text: "No" },
  ]);
};
