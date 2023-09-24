import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Entry from "../../../declarations/Entry";
import { useJournalContext } from "../../../hooks/useJournalData";
import { Theme, useThemes } from "../../../utils/useThemes";
import CircularButton from "../../common/CircularButton/CircularButton";
import JournalEntriesScrollView from "../../common/JournalEntriesScrollView/JournalEntriesScrollView";
import LastUpdatedText from "./components/LastUpdatedText";

const JournalMainView: React.FC = () => {
  const { theme } = useThemes();
  const { data, saveData } = useJournalContext();
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

  function journalEntryChanged(
    text: string,
    dayIndex: number,
    entryIndex: number
  ): void {
    const newData = [...data];
    newData[dayIndex].entries[entryIndex].text = text;
    saveData(newData);
  }

  function getDayIndices(): number[] {
    let currentIndex = 0;
    return data.map((day) => {
      const dayIndex = currentIndex;
      currentIndex += day.entries.length;
      return dayIndex;
    });
  }
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LastUpdatedText style={styles.lastUpdatedText} />
      <JournalEntriesScrollView />
      <CircularButton
        style={styles.addButtonContainer}
        onPress={handleAddEntry}
      >
        <Icon name="feather" size={20} color={theme.buttonTextColor} />
      </CircularButton>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      backgroundColor: theme.backgroundColor,
      right: 0,
      top: 0,
      bottom: 0,
      left: 0,
    },
    lastUpdatedText: {
      color: theme.secondaryTextColor,
      textAlign: "center",
      paddingTop: 20,
      paddingBottom: 20,
    },
    addButtonContainer: {
      position: "absolute",
      bottom: 30,
      right: 30,
    },
  });

export default JournalMainView;
