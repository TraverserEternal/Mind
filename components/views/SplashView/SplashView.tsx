import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC, useEffect } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useKeyContext } from "../../../hooks/KeyContext";
import { checkPassword, passwordExists } from "../../../utils/encryptionUtils";
import { theme } from "../../../utils/themes";

const SplashView: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [key, _] = useKeyContext();
  useEffect(() => {
    sendToCorrectScreen();
  }, []);
  const sendToCorrectScreen = async () => {
    const passwordDoesExist = await passwordExists();
    if (!passwordDoesExist) navigation.navigate("PasswordCreateView");
    else if (key === "" || key === null) navigation.navigate("LoginView");
    else if (!(await checkPassword(key))) navigation.navigate("LoginView");
    else navigation.navigate("JournalMainView");
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
