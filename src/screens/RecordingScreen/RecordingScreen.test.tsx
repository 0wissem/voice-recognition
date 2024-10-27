import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RecordingScreen from "./RecordingScreen";
import SpeechTextDisplayCard from "@features/recording/components/SpeechTextDisplayCard/SpeechTextDisplayCard";
import CustomButton from "@components/CustomButton/CustomButton";
import useSpeechToText from "@features/recording/hooks/useSpeechToText";

// Mock the useSpeechToText hook
jest.mock("@features/recording/hooks/useSpeechToText");
// Mock Voice module
jest.mock("@react-native-voice/voice", () => ({
  onSpeechStart: jest.fn(),
  onSpeechEnd: jest.fn(),
  onSpeechResults: jest.fn(),
  onSpeechError: jest.fn(),
  onSpeechPartialResults: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  destroy: jest.fn(),
  removeAllListeners: jest.fn(),
}));
describe("RecordingScreen", () => {
  const mockStartRecording = jest.fn();
  const mockStopRecording = jest.fn();

  beforeEach(() => {
    // Set default mock implementation of the hook
    (useSpeechToText as jest.Mock).mockReturnValue({
      error: null,
      isListening: false,
      recognizedText: "",
      startRecording: mockStartRecording,
      stopRecording: mockStopRecording,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders SpeechTextDisplayCard and CustomButton", () => {
    const { getByText } = render(<RecordingScreen />);

    // Check that SpeechTextDisplayCard renders with the correct placeholder
    expect(getByText("Start your speech")).toBeTruthy();

    // Check that the CustomButton renders with the correct initial title
    expect(getByText("Start")).toBeTruthy();
  });

  it("displays recognized text with ellipsis when isListening is true", () => {
    // Update the mock to simulate the listening state
    (useSpeechToText as jest.Mock).mockReturnValue({
      error: null,
      isListening: true,
      recognizedText: "Hello",
      startRecording: mockStartRecording,
      stopRecording: mockStopRecording,
    });

    const { getByText } = render(<RecordingScreen />);

    // Check that the recognized text is displayed with ellipsis
    expect(getByText("Hello...")).toBeTruthy();
    // Check that the button title changes to "Stop"
    expect(getByText("Stop")).toBeTruthy();
  });

  it("calls startRecording when button is pressed and isListening is false", () => {
    const { getByText } = render(<RecordingScreen />);

    const startButton = getByText("Start");
    fireEvent.press(startButton);

    expect(mockStartRecording).toHaveBeenCalled();
  });

  it("calls stopRecording when button is pressed and isListening is true", () => {
    (useSpeechToText as jest.Mock).mockReturnValue({
      error: null,
      isListening: true,
      recognizedText: "Test",
      startRecording: mockStartRecording,
      stopRecording: mockStopRecording,
    });

    const { getByText } = render(<RecordingScreen />);

    const stopButton = getByText("Stop");
    fireEvent.press(stopButton);

    expect(mockStopRecording).toHaveBeenCalled();
  });
});
