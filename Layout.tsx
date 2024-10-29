import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RecordingScreen from "./src/screens/RecordingScreen/RecordingScreen";
import { LogBox } from "react-native";

// remove a common warning coming from react-native-voice.
// https://github.com/react-native-voice/voice/issues/357#issuecomment-1229499442
LogBox.ignoreLogs(["new NativeEventEmitter"]);

const Layout: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RecordingScreen />
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
