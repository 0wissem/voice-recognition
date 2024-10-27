import React from "react";
import { render } from "@testing-library/react-native";
import CustomCardContainer from "./CustomCardContainer";
import componentStyles from "./CustomCardContainer.styles";
import { styles } from "@utils/styles";
import { Text } from "react-native";

describe("CustomCardContainer", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <CustomCardContainer>
        <Text>Test Child</Text>
      </CustomCardContainer>
    );

    // Check if the child text is rendered
    expect(getByText("Test Child")).toBeTruthy();
  });

  it("applies container and shadow styles", () => {
    const { getByTestId } = render(
      <CustomCardContainer>
        <Text>Test Child</Text>
      </CustomCardContainer>
    );

    // Test if the styles are applied correctly
    const container = getByTestId("custom-card-container");

    expect(container.props.style).toContainEqual(componentStyles.container);
    expect(container.props.style).toContainEqual(styles.SHADOW);
  });
});
