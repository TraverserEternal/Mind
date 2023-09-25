import { NavigationProp, useNavigation } from "@react-navigation/native";
import { getItemAsync } from "expo-secure-store";
import { FC, useEffect } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useKeyContext } from "../../../hooks/KeyContext";
import { checkPassword, passwordExists } from "../../../utils/encryptionUtils";
import { useThemes } from "../../../utils/useThemes";

const SplashView: FC = () => {
  const { theme } = useThemes();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [key, _] = useKeyContext();
  useEffect(() => {
    sendToCorrectScreen();
  }, []);
  const sendToCorrectScreen = async () => {
    const passwordDoesExist = await passwordExists();
    if (!passwordDoesExist) {
      const hasSeenIntro = (await getItemAsync("seenIntro")) != null;
      navigation.navigate(hasSeenIntro ? "PasswordCreateView" : "IntroView");
    } else if (key === "" || key === null || !(await checkPassword(key))) {
      navigation.navigate("LoginView");
    } else navigation.navigate("JournalMainView");
  };
  return (
    <View
      style={{
        backgroundColor: theme.backgroundColor,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
    ></View>
  );
};

export default SplashView;
