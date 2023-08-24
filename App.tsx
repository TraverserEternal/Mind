import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import { StatusBar } from "react-native";
import JournalMainView from "./components/views/JournalMainView/JournalMainView";
import LoginView from "./components/views/LoginView/LoginView";
import PasswordCreateView from "./components/views/PasswordCreate/PasswordCreateView";
import SplashView from "./components/views/SplashView/SplashView";
import { KeyContextProvider } from "./hooks/KeyContext";
import { theme } from "./utils/themes";

export type RootStackParamList = {
  JournalMainView: undefined;
  PasswordCreateView: undefined;
  LoginView: undefined;
  SplashView: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  NavigationBar.setBackgroundColorAsync(theme.backgroundColor);
  StatusBar.setBarStyle(theme.isDark ? "dark-content" : "light-content", true);
  return (
    <KeyContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashView">
          <Stack.Screen
            name="JournalMainView"
            component={JournalMainView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordCreateView"
            component={PasswordCreateView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginView"
            component={LoginView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashView"
            component={SplashView}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyContextProvider>
  );
};

export default App;
