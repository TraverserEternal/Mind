import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import Entry from "../../../../declarations/Entry";
import { Theme, useThemes } from "../../../../utils/useThemes";

interface JournalEntryProps {
  entry: Entry;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  currentTimeStamp?: Date | null;
}

const JournalEntry: React.FC<JournalEntryProps> = ({
  entry,
  onChangeText,
  style,
  currentTimeStamp,
}) => {
  const { theme } = useThemes();
  const styles = createStyles(theme);
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder="Write Here"
        placeholderTextColor={theme.secondaryTextColor}
        multiline
        style={styles.textInput}
        onChangeText={onChangeText}
      >
        {entry.text}
      </TextInput>
      {/* {currentTimeStamp &&
        currentTimeStamp.toTimeString() !== entry.timestamp.toTimeString() && ( */}
      <Text style={styles.timestamp}>
        {entry.timestamp.toLocaleTimeString()}
      </Text>
      {/* )} */}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: "relative",
    },
    textInput: {
      color: theme.textColor,
      borderBottomWidth: 1,
      marginTop: 20,
      padding: 4,
      borderColor: theme.secondaryTextColor,
    },
    timestamp: {
      position: "absolute",
      top: 10,
      right: 0,
      color: theme.secondaryTextColor,
    },
  });

export default JournalEntry;
