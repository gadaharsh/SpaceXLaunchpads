import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LaunchpadScreen from './app/screens/LaunchpadScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to SpaceX API Launchpad</Text>
      <LaunchpadScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
