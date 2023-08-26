import { PropsWithChildren, createContext, useContext, useState } from "react";

// Create a context for the key
const KeyContext = createContext<[string, (newKey: string) => void] | null>(
  null
);

// Custom hook to use the key context
const useKeyContext = () => {
  const context = useContext(KeyContext);
  if (context === null) {
    throw new Error("useKeyContext must be used within a KeyContextProvider");
  }
  if (context[0] === null) {
    throw new Error("useKeyContext must be used within a KeyContextProvider");
  }
  return context;
};

// Context provider component
const KeyContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const value = useState("");

  return <KeyContext.Provider value={value}>{children}</KeyContext.Provider>;
};

export { KeyContextProvider, useKeyContext };
