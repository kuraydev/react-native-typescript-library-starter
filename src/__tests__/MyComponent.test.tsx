import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { MyComponent } from "../index";

describe("MyComponent", () => {
  describe("rendering", () => {
    it("renders the title", () => {
      const { getByTestId } = render(<MyComponent title="Hello World" />);
      expect(getByTestId("my-component-title").props.children).toBe(
        "Hello World",
      );
    });

    it("does not render description when omitted", () => {
      const { queryByTestId } = render(<MyComponent title="Hello" />);
      expect(queryByTestId("my-component-description")).toBeNull();
    });

    it("renders description when provided", () => {
      const { getByTestId } = render(
        <MyComponent title="Hello" description="A description" />,
      );
      expect(getByTestId("my-component-description").props.children).toBe(
        "A description",
      );
    });

    it("does not render button by default", () => {
      const { queryByTestId } = render(<MyComponent title="Hello" />);
      expect(queryByTestId("my-component-button")).toBeNull();
    });

    it("renders button when enableButton is true", () => {
      const { getByTestId } = render(
        <MyComponent title="Hello" enableButton />,
      );
      expect(getByTestId("my-component-button")).toBeTruthy();
    });

    it("renders custom buttonText", () => {
      const { getByText } = render(
        <MyComponent title="Hello" enableButton buttonText="Click me" />,
      );
      expect(getByText("Click me")).toBeTruthy();
    });

    it("uses default button text when buttonText is omitted", () => {
      const { getByText } = render(<MyComponent title="Hello" enableButton />);
      expect(getByText("Press me")).toBeTruthy();
    });
  });

  describe("testID forwarding", () => {
    it("uses default testID", () => {
      const { getByTestId } = render(<MyComponent title="Hello" />);
      expect(getByTestId("my-component")).toBeTruthy();
    });

    it("uses custom testID", () => {
      const { getByTestId } = render(
        <MyComponent title="Hello" testID="custom-id" />,
      );
      expect(getByTestId("custom-id")).toBeTruthy();
      expect(getByTestId("custom-id-title")).toBeTruthy();
    });
  });

  describe("interactions", () => {
    it("calls onPress when button is pressed", () => {
      const onPress = jest.fn();
      const { getByTestId } = render(
        <MyComponent title="Hello" enableButton onPress={onPress} />,
      );
      fireEvent.press(getByTestId("my-component-button"));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("does not throw when button pressed without onPress handler", () => {
      const { getByTestId } = render(
        <MyComponent title="Hello" enableButton />,
      );
      expect(() =>
        fireEvent.press(getByTestId("my-component-button")),
      ).not.toThrow();
    });
  });

  describe("accessibility", () => {
    it("sets accessibilityLabel to title by default", () => {
      const { getByTestId } = render(<MyComponent title="My Title" />);
      expect(getByTestId("my-component").props.accessibilityLabel).toBe(
        "My Title",
      );
    });

    it("uses custom accessibilityLabel when provided", () => {
      const { getByTestId } = render(
        <MyComponent title="My Title" accessibilityLabel="Custom Label" />,
      );
      expect(getByTestId("my-component").props.accessibilityLabel).toBe(
        "Custom Label",
      );
    });
  });
});
