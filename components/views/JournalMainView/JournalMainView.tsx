import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Entry from "../../../declarations/Entry";
import useJournalData from "../../../hooks/useJournalData";
import { theme } from "../../../utils/themes";
import CircularButton from "../../common/CircularButton/CircularButton";
import JournalEntry from "../JournalEntry/JournalEntry";

const JournalMainView: React.FC = () => {
  const { data, lastUpdated, saveData } = useJournalData();
  const handleAddEntry = () => {
    // Create a new entry
    const newEntry: Entry = {
      timestamp: new Date(),
      text: "",
      tags: [],
    };

    // Find the current day's data or create a new day
    const currentDate = new Date();
    const existingDayIndex = data.findIndex(
      (day) => day.date.toDateString() === currentDate.toDateString()
    );

    const newData = [...data];
    if (existingDayIndex >= 0) {
      newData[existingDayIndex].entries.push(newEntry);
    } else {
      newData.push({
        date: currentDate,
        entries: [newEntry],
      });
    }

    // Save the updated data
    saveData(newData);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {data.map((day) => (
        <View key={day.date.toISOString()}>
          <Text style={styles.dateText}>{day.date.toDateString()}</Text>
          {day.entries.map((entry) => (
            <JournalEntry key={entry.timestamp.toISOString()} entry={entry} />
          ))}
        </View>
      ))}
      <Text style={styles.lastUpdatedText}>
        Last Updated:{" "}
        {lastUpdated
          ? `${lastUpdated.toDateString()} at ${lastUpdated.toLocaleTimeString()}`
          : "Never"}
      </Text>
      <View style={styles.addButtonContainer}>
        <CircularButton onPress={handleAddEntry}>
          <Icon name="feather" size={20} color="white" />
        </CircularButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: theme.backgroundColor,
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
  },
  dateText: {
    color: theme.textColor,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 30,
  },
  lastUpdatedText: {
    color: theme.secondaryTextColor,
    textAlign: "center",
    marginTop: 20,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});

export default JournalMainView;
