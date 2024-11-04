interface VoiceSettings {
  EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: number;
  EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: number;
  EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: number;
}
/**
 * These parameters control the addition of a delay, measured in milliseconds, after the user mutes their voice during recording. By default, on Android, the onSpeechEnd event is triggered as soon as the user stops speaking.
 */
export const VOICE_SETTINGS: VoiceSettings = {
  EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 200000000000,
  EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 200000000000,
  EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 200000000000,
};
