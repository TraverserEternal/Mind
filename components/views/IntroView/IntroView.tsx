import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { RootStackParamList } from "../../../App";
import { Theme, useThemes } from "../../../utils/useThemes";
import Button from "../../common/Button/Button";

const IntroView: FC = () => {
  const { theme } = useThemes();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const goToPasswordCreate = () => navigation.navigate("PasswordCreateView");

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <PagerView style={styles.pagerView}>
        <View style={styles.view} key="1">
          <Text style={styles.text}>
            Welcome to Mind, a perfectly secure journal
          </Text>
        </View>
        <View style={styles.view} key="2">
          <Text style={styles.text}>
            Store whatever you like, and be certain that your data is safe.
            Using AES256, no one but you will be able to access your journal.
          </Text>
          <Button
            style={styles.button}
            onPress={goToPasswordCreate}
            label="Start Now"
          ></Button>
        </View>
      </PagerView>
    </View>
  );
};

export default IntroView;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      marginTop: 20,
    },
    text: {
      color: theme.textColor,
      fontSize: 20,
      textAlign: "center",
    },
    pagerView: { flex: 1 },
    view: {
      textAlign: "center",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
  });
