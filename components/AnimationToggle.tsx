import { Switch, View, StyleSheet, Text } from "react-native";

type Props = {
  isEnabled: boolean;
  onChange: () => void;
};

const AnimationToggle = ({ isEnabled, onChange }: Props) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.configItemText}>Animated</Text>
      <Switch
        onValueChange={onChange}
        value={isEnabled}
        ios_backgroundColor={"#000"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    top: 16,
    right: 16,
    gap: 8,
  },
  configItemText: {
    fontSize: 18,
  },
});

export default AnimationToggle;
