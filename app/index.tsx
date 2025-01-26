import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>Hello there</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 32
    }
})