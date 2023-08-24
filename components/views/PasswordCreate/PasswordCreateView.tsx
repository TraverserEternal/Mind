import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  GestureResponderEvent,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackParamList } from "../../../App";
import { useKeyContext } from "../../../hooks/KeyContext";
import * as enc from "../../../utils/encryptionUtils";
import { theme } from "../../../utils/themes";
import Button from "../../common/Button/Button";

const PasswordCreateView: React.FC = () => {
  const [_, setKey] = useKeyContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [submitting, setSubmitting] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePassword21Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  const renderPasswordIcon = (
    isVisible: boolean,
    onPress: (event: GestureResponderEvent) => void
  ) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon
          name={isVisible ? "eye" : "eye-slash"}
          size={20}
          color={theme.secondaryTextColor}
        />
      </TouchableOpacity>
    );
  };

  const handlePasswordChange = (text: string) => {
    setPassword1(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setPassword2(text);
  };

  const submitIsDisabled = () => {
    if (password1 !== password2) return true;
    if (submitting) return true;
  };

  const submitPassword = async () => {
    setSubmitting(true);
    await enc.setPassword(password1);
    if (setKey === null) return;
    setKey(password1);
    setSubmitting(false);
    navigation.navigate("JournalMainView");
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <Text style={styles.title}>Create Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={theme.secondaryTextColor}
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={!showPassword1}
          value={password1}
          onChangeText={handlePasswordChange}
        />
        {renderPasswordIcon(showPassword1, togglePassword1Visibility)}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={theme.secondaryTextColor}
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!showPassword2}
          value={password2}
          onChangeText={handleConfirmPasswordChange}
        />
        {renderPasswordIcon(showPassword2, togglePassword21Visibility)}
      </View>
      <Button
        style={styles.submitButton}
        onPress={submitPassword}
        disabled={submitIsDisabled()}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: theme.textColor,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    marginTop: 20,
  },
  submitButtonText: {
    color: theme.buttonTextColor,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PasswordCreateView;
