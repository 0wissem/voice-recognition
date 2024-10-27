import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomCardContainer from "@components/CustomCardContainer/CustomCardContainer";
import styles from "./SpeechTextDisplayCard.styles";
interface ISpeechTextDisplayCard {
  recognizedText: string;
  placeholder: string;
}
const SpeechTextDisplayCard: React.FC<ISpeechTextDisplayCard> = ({
  recognizedText = "",
  placeholder = "",
}) => {
  return (
    <CustomCardContainer>
      {!!recognizedText ? (
        <Text style={styles.recognizedText}>{recognizedText}</Text>
      ) : (
        <Text style={styles.descriptionText}>{placeholder}</Text>
      )}
    </CustomCardContainer>
  );
};

export default SpeechTextDisplayCard;
