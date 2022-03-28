import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Card from "../components/card";

const baseURL = "https://api.spacexdata.com/v4/launches/";
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

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
      <Text style={styles.title}><B>Launch Details</B></Text>

      {isLoading && <ActivityIndicator />}

      {launch && (
        <Card>
          <Text style = {styles.launchName}><B>{launch.name}</B></Text>
          <Text><B>Details:</B></Text>
          {(() => {
            let details = launch.details;
            if (details) {
              return <Text>{launch.details}</Text>;
            } else {
              return <Text>No Details Available</Text>;
            }
            return null;
          })()}

          <Text><B>Date:</B> {launch.date_local}</Text>

          {(() => {
            // let boolVar = launch.cores[0].reused;
            let details = launch.details;
            if (details) {
              const result = details.includes("reused");

              if (result) {
                return <Text><B>Reused: </B>Yes</Text>;
              } else {
                return <Text><B>Reused: </B>No</Text>;
              }
            } else {
              return <Text><B>Reused: </B>No</Text>;
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
    // marginTop: 10,
    paddingTop: "5%",

    backgroundColor: "#fff",
  },
  launchName :{
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    paddingBottom: 10,
  },

});

export default LaunchScreen;
