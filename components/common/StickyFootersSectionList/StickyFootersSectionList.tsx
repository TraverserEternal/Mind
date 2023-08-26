import React, { FC, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useJournalContext } from "../../../hooks/useJournalData";
import { theme } from "../../../utils/themes";
import JournalEntry from "../../views/JournalMainView/components/JournalEntry";

const JournalEntriesScrollView: FC = () => {
  const [currentTimeStamp, setCurrentTimestamp] = useState<null | Date>(null);
  const { data, saveData } = useJournalContext();
  const [currentDate, setCurrentDate] = useState<null | Date>(null);
  let hasLoadedBefore = useRef(false).current;
  useEffect(() => {
    if (!hasLoadedBefore && data[0] !== undefined) {
      setCurrentDate(data[0].date);
      hasLoadedBefore = true;
    }
  }, [data]);

  const updateStickyDate = (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    const { viewableItems } = info;
    if (viewableItems && viewableItems.length) {
      const lastItem = viewableItems.pop();
      if (lastItem && lastItem.section) {
        setCurrentDate(lastItem.section.title);
      }
      if (
        lastItem &&
        lastItem.item &&
        lastItem.item.entry &&
        lastItem.item.entry.timestamp
      ) {
        setCurrentTimestamp(lastItem.item.entry.timestamp);
      }
    }
  };

  const renderStickyDate = () => {
    return currentDate ? (
      <View style={{ position: "relative" }}>
        <Text style={styles.stickyDate}>{currentDate.toDateString()}</Text>
        <Text style={styles.stickyTimeStamp}>
          {currentTimeStamp?.toLocaleTimeString()}
        </Text>
      </View>
    ) : null;
  };

  function changeJournalEntry(
    text: string,
    dayIndex: number,
    entryIndex: number
  ): void {
    const newData = [...data];
    newData[dayIndex].entries[entryIndex].text = text;
    saveData(newData);
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderStickyDate()}
      <SectionList
        sections={data.map((day, dayIndex) => ({
          title: day.date,
          data: day.entries
            .map((entry, index) => ({
              entry,
              index,
              key: entry.timestamp.toISOString() + "entry",
            }))
            .reverse(),
          dayIndex: dayIndex,
        }))}
        inverted
        showsVerticalScrollIndicator={false}
        keyExtractor={({ key }) => key}
        renderItem={({ item, section: { dayIndex } }) => (
          <JournalEntry
            currentTimeStamp={currentTimeStamp}
            entry={item.entry}
            onChangeText={(text) =>
              changeJournalEntry(text, dayIndex, item.index)
            }
          />
        )}
        onViewableItemsChanged={updateStickyDate}
      />
    </SafeAreaView>
  );
};

export default JournalEntriesScrollView;

const styles = StyleSheet.create({
  stickyTimeStamp: {
    position: "absolute",
    right: 0,
    color: theme.textColor,
    padding: 10,
  },
  dateText: {
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 30,
  },
  container: {
    flex: 1,
    marginBottom: 100,
    borderColor: theme.secondaryTextColor,
    borderBottomWidth: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 24,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
  },
  stickyDate: {
    color: theme.textColor,
    padding: 10,
    textAlign: "center",
  },
});
