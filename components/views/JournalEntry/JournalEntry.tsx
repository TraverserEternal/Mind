import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Entry from "../../../declarations/Entry";

interface JournalEntryProps {
  entry: Entry;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write Here"
        placeholderTextColor="#DAD2DB"
        multiline
        style={styles.textInput}
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
    borderBottomWidth: 1,
    marginTop: 20,
    padding: 4,
    marginRight: 20,
    marginLeft: 20,
    borderColor: "#DAD2DB",
  },
  timestamp: {
    position: "absolute",
    top: 10,
    right: 20,
    color: "#DAD2DB",
  },
});

export default JournalEntry;
