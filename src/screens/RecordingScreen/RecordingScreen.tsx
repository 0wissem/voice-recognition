import { View } from "react-native";
import React, { useCallback } from "react";
import styles from "./RecordingScreen.styles";
import CustomButton from "@components/CustomButton/CustomButton";
import useSpeechToText from "@features/recording/hooks/useSpeechToText";
import SpeechTextDisplayCard from "@features/recording/components/SpeechTextDisplayCard/SpeechTextDisplayCard";
const RecordingScreen: React.FC = () => {
  const { error, isListening, recognizedText, startRecording, stopRecording } =
    useSpeechToText();
  const buttonTitle = isListening ? "Stop" : "Start";
  const _recognizedText = isListening ? `${recognizedText}...` : recognizedText;
  const onToggleRecording = useCallback(() => {
    const action = isListening ? stopRecording : startRecording;
    action();
  }, [isListening]);

  return (
    <View style={styles.container}>
      <SpeechTextDisplayCard
        recognizedText={_recognizedText}
        placeholder="Start your speech"
      />
      <CustomButton onPress={onToggleRecording} title={buttonTitle} />
    </View>
  );
};

export default RecordingScreen;
