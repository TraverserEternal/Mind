import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useJournalContext } from "../../../hooks/useJournalData";
import { useThemes } from "../../../utils/useThemes";

const DataGatherView: FC = () => {
  const { theme } = useThemes();
  const { dataIsLoaded } = useJournalContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    if (dataIsLoaded) navigation.navigate("JournalMainView");
  }, [dataIsLoaded]);
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
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default DataGatherView;
