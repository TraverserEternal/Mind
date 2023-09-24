import { FC, PropsWithChildren } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Theme, useThemes } from "../../../utils/useThemes";

const Button: FC<PropsWithChildren<TouchableOpacityProps>> = ({
  style,
  ...rest
}) => {
  const { theme } = useThemes();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity {...rest} style={[styles.touchableOpacity, style]} />
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    touchableOpacity: {
      backgroundColor: theme.buttonBackgroundColor,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
  });

export default Button;
