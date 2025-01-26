import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AnimationToggle from "@/components/AnimationToggle";
import ColorClipboard from "@/components/ColorClipboard";

const RGB_MAX_VALUE = 256;
const ANIMATION_DURATION = 500;

const initialBgColorArray = [RGB_MAX_VALUE, RGB_MAX_VALUE, RGB_MAX_VALUE];

const toRgbString = (arrayOfColors: number[]): string => {
  return `rgb(${arrayOfColors.join(",")})`;
};

const Index = () => {
  const currentColorAnimated = useSharedValue<string>(
    toRgbString(initialBgColorArray)
  );

  const [currentColor, setCurrentColor] = useState<string>(
    toRgbString(initialBgColorArray)
  );

  const [colorChangesCounter, setColorChangesCounter] = useState<number>(0);

  const [isAnimated, setIsAnimated] = useState(false);

  const ViewRenderComponent = isAnimated ? Animated.View : View;

  const changeBackgroundColor = () => {
    const rgbColorArray = Array.from({ length: 3 }, () =>
      Math.floor(RGB_MAX_VALUE * Math.random())
    );
    const nextRandomColor = toRgbString(rgbColorArray);
    setColorChangesCounter((prev) => (prev += 1));
    setCurrentColor(nextRandomColor);
    currentColorAnimated.value = withTiming(nextRandomColor, {
      duration: ANIMATION_DURATION,
    });
  };

  const bgColorChangeAnimated = useAnimatedStyle(() => {
    return {
      backgroundColor: currentColorAnimated.value,
    };
  }, []);

  const toggleSwitch = () => setIsAnimated((previousState) => !previousState);

  return (
    <Pressable style={{ flex: 1 }} onPress={changeBackgroundColor}>
      <ViewRenderComponent
        style={[
          styles.container,
          isAnimated
            ? bgColorChangeAnimated
            : { backgroundColor: currentColor },
        ]}
      >
        <View style={styles.headingRow}>
          <Text style={styles.totalChanges}>
            Background Switches: {colorChangesCounter}
          </Text>
          <AnimationToggle isEnabled={isAnimated} onChange={toggleSwitch} />
        </View>
        <ColorClipboard currentColor={currentColor} />
        <Text style={styles.text}>Hello there</Text>
      </ViewRenderComponent>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: 500,
    paddingBottom: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headingRow: {
    position: "absolute",
    top: 16,
    gap: 8,
    width: "100%",
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalChanges: {
    fontSize: 18,
  },
});

export default Index;
