import { FC, PropsWithChildren } from "react";
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { theme } from "../../../utils/themes";

const Button: FC<PropsWithChildren<TouchableOpacityProps>> = ({
  style,
  ...rest
}) => {
  return <TouchableOpacity {...rest} style={[styles, style]} />;
};

const styles: StyleProp<ViewStyle> = {
  backgroundColor: theme.buttonBackgroundColor,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
};

export default Button;
