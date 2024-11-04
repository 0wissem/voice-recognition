import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RecordingScreen from "./RecordingScreen";
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

jest.mock("i18next", () => ({
  createInstance: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    init: jest.fn().mockReturnValue(Promise.resolve()),
    t: jest.fn((str) => str),
  })),
}));

jest.mock("react-i18next", () => ({
  initReactI18next: {
    init: jest.fn(),
  },
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
    expect(getByText("global.start")).toBeTruthy();

    // Check that the CustomButton renders with the correct initial title
    expect(getByText("recording.introduction")).toBeTruthy();
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
    expect(getByText("global.stop")).toBeTruthy();
  });

  it("calls startRecording when button is pressed and isListening is false", () => {
    const { getByText } = render(<RecordingScreen />);

    const startButton = getByText("global.start");
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

    const stopButton = getByText("global.stop");
    fireEvent.press(stopButton);

    expect(mockStopRecording).toHaveBeenCalled();
  });
});
