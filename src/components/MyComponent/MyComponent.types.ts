import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { VoidCallback } from "../../types";

/**
 * Props for the {@link MyComponent} component.
 */
export interface MyComponentProps {
  /**
   * The primary title displayed in the component.
   *
   * @example
   * <MyComponent title="Hello World" />
   */
  title: string;

  /**
   * Optional description text shown below the title.
   *
   * @example
   * <MyComponent title="Hello" description="A short description." />
   */
  description?: string;

  /**
   * When `true`, renders an action button below the content.
   *
   * @defaultValue false
   */
  enableButton?: boolean;

  /**
   * Label text displayed inside the action button.
   * Only visible when {@link enableButton} is `true`.
   *
   * @defaultValue "Press me"
   */
  buttonText?: string;

  /**
   * Callback invoked when the action button is pressed.
   * Only called when {@link enableButton} is `true`.
   *
   * @example
   * <MyComponent enableButton onPress={() => console.log("pressed")} />
   */
  onPress?: VoidCallback;

  /**
   * Override or extend the styles applied to the root container.
   *
   * @example
   * <MyComponent style={{ backgroundColor: "red" }} />
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Override or extend the styles applied to the title text.
   */
  titleStyle?: StyleProp<TextStyle>;

  /**
   * Override or extend the styles applied to the description text.
   */
  descriptionStyle?: StyleProp<TextStyle>;

  /**
   * Override or extend the styles applied to the action button container.
   */
  buttonStyle?: StyleProp<ViewStyle>;

  /**
   * Override or extend the styles applied to the action button label.
   */
  buttonTextStyle?: StyleProp<TextStyle>;

  /**
   * Accessibility label for the root container.
   * Defaults to the value of {@link title}.
   */
  accessibilityLabel?: string;

  /**
   * Test ID used for querying the component in tests.
   *
   * @defaultValue "my-component"
   */
  testID?: string;
}
