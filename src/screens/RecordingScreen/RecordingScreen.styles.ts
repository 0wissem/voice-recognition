import { colors } from "@utils/colors";

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 13,
    justifyContent: "space-between",
    backgroundColor: colors.WHITE,
  },
  recognizedText: {
    fontSize: 14,
    color: colors.TEXT_PARAGRAPH,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 14,
    color: colors.GREY_MEDIUM,
    textAlign: "center",
  },
});
