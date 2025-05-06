import React, { useEffect, useState } from "react";
import axios from "axios";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native-web";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../../constants";

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/data");
        const picoData = res.data.filter((item) => item.device_id);
        const latestPerDevice = {};
        for (let i = 0; i < picoData.length; i++) {
          const entry = picoData[i];
          latestPerDevice[entry.device_id] = entry;
        }
        setSensorData(Object.values(latestPerDevice));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const openAssignModal = async (deviceId) => {
    setSelectedDevice(deviceId);
    setModalVisible(true);
    try {
      const res = await axios.get("http://localhost:5001/api/plants");
      setPlants(res.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const assignPlantToDevice = async (plantId) => {
    try {
      await axios.put("http://localhost:5001/api/assign", {
        device_id: selectedDevice,
        plant_id: plantId,
      });

      const assignedPlant = plants.find((p) => p._id === plantId);
      setSensorData((prevData) =>
        prevData.map((entry) =>
          entry.device_id === selectedDevice
            ? { ...entry, assignedPlant }
            : entry
        )
      );

      setModalVisible(false);
    } catch (err) {
      console.error("Error assigning plant:", err);
    }
  };

  return (
    <ImageBackground
      source={images.home}
      style={[styles.background, { backgroundColor: "#000" }]}
      resizeMode="cover"
      blurRadius={7}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}> Grow It! - Dashboard</Text>
          <Text style={styles.search} onPress={() => router.push("/search")}>
            <FontAwesome name="search" size={35} color="#000" />
          </Text>
          <Text style={styles.setup} onPress={() => router.push("/setup")}>
            <FontAwesome name="plus" size={35} color="#000" />
          </Text>
          <Text style={styles.settings} onPress={() => router.push("/settings")}>
            <FontAwesome name="cog" size={35} color="#000" />
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            {sensorData.length === 0 ? (
              <Text>No sensor data available.</Text>
            ) : (
              sensorData.map((entry, i) => (
                <View key={i} style={styles.sensorCard}>
                  <View style={styles.deviceHeader}>
                    <Text style={styles.deviceId}> Device ID: {entry.device_id}</Text>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.sensorData}>
                    <View>
                      <View style={styles.tempcontainer}>
                        <Text style={styles.temp}>Temperature: {entry.temp_f}°F</Text>
                      </View>
                      <View style={styles.humiditycontainer}>
                        <Text style={styles.humidity}>Humidity: {entry.humidity}%</Text>
                      </View>
                    </View>

                    <View style={styles.lightcontainer}>
                      <Text style={styles.light}>{entry.light_condition}</Text>
                    </View>

                    <View style={styles.soilcontainer}>
                      <Text style={styles.soil}>Soil: {entry.soil_condition}</Text>
                    </View>

                    <View style={styles.plantContainer}>
                      {entry.assignedPlant?.image_url ? (
                        <Image
                          source={{ uri: entry.assignedPlant.image_url }}
                          style={styles.plantImage}
                        />
                      ) : (
                        <View style={styles.plantPlaceholder}>
                          <Text style={styles.light}>No Image</Text>
                        </View>
                      )}
                      <Text style={styles.plantName}>
                        {entry.assignedPlant?.plantname || "No Plant Assigned"}
                      </Text>
                      <Text
                        style={styles.editButton}
                        onPress={() => openAssignModal(entry.device_id)}
                      >
                        ✏️ Edit
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.timestamp}> Last updated: {entry.timestamp}</Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Assign a Plant</Text>
              <ScrollView style={{ maxHeight: 300 }}>
                {plants.length > 0 ? (
                  plants.map((plant) => (
                    <Text
                      key={plant._id}
                      style={styles.modalItem}
                      onPress={() => assignPlantToDevice(plant._id)}
                    >
                      {plant.plantname}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.modalItem}>No plants found</Text>
                )}
              </ScrollView>
              <Text
                style={styles.modalCancel}
                onPress={() => setModalVisible(false)}
              >
                Cancel
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  title: {
    flex: 1,
    fontSize: 45,
    fontFamily: "BungeeShade-Regular",
    fontWeight: "bold",
    color: "#000",
    paddingTop: "1%",
    paddingHorizontal: "1%",
  },
  search: { paddingHorizontal: "1%" },
  setup: { paddingHorizontal: "1%" },
  settings: { paddingHorizontal: "1%" },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: "1%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: { width: "95%" },
  sensorCard: {
    marginBottom: "5%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deviceHeader: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deviceId: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
  divider: {
    marginTop: 8,
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },
  sensorData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "%1",
  },
  tempcontainer: {
    borderRadius: 20,
    height: 100,
    width: "125%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(254, 253, 252, 0.85)",
  },
  temp: {
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    color: "#000",
    paddingHorizontal: "5%",
  },
  humiditycontainer: {
    borderRadius: 20,
    height: 100,
    marginTop: "20%",
    width: "125%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(254, 253, 252, 0.85)",
  },
  humidity: {
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    color: "#000",
    paddingHorizontal: "5%",
  },
  lightcontainer: {
    borderRadius: 20,
    height: 230,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(254, 253, 252, 0.85)",
  },
  light: {
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    color: "#000",
    paddingHorizontal: "5%",
  },
  soilcontainer: {
    borderRadius: 20,
    height: 230,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(254, 253, 252, 0.85)",
  },
  soil: {
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    color: "#000",
    paddingHorizontal: "5%",
  },
  plantContainer: {
    borderRadius: 20,
    height: 230,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(254, 253, 252, 0.85)",
    padding: 10,
  },
  plantImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 8,
  },
  plantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  editButton: {
    marginTop: 8,
    fontSize: 16,
    color: "#007AFF",
    textAlign: "center",
    fontWeight: "600",
  },
  plantPlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: "#ddd",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#444",
    marginTop: 10,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    textAlign: "center",
  },
  modalCancel: {
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
    color: "red",
  },
});

export default App;
