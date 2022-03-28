import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Card from "../components/card";

const launchpadURL = "https://api.spacexdata.com/v4/launchpads";
const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

const LaunchpadScreen = ({ navigation }) => {
  //  Managing States
  const [isLoading, setLoading] = useState(true);
  const [launchpads, setLaunchpads] = useState([]);

  const fetchData = async () => {
    const resp = await fetch(launchpadURL);
    const data = await resp.json();
    setLaunchpads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // onPress={() => navigation.navigate('Launch')}
  let length, count;

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
      <Text style={styles.title}>
        <B>Welcome to SpaceX API Launchpad</B>
      </Text>
      {/* <Text>LaunchpadScreen</Text> */}

      {launchpads && (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={launchpads}
            renderItem={({ item }) => (
              <Card>
                <View>
                  <Text
                    px={5}
                    py={2}
                    rounded="md"
                    bg="primary.300"
                    my={2}
                    style={styles.launchpadName}
                  >
                    <B>{item.name}</B>
                  </Text>
                  <Image
                    source={{ uri: item.images.large[0] }}
                    style={styles.launchImg}
                  />
                </View>
                <Text px={5} py={2} rounded="md" bg="primary.300" my={2}>
                  <B>Details:</B> {item.details}
                </Text>
                <Text px={5} py={2} rounded="md" bg="primary.300" my={2}>
                  <B>Status: </B>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
                <View>
                  <Text>
                    <B>Launches:</B>
                  </Text>
                  {/* Immediately Invoked Function Expression (IIFE) */}
                  {(() => {
                    length = item.launches.length;
                    if (length == 0) {
                      return <Text>No Launch Available</Text>;
                      // if (length < 3) {
                      //   count = length;
                      // } else {
                      //   count = 3;
                      // }
                      // for (let i = 0; i < count; i++) {
                      //   <Text>{item.launches[i]}</Text>;
                      // }
                    } else if (length == 1) {
                      return (
                        <>
                          <Text>1. {item.launches[0]}</Text>
                        </>
                      );
                    } else if (length == 2) {
                      return (
                        <>
                          <Text>1. {item.launches[0]}</Text>
                          <Text>2. {item.launches[1]}</Text>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Text
                            onPress={() => {
                              navigation.navigate("Launch", {
                                id: item.launches[0],
                              });
                            }}
                          >
                            1. {item.launches[0]}
                          </Text>
                          <Text
                            onPress={() => {
                              navigation.navigate("Launch", {
                                id: item.launches[0],
                              });
                            }}
                          >
                            2. {item.launches[1]}
                          </Text>
                          <Text
                            onPress={() => {
                              navigation.navigate("Launch", {
                                id: item.launches[2],
                              });
                            }}
                          >
                            3. {item.launches[2]}
                          </Text>
                        </>
                      );
                    }

                    return null;
                  })()}
                </View>
              </Card>
            )}
            keyExtractor={(item) => item.id}
          />
          <StatusBar style="auto" />
        </>
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

    backgroundColor: "#16213E",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    paddingBottom: 10,
    color: "white",
  },
  card: {
    backgroundColor: "black",
    color: "white",
  },
  launchpadName: {
    textAlign: "center",
    fontSize: 16,
  },
  launchImg: {
    alignSelf: "center",
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default LaunchpadScreen;
