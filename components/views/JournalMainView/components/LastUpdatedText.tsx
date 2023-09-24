import moment from "moment";
import { FC, useEffect, useRef } from "react";
import { Animated, TextProps } from "react-native";
import { useJournalContext } from "../../../../hooks/useJournalData";

const LastUpdatedText: FC<TextProps> = ({ style, ...props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { lastUpdated } = useJournalContext();
  useEffect(() => {
    Animated.sequence([
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);
  return (
    <Animated.Text style={[style, { opacity: fadeAnim }]} {...props}>
      {lastUpdated == null
        ? "Last Saved: Never"
        : `Saved on ${lastUpdated.toDateString()} at ${lastUpdated.toLocaleTimeString()}\n(${moment(
            lastUpdated
          ).fromNow()})`}
    </Animated.Text>
  );
};

export default LastUpdatedText;
