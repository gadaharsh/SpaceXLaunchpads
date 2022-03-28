import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LaunchpadScreen from "./app/screens/LaunchpadScreen";
import LaunchScreen from "./app/screens/LaunchScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Launchpad">
          <Stack.Screen options={{headerShown: false}} name="Launchpad" component={LaunchpadScreen} />
          <Stack.Screen options={{headerShown: false}} name="Launch" component={LaunchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
       /* <LaunchpadScreen/>
      <LaunchScreen/>
    <StatusBar style="auto" /> */
    // </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
