import moment from "moment";
import { FC, useEffect, useRef, useState } from "react";
import { Animated, TextProps } from "react-native";
import { useJournalContext } from "../../../../hooks/useJournalData";

const LastUpdatedText: FC<TextProps> = ({ style, ...props }) => {
  const [text, setText] = useState("");
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
  useEffect(() => {
    const timeoutID = updateTextRegularly(true);
    return () => {
      if (timeoutID !== null) clearTimeout(timeoutID);
    };
  }, [lastUpdated]);
  const updateTextRegularly = (
    shouldSaySaved: boolean = false
  ): NodeJS.Timeout => {
    setText(shouldSaySaved ? "Saved!" : getLastUpdatedTextData());
    return setTimeout(
      () => updateTextRegularly(),
      shouldSaySaved ? 2000 : 30000
    );
  };
  const getLastUpdatedTextData = (): string => {
    if (!lastUpdated) return "Last Saved: Never";
    if (new Date().toDateString() === lastUpdated.toDateString()) {
      return `Last Saved: ${moment(lastUpdated).fromNow()}`;
    }
    return `Last Saved: ${lastUpdated.toDateString()} at ${lastUpdated.toLocaleTimeString()}`;
  };
  return (
    <Animated.Text style={[style, { opacity: fadeAnim }]} {...props}>
      {text}
    </Animated.Text>
  );
};

export default LastUpdatedText;
