import { useState, useEffect } from "react";
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";

// Define a type for the hook's return value
interface UseSpeechToText {
  isListening: boolean;
  recognizedText: string;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
}

export default function useSpeechToText(): UseSpeechToText {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechPartialResults = (event: SpeechResultsEvent) => {
    if (event.value && event.value.length > 0) {
      console.log(event.value[0]);
      setRecognizedText(event.value[0]);
    }
  };

  const onSpeechResults = (event: SpeechResultsEvent) => {
    if (event.value && event.value.length > 0) {
      setRecognizedText(event.value[0]);
    }
  };

  const onSpeechError = (event: SpeechErrorEvent) => {
    setError(event.error?.message || "An error occurred");
    setIsListening(false);
  };

  const startRecording = async () => {
    try {
      setRecognizedText("");
      setError(null);
      await Voice.start("en-US");
      setIsListening(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error starting voice recognition:", err);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error stopping voice recognition:", err);
    }
  };

  return {
    isListening,
    recognizedText,
    error,
    startRecording,
    stopRecording,
  };
}