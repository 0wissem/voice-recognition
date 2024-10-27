import { StyleSheet, Text, View } from "react-native";
import React from "react";
import componentStyles from "./CustomCardContainer.styles";
import { styles } from "@utils/styles";
interface CustomCardContainerProps {
  children: React.ReactNode;
}

const CustomCardContainer: React.FC<CustomCardContainerProps> = ({
  children,
}) => {
  return (
    <View
      testID="custom-card-container"
      style={[componentStyles.container, styles.SHADOW]}
    >
      {children}
    </View>
  );
};

export default CustomCardContainer;
