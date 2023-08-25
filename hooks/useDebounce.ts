import { useState } from "react";
const useDebounce = <T extends any[]>(
  callback: (...args: T) => any,
  delay: number
): ((...args: T) => void) => {
  const [timeoutID, setTimeoutID] = useState<null | NodeJS.Timeout>(null);
  return (...args: T) => {
    if (timeoutID !== null) clearTimeout(timeoutID);
    setTimeoutID(
      setTimeout(() => {
        setTimeoutID(null);
        callback(...args);
      }, delay)
    );
  };
};

export default useDebounce;
