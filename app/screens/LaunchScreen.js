import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Card from "../components/card";

const baseURL = "https://api.spacexdata.com/v4/launches/";

const LaunchScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [launch, setLaunch] = useState([]);

  const { id } = route.params;
  let launchURL = baseURL.concat(id);
  // console.log(launchURL);

  const fetchData = async () => {
    const resp = await fetch(launchURL);
    const data = await resp.json();
    setLaunch(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Launch Details</Text>

      {isLoading && <ActivityIndicator />}

      {launch && (
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
            // let boolVar = launch.cores[0].reused;
            let details = launch.details;
            if (details) {
              const result = details.includes("reused");

              if (result) {
                return <Text>Reused : Yes</Text>;
              } else {
                return <Text>Reused: No</Text>;
              }
            } else {
              return <Text>Reused: No</Text>;
            }

            return null;
          })()}
        </Card>
      )}
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
