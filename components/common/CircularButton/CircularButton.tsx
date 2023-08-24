import React, { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

interface CircularButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const CircularButton: React.FC<PropsWithChildren<CircularButtonProps>> = ({
  onPress,
  style,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of the width and height to make it circular
    backgroundColor: "#8a3792", // Replace with your desired button color
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CircularButton;
