import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import Markdown from "react-native-simple-markdown";
import { RootStackParamList } from "../../App"; // Make sure to import the RootStackParamList from your App

type EntryDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EntryDetails"
>;

const EntryDetailsScreen: React.FC<EntryDetailsScreenProps> = ({ route }) => {
  const { entry } = route.params;

  return (
    <View>
      <Text>{entry.timestamp.toISOString()}</Text>
      <Markdown>{entry.text}</Markdown>
      <Text>Tags: {entry.tags.join(", ")}</Text>
    </View>
  );
};

export default EntryDetailsScreen;
