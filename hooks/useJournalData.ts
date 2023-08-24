import CryptoES from "crypto-es";
import deepEqual from "deep-equal";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import Day from "../declarations/Day";
import Entry from "../declarations/Entry";
import {
  JOURNAL_DATA_DIRECTORY,
  JOURNAL_METADATA_DIRECTORY,
  METADATA_FILE_PATH,
} from "../utils/constants";
import { useKeyContext } from "./KeyContext";

const useJournalData = () => {
  const [data, setData] = useState<Day[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [key, _] = useKeyContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (key === null) {
          console.error("key is NULL");
          return;
        }

        await FileSystem.makeDirectoryAsync(JOURNAL_DATA_DIRECTORY, {
          intermediates: true,
        });
        await FileSystem.makeDirectoryAsync(JOURNAL_METADATA_DIRECTORY, {
          intermediates: true,
        });
        const files = await FileSystem.readDirectoryAsync(
          JOURNAL_DATA_DIRECTORY
        );

        const loadedData: Day[] = [];
        for (const file of files) {
          const dayData = await FileSystem.readAsStringAsync(
            JOURNAL_DATA_DIRECTORY + file
          );

          loadedData.push(
            deserializeDay(
              JSON.parse(
                CryptoES.AES.decrypt(dayData, key).toString(CryptoES.enc.Utf8)
              )
            )
          );
        }

        setData(loadedData);
        const exists = await FileSystem.getInfoAsync(METADATA_FILE_PATH).then(
          (data) => data.exists
        );
        if (!exists) {
          setLastUpdated(null);
          return;
        }
        const metadata = await FileSystem.readAsStringAsync(METADATA_FILE_PATH);
        const metadataJson = JSON.parse(metadata);
        setLastUpdated(new Date(metadataJson.lastUpdated));
      } catch (error) {
        console.error("Error fetching journal data:", error);
      }
    };

    fetchData();
  }, []);

  const deserializeDay = (day: any): Day => {
    const entries: Entry[] = [];
    for (const entry of day.entries) {
      entries.push(
        new Entry(entry.text, entry.tags, new Date(entry.timestamp))
      );
    }
    return new Day(entries, new Date(day.date));
  };

  const saveData = async (newData: Day[]) => {
    try {
      if (key === null) {
        console.error("key is null");
        return;
      }
      for (const index in newData) {
        const day = newData[index];
        if (!deepEqual(day, data[index]) && data[index] !== undefined) continue;

        await FileSystem.writeAsStringAsync(
          JOURNAL_DATA_DIRECTORY +
            day.date.toISOString().replace(/:|-/g, "") +
            ".json",
          CryptoES.AES.encrypt(JSON.stringify(day), key).toString()
        );
      }

      const metadata = {
        lastUpdated: new Date(),
      };
      await FileSystem.writeAsStringAsync(
        METADATA_FILE_PATH,
        JSON.stringify(metadata)
      );

      setData(newData);
      setLastUpdated(metadata.lastUpdated);
    } catch (error) {
      console.error("Error saving journal data:", error);
    }
  };

  return {
    data,
    lastUpdated,
    saveData,
  };
};

export default useJournalData;
