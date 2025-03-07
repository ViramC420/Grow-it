import React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { CustomButton } from "../../components";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleButtonPress = () => {
    console.log("Button pressed!");
  };

  useEffect(() => {
    fetch("https://growitweb.com/api/plants")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching plant data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading plant data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Plant Data</Text>
      <FlatList
        data={plants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.plantItem}>
            <Text style={styles.plantName}>{item.plantname}</Text>
            <Text>Genus: {item.plantgenus}</Text>
            <Text>PH Range: {item.phrange.join(" - ")}</Text>
            <Text>Light Range: {item.lightrange.join(" - ")}</Text>
            <Text>Moisture Range: {item.moisturerange.join(" - ")}</Text>
            <Text>Humidity Range: {item.humidityrange.join(" - ")}</Text>
            <Text>Temperature Range: {item.temperaturerange.join(" - ")}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );

  /*
  return (
    <View>
      <View>
        <View>
          <Text style={styles.textContainer}>Welcome!</Text>
        </View>
      </View>
    </View>
  ); 
  */
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  textContainer: {
    marginTop: 100,
    fontFamily: "Roboto-Medium",
    fontSize: 55,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3d4325",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  plantItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Home;
