import React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";
import { images } from "../../constants";
import { CustomButton } from "../../components";
import axios from 'axios';
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
};

function App() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/data');
        // Only keep documents that came from Pico devices
        const picoData = res.data.filter(item => item.device_id);
        setSensorData(picoData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>🌱 Grow It! </Text>
          <Text style={styles.subtitle}>Sensor Dashboard</Text>
          {sensorData.length === 0 ? (
            <Text>No sensor data available.</Text>
          ) : (
            sensorData.map((entry, i) => (
              <View key={i} style={styles.sensorCard}>
                <Text><Text style={styles.bold}>Device ID:</Text> {entry.device_id}</Text>
                <Text><Text style={styles.bold}>Temperature:</Text> {entry.temp_c}°C / {entry.temp_f}°F</Text>
                <Text><Text style={styles.bold}>Humidity:</Text> {entry.humidity}%</Text>
                <Text><Text style={styles.bold}>Light:</Text> {entry.light_condition} ({entry.light_voltage?.toFixed(2)}V)</Text>
                <Text><Text style={styles.bold}>Soil:</Text> {entry.soil_condition} ({entry.soil_voltage?.toFixed(2)}V)</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 20,
    backgroundColor: "#fefdfc",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 40,
    fontFamily: 'BungeeShade-Regular',
    color: '#3D4325',
    textAlign: 'center',
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    paddingBottom: 20,
  },
  sensorCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#cad6a3',
    borderWidth: 2,
    padding: 15,
    marginVertical: 15,
    borderRadius: 10,
    width: '65%',
    fontFamily: 'Roboto-Regular',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default App;