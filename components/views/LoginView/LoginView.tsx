import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackParamList } from "../../../App";
import { useKeyContext } from "../../../hooks/KeyContext";
import { checkPassword, resetAccount } from "../../../utils/encryptionUtils";
import { Theme, useThemes } from "../../../utils/useThemes";
import Button from "../../common/Button/Button";

import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";

const LoginView: React.FC = () => {
  const { theme } = useThemes();
  const [key, setKey] = useKeyContext();
  useEffect(() => {
    navigateIfKeyCorrect();
  }, [key]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigateIfKeyCorrect = async () => {
    if (key !== null && (await checkPassword(key))) {
      navigation.navigate("DataGatherView");
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = () => {
    return (
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Icon
          name={passwordVisible ? "eye" : "eye-slash"}
          size={20}
          color={theme.secondaryTextColor}
        />
      </TouchableOpacity>
    );
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    setSubmitting(true);
    setKey(password);
  };

  const styles = createStyles(theme);

  NavigationBar.setBackgroundColorAsync(theme.backgroundColor);
  StatusBar.setBarStyle(theme.isDark ? "dark-content" : "light-content", true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={theme.secondaryTextColor}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={handlePasswordChange}
        />
        {renderPasswordIcon()}
      </View>
      <Button
        style={styles.submitButton}
        onPress={handleLogin}
        disabled={submitting}
        label="Login"
      ></Button>
      <Button
        style={styles.submitButton}
        onPress={async () => {
          await resetAccount();
          navigation.navigate("SplashView");
        }}
        label="Reset Account"
      ></Button>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: theme.backgroundColor,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.textColor,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    input: {
      color: theme.textColor,
      flex: 1,
      borderBottomWidth: 1,
      borderColor: theme.secondaryTextColor,
      marginRight: 10,
    },
    submitButton: {
      marginTop: 30,
    },
    submitButtonText: {
      color: theme.buttonTextColor,
      fontWeight: "bold",
      fontSize: 16,
    },
  });

export default LoginView;
