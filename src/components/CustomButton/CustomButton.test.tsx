import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "./CustomButton";

// Mock styles for testing
jest.mock("./CustomButton.styles", () => ({
  container: { padding: 10 },
  disabledContainer: { backgroundColor: "gray" },
  titleText: { fontSize: 16 },
}));

describe("CustomButton", () => {
  const mockOnPress = jest.fn();

  afterEach(() => {
    mockOnPress.mockClear();
  });

  it("renders correctly with required props", () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} />
    );
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress when button is pressed", () => {
    const { getByText } = render(
      <CustomButton title="Press Me" onPress={mockOnPress} />
    );

    fireEvent.press(getByText("Press Me"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("applies custom width and flex styles when provided", () => {
    const { getByRole } = render(
      <CustomButton
        title="Styled Button"
        onPress={mockOnPress}
        width={200}
        containerFlex={1}
      />
    );

    const button = getByRole("button");
    expect(button.props.style.width).toEqual(200);
    expect(button.props.style.flex).toEqual(1);
  });

  it("applies disabled style when isDisabled is true", () => {
    const { getByRole } = render(
      <CustomButton title="Disabled Button" onPress={mockOnPress} isDisabled />
    );

    const button = getByRole("button");
    // Verifies that the disabledContainer style is included when isDisabled is true
    expect(button.props.style.backgroundColor).toEqual("gray");
  });

  it("does not call onPress when isDisabled is true", () => {
    const { getByText } = render(
      <CustomButton title="Disabled Button" onPress={mockOnPress} isDisabled />
    );

    fireEvent.press(getByText("Disabled Button"));
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
