import React from "react";
import {
  type DimensionValue,
  type StyleProp,
  Text,
  TouchableOpacity,
  type ViewStyle,
} from "react-native";

import styles from "./CustomButton.styles";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  width?: DimensionValue;
  containerFlex?: number;
  isDisabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  width,
  containerFlex,
  isDisabled,
}) => {
  const getContainerStyle = () => {
    const containerStyle: StyleProp<ViewStyle> = [
      styles.container,
      {
        width,
        flex: containerFlex,
      },
    ];
    if (isDisabled) {
      containerStyle.push(styles.disabledContainer);
    }
    containerStyle.push(styles.container);
    return containerStyle;
  };

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      onPress={onPress}
      accessibilityRole="button"
      disabled={isDisabled}
    >
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
