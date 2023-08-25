import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Entry from "../../../declarations/Entry";
import { theme } from "../../../utils/themes";

interface JournalEntryProps {
  entry: Entry;
  onChange: (text: string) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write Here"
        placeholderTextColor={theme.secondaryTextColor}
        multiline
        style={styles.textInput}
        onChangeText={onChange}
      >
        {entry.text}
      </TextInput>
      <Text style={styles.timestamp}>
        {entry.timestamp.toLocaleTimeString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  textInput: {
    color: theme.textColor,
    borderBottomWidth: 1,
    marginTop: 20,
    padding: 4,
    marginRight: 20,
    marginLeft: 20,
    borderColor: theme.secondaryTextColor,
  },
  timestamp: {
    position: "absolute",
    top: 10,
    right: 20,
    color: theme.secondaryTextColor,
  },
});

export default JournalEntry;
