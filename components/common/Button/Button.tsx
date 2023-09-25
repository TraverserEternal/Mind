import { FC } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Theme, useThemes } from "../../../utils/useThemes";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
}

const Button: FC<ButtonProps> = ({ style, label, ...rest }) => {
  const { theme } = useThemes();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity {...rest} style={[styles.touchableOpacity, style]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
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
    text: {
      fontWeight: "bold",
      fontSize: 16,
    },
  });

export default Button;
