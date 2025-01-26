import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";

type Props = {
  currentColor: string;
};

const ColorClipboard = ({ currentColor }: Props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async (copiedString: string) => {
    await Clipboard.setStringAsync(copiedString);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <View style={styles.colorValueRow}>
      <Text style={styles.currentColorText}>{currentColor}</Text>
      <Pressable
        style={styles.copyButton}
        onPress={() => handleCopy(currentColor)}
      >
        <Text>{isCopied ? "Copied!" : "Copy"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  colorValueRow: {
    flexDirection: "row",
    width: 230,
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  copyButton: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "gray",
  },
  currentColorText: {
    fontSize: 20,
    textTransform: "uppercase",
  },
});

export default ColorClipboard;
