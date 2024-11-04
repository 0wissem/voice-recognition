import { View, Text } from "react-native";
import React, { useCallback } from "react";
import styles from "./RecordingScreen.styles";
import CustomButton from "@components/CustomButton/CustomButton";
import useSpeechToText from "@features/recording/hooks/useSpeechToText";
import SpeechTextDisplayCard from "@features/recording/components/SpeechTextDisplayCard/SpeechTextDisplayCard";
import { translate } from "@locales/i18n";

const RecordingScreen: React.FC = () => {
  const { isListening, recognizedText, startRecording, stopRecording } =
    useSpeechToText();
  const buttonTitle = isListening
    ? translate("global.stop")
    : translate("global.start");
  const _recognizedText = isListening ? `${recognizedText}...` : recognizedText;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onToggleRecording = useCallback(() => {
    const action = isListening ? stopRecording : startRecording;
    action();
  }, [isListening]);

  return (
    <View style={styles.container}>
      <SpeechTextDisplayCard
        recognizedText={_recognizedText}
        placeholder={translate("recording.introduction")}
      />
      <CustomButton onPress={onToggleRecording} title={buttonTitle} />
    </View>
  );
};

export default RecordingScreen;
