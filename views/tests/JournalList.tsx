import React from "react";
import { Button, Text, View } from "react-native";
import Entry from "../../declarations/Entry";
import useJournalData from "../../hooks/useJournalData";

const JournalApp: React.FC = () => {
  const { data, lastUpdated, saveData } = useJournalData();

  const handleAddEntry = () => {
    // Create a new entry
    const newEntry: Entry = {
      timestamp: new Date(),
      text: "New journal entry",
      tags: ["default"],
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
    <View>
      {data.map((day) => (
        <View key={day.date.toISOString()}>
          <Text>{day.date.toDateString()}</Text>
          {day.entries.map((entry) => (
            <Text key={entry.timestamp.toISOString()}>{entry.text}</Text>
          ))}
        </View>
      ))}
      <Text>
        Last Updated:{" "}
        {lastUpdated
          ? lastUpdated.toDateString() +
            " at " +
            lastUpdated.toLocaleTimeString()
          : "Never"}
      </Text>
      <Button title="Add Entry" onPress={handleAddEntry} />
    </View>
  );
};

export default JournalApp;
