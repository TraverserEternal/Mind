import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Entry from "./declarations/Entry";
import JournalApp from "./views/tests/JournalList";

export type RootStackParamList = {
  Home: undefined;
  EntryDetails: { entry: Entry };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EntryDetails"
          component={JournalApp}
          options={{ title: "Entry Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
