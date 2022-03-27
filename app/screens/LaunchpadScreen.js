import React, { useState, useEffect } from "react";
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

import Card from "../components/card";

const launchpadURL = "https://api.spacexdata.com/v4/launchpads";

const LaunchpadScreen = () => {
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

  //   const renderItem = ({ launchpad }) => {
  //     return (
  //       <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
  //         {item.name}
  //       </Box>
  //     );
  //   };

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {/* <Text>LaunchpadScreen</Text> */}

      {launchpads && (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={launchpads}
          renderItem={({ item }) => (
            <Card>
              <View>
                <Text px={5} py={2} rounded="md" bg="primary.300" my={2}>
                  {item.name}
                </Text>
                <Image
                  source={{ uri: item.images.large[0] }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            </Card>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
});

export default LaunchpadScreen;
