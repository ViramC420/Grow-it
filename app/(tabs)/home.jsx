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
  Dimensions
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons";
import { homeStyle, navBar } from "../../components/styles";
import { images } from "../../constants";

function App() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
    //const interval = setInterval(fetchData, 30 * 60 * 1800); // this is 9 hours lol
    const interval = setInterval(fetchData, 10000); //10,000 ms = 10 seconds
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
      style={[homeStyle.background, { backgroundColor: "#000" }]}
      resizeMode="cover"
      blurRadius={7}
    >
      <SafeAreaView style={homeStyle.safeArea}>
        <View style={navBar.header}>
          <Text style={navBar.title}> Grow It! - Dashboard</Text>
          <Text style={navBar.search} onPress={() => router.push("/search")}>
            <FontAwesome name="search" size={45} color="#000" />
          </Text>
          <Text style={navBar.setup} onPress={() => router.push("/setup")}>
            <FontAwesome name="plus" size={45} color="#000" />
          </Text>
          <Text style={navBar.settings} onPress={() => router.push("/settings")}>
            <FontAwesome name="cog" size={45} color="#000" />
          </Text>
        </View>
                    
        <ScrollView contentContainerStyle={homeStyle.scrollContainer}>
          <View style={homeStyle.container}>
            {sensorData.length === 0 ? (
              <Text>No sensor data available.</Text>
            ) : (
              sensorData.map((entry, i) => (
                <View key={i} style={homeStyle.sensorCard}>
                  <View style={homeStyle.deviceHeader}>
                    <Text style={homeStyle.deviceId}> Device ID: {entry.device_id}</Text>
                    <View style={homeStyle.divider} />
                  </View>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', width: '100%' }}>
                    <View style = {homeStyle.tempandhum}>
                      <View style={[homeStyle.tempcontainer, hoveredIndex === `temp-${i}` && homeStyle.temphoverContainer]}
                        onMouseEnter={() => setHoveredIndex(`temp-${i}`)} onMouseLeave={() => setHoveredIndex(null)}>
                        <FontAwesome name="thermometer-half" size={35} />
                        <Text style={homeStyle.temp}>{entry.temp_f}°F</Text>
                      </View>
                        
                      <View style={[homeStyle.humiditycontainer, hoveredIndex === `humidity-${i}` && homeStyle.humhoverContainer]} 
                        onMouseEnter={() => setHoveredIndex(`humidity-${i}`)} onMouseLeave={() => setHoveredIndex(null)}>
                        <FontAwesome name="cloud" size={35} color="#000" />
                        <Text style={homeStyle.humidity}> {entry.humidity}%</Text>
                      </View>
                    </View>    

                    <View style={homeStyle.containrest}>
                      <View style={homeStyle.lightcontainer}>
                        <View style={homeStyle.lightHeader}>
                          <FontAwesome 
                            name={entry.light_condition === "Dark" ? "moon-o" : "sun-o"} 
                            size={35} 
                            color="#000" 
                          />
                          <Text style={homeStyle.light}> {entry.light_condition} </Text>
                        </View>
                      </View>
                  
                      <View style={homeStyle.soilcontainer}>
                        <View style={homeStyle.soilHeader}>
                          <FontAwesome
                            name={
                              entry.soil_condition === "Only Water" ? "tint" :
                              entry.soil_condition === "Wet Soil" ? "tint-slash" :
                              entry.soil_condition === "Moist Soil" ? "cloud" : "leaf"
                            }
                            size={35}
                            color="#000"
                          />
                          <Text style={homeStyle.soil}> {entry.soil_condition}</Text>
                        </View> 
                      </View>

                      <View style={homeStyle.plantContainer}>
                        {entry.assignedPlant?.image_url ? (
                          <Image
                            source={{ uri: entry.assignedPlant.image_url }}
                            style={homeStyle.plantImage}
                          />
                        ) : (
                          <View style={homeStyle.plantPlaceholder}>
                            <Text style={homeStyle.light}>No Image</Text>
                          </View>
                        )}
                    
                        <Text style={homeStyle.plantName}>
                          {entry.assignedPlant?.plantname || "No Plant Assigned"}
                        </Text>
                        <Text
                          style={homeStyle.editButton}
                          onPress={() => openAssignModal(entry.device_id)}
                        >
                          Edit
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text style={homeStyle.timestamp}>
                      Last updated: {entry.timestamp}
                    </Text>
                  </View>
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
          <View style={homeStyle.modalOverlay}>
            <View style={homeStyle.modalContainer}>
              <Text style={homeStyle.modalTitle}>Assign a Plant</Text>
              <ScrollView style={{ maxHeight: 300 }}>
                {plants.length > 0 ? (
                  plants.map((plant) => (
                    <Text
                      key={plant._id}
                      style={homeStyle.modalItem}
                      onPress={() => assignPlantToDevice(plant._id)}
                    >
                      {plant.plantname}
                    </Text>
                  ))
                ) : (
                  <Text style={homeStyle.modalItem}>No plants found</Text>
                )}
              </ScrollView>
              <Text style={homeStyle.modalCancel} onPress={() => setModalVisible(false)}>
                Cancel
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default App;