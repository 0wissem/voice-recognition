import { useState, useEffect, useCallback, useRef } from "react";
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import { requestAudioPermission } from "@features/recording/utils/helpers/permissions.helpers";
import { translate } from "@locales/i18n";
import { systemLanguage } from "@utils/helpers/language.helpers";
import { VOICE_SETTINGS } from "../utils/helpers/constants";
import { IS_IOS } from "@utils/constants";

// Define a type for the hook's return value
interface IUseSpeechToText {
  isListening: boolean;
  recognizedText: string;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
}

export default function useSpeechToText(): IUseSpeechToText {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  // We have introduced three references to manage the speech text.
  const previousTextToPrependRef = useRef<string>("");
  const lastResultRef = useRef<string>("");
  const inputTextRef = useRef<string>("");

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (): void => {
    setIsListening(true);
  };

  const onSpeechEnd = (): void => {
    if (IS_IOS) {
      setIsListening(false);
    }
    return;
  };
  // we used refs here, The issue is that when the user stops speaking, the onSpeechPartialResults event only returns the newly detected text (after the mute). To address this, we need to store all detected text segments in different ways, allowing us to handle new text results and concatenate them with a stored reference, inputTextRef, which holds the complete text.
  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e.value && !e.value[0].startsWith?.(lastResultRef.current)) {
      previousTextToPrependRef.current = inputTextRef.current;
    }
    if (e.value && e.value.length > 0) {
      inputTextRef.current = previousTextToPrependRef.current + e.value[0];
      lastResultRef.current = e.value[0];
    }
    setRecognizedText(inputTextRef.current);
  };

  const onSpeechError = (event: SpeechErrorEvent) => {
    setError(event.error?.message || translate("errors.errorOccured"));
    setIsListening(false);
  };

  const startRecording = useCallback(async (): Promise<void> => {
    try {
      const hasPermission = await requestAudioPermission();
      if (!hasPermission) {
        return;
      }
      setRecognizedText("");
      setError(null);
      // we clean refs each time we start a new recording.
      previousTextToPrependRef.current = "";
      lastResultRef.current = "";
      inputTextRef.current = "";
      await Voice.start(systemLanguage, VOICE_SETTINGS);
      setIsListening(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : translate("errors.errorOccured")
      );
      console.error("Error starting voice recognition:", err);
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<void> => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : translate("errors.errorOccured")
      );
      console.error("Error stopping voice recognition:", err);
    }
  }, []);

  return {
    isListening,
    recognizedText,
    error,
    startRecording,
    stopRecording,
  };
}
