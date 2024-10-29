import React from "react";
import { render } from "@testing-library/react-native";
import SpeechTextDisplayCard from "./SpeechTextDisplayCard";
import styles from "./SpeechTextDisplayCard.styles";

describe("SpeechTextDisplayCard", () => {
  test("displays recognizedText when provided", () => {
    const { getByText } = render(
      <SpeechTextDisplayCard
        recognizedText="Test recognized text"
        placeholder="Placeholder text"
      />
    );
    expect(getByText("Test recognized text")).toBeTruthy();
  });

  test("displays placeholder when recognizedText is empty", () => {
    const { getByText } = render(
      <SpeechTextDisplayCard recognizedText="" placeholder="Placeholder text" />
    );
    expect(getByText("Placeholder text")).toBeTruthy();
  });

  test("applies the correct style for recognizedText", () => {
    const { getByText } = render(
      <SpeechTextDisplayCard
        recognizedText="Styled recognized text"
        placeholder="Placeholder text"
      />
    );
    const recognizedText = getByText("Styled recognized text");
    expect(recognizedText.props.style).toBe(styles.recognizedText);
  });

  test("applies the correct style for placeholder", () => {
    const { getByText } = render(
      <SpeechTextDisplayCard
        recognizedText=""
        placeholder="Styled placeholder text"
      />
    );
    const placeholderText = getByText("Styled placeholder text");
    expect(placeholderText.props.style).toBe(styles.descriptionText);
  });
});
