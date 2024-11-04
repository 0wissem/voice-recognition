import { StyleSheet } from "react-native";

import { colors } from "@utils/colors";

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.RED,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  titleText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.WHITE,
    textTransform: "capitalize",
  },
});
