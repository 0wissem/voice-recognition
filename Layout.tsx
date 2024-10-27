import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RecordingScreen from "./src/screens/RecordingScreen/RecordingScreen";

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
