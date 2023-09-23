import React, { FC, ReactNode, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Day from "../../../declarations/Day";
import Entry from "../../../declarations/Entry";
import { useJournalContext } from "../../../hooks/useJournalData";
import { theme } from "../../../utils/themes";
import JournalEntry from "../../views/JournalMainView/components/JournalEntry";

type FormattedData =
  | {
      type: "day";
      day: Day;
    }
  | {
      type: "entry";
      index: number;
      dayIndex: number;
      entry: Entry;
    };

const JournalEntriesScrollView: FC = () => {
  const { data, saveData } = useJournalContext();
  let scrollView = useRef<ScrollView | null>(null);
  let hasScrolledToBottom = useRef(false);
  useEffect(() => {
    if (!hasScrolledToBottom.current && scrollView.current) {
      scrollView.current.scrollToEnd();
      hasScrolledToBottom.current = true;
    }
  }, [scrollView.current, hasScrolledToBottom.current]);

  function changeJournalEntry(
    text: string,
    dayIndex: number,
    entryIndex: number
  ): void {
    const newData = [...data];
    newData[dayIndex].entries[entryIndex].text = text;
    saveData(newData);
  }

  const getStickyHeaders = (): number[] => {
    let currentIndex = 0;
    return data.map((day) => {
      const dayIndex = currentIndex;
      currentIndex += day.entries.length + 1;
      return dayIndex;
    });
  };

  const renderJournalEntries = (): ReactNode[] => {
    const formattedData = data.reduce<FormattedData[]>(
      (a, c, dayIndex) => [
        ...a,
        { type: "day", day: c },
        ...c.entries.map<FormattedData>((e, i) => ({
          type: "entry",
          index: i,
          dayIndex: dayIndex,
          entry: e,
        })),
      ],
      []
    );
    return formattedData.map((fD) => {
      return fD.type === "day" ? (
        <View key={fD.day.date.toISOString() + "day"}>
          <Text style={styles.dateText}>{fD.day.date.toDateString()}</Text>
        </View>
      ) : (
        <JournalEntry
          key={fD.entry.timestamp.toISOString() + "entry"}
          onChangeText={(text) =>
            changeJournalEntry(text, fD.dayIndex, fD.index)
          }
          entry={fD.entry}
        />
      );
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      ref={(r) => (scrollView.current = r)}
      stickyHeaderIndices={getStickyHeaders()}
    >
      {renderJournalEntries()}
    </ScrollView>
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
