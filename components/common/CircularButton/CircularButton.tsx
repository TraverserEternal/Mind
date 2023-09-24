import React, { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Theme, useThemes } from "../../../utils/useThemes";

interface CircularButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const CircularButton: React.FC<PropsWithChildren<CircularButtonProps>> = ({
  onPress,
  style,
  children,
}) => {
  const { theme } = useThemes();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      width: 50,
      height: 50,
      borderRadius: 25, // Half of the width and height to make it circular
      backgroundColor: theme.buttonBackgroundColor, // Replace with your desired button color
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default CircularButton;
