import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Card from "../components/card";

const launchURL = "https://api.spacexdata.com/v4/launches/:id";

const LaunchScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [launch, setLaunch] = useState([]);

  const fetchData = async () => {
    const resp = await fetch(
      "https://api.spacexdata.com/v4/launches/5eb87cddffd86e000604b32f"
    );
    const data = await resp.json();
    setLaunch(data);
    setLoading(false);
  };

  const fetchLaunchData = async () => {
    const resp = await fetch(
      "https://api.spacexdata.com/v4/launches/5eb87cddffd86e000604b32f"
    );
    const data = await resp.json();

    // setLoading(false);
    return data.name;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Launch Details</Text>
      <Card>
        <Text>{launch.name}</Text>
        <Text>Details:</Text>
        {(() => {
          let details = launch.details;
          if (details) {
            return <Text>{launch.details}</Text>;
          } else {
            return <Text>No Details Available</Text>;
          }
          return null;
        })()}

        <Text>Date: {launch.date_local}</Text>

        {(() => {
          let details = launch.cores[0].reused;
          if (details) {
            return <Text>Reused : Yes</Text>;
          } else {
            return <Text>Reused: No</Text>;
          }
          return null;
        })()}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
    paddingTop: "5%",

    backgroundColor: "#fff",
  },
});

export default LaunchScreen;
