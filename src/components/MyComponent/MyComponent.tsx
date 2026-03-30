import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type AccessibilityRole,
} from "react-native";
import type { MyComponentProps } from "./MyComponent.types";

/**
 * A fully-typed example React Native component included in this library starter.
 *
 * Replace this component with your own implementation. It demonstrates:
 * - Typed props via `MyComponentProps`
 * - Conditional rendering
 * - `StyleSheet` usage
 * - Accessibility support
 * - `testID` forwarding for tests
 *
 * @example
 * ```tsx
 * import { MyComponent } from "your-library";
 *
 * export default function App() {
 *   return (
 *     <MyComponent
 *       title="Hello World"
 *       description="This is a starter component."
 *       enableButton
 *       buttonText="Tap me"
 *       onPress={() => console.log("pressed")}
 *     />
 *   );
 * }
 * ```
 */
const MyComponent: React.FC<MyComponentProps> = ({
  title,
  description,
  enableButton = false,
  buttonText = "Press me",
  onPress,
  style,
  titleStyle,
  descriptionStyle,
  buttonStyle,
  buttonTextStyle,
  accessibilityLabel,
  testID = "my-component",
}) => {
  return (
    <View
      style={[styles.container, style]}
      accessible
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole={"none" as AccessibilityRole}
      testID={testID}
    >
      <Text style={[styles.title, titleStyle]} testID={`${testID}-title`}>
        {title}
      </Text>

      {description ? (
        <Text
          style={[styles.description, descriptionStyle]}
          testID={`${testID}-description`}
        >
          {description}
        </Text>
      ) : null}

      {enableButton ? (
        <TouchableOpacity
          style={[styles.button, buttonStyle]}
          onPress={onPress}
          activeOpacity={0.8}
          testID={`${testID}-button`}
          accessibilityRole="button"
          accessibilityLabel={buttonText}
        >
          <Text style={[styles.buttonText, buttonTextStyle]}>{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "#3b82f6",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default MyComponent;
