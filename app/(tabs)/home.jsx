import React from "react";
import axios from 'axios';
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { CustomButton, Loader } from "../../components";
import { ImageBackground } from "react-native-web";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet, ScrollView, ActivityIndicator, } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
//import { useGlobalContext } from "../context/GlobalProvider";

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
    <ImageBackground
          source = {images.home}
          style={[styles.background, { backgroundColor: '#000' }]}
          resizeMode="cover"
          blurRadius={7}
    >

      <SafeAreaView style = {styles.safeArea}>
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
                  <View key={i} style={styles.sensorData}>
                    <View>
                      <View style = {styles.tempcontainer}>
                        <Text style={styles.temp}>Temperature: {entry.temp_f}°F</Text>
                      </View>
                      <View style = {styles.humiditycontainer}>
                        <Text style={styles.humidity}>Humidity: {entry.humidity}%</Text>
                      </View>
                    </View>

                    <View style = {styles.lightcontainer}>
                      <Text style={styles.light}> {entry.light_condition} </Text>
                    </View>
                  
                    <View style = {styles.soilcontainer}>  
                      <Text style={styles.soil}>Soil: {entry.soil_condition}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

//<Text><Text style={styles.bold}>Device ID:</Text> {entry.device_id}</Text>
//({entry.light_voltage?.toFixed(2)}V)
//({entry.soil_voltage?.toFixed(2)}V)

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10
  },
  title: {
    flex: 1,
    fontSize: 45,
    fontFamily: 'BungeeShade-Regular',
    fontWeight: 'bold',
    color: '#000',
    paddingTop: '1%',
    paddingHorizontal: '1%',
  },
  search: {
    paddingHorizontal: '1%',
  },
  setup: {
    paddingHorizontal: '1%',
  },
  settings: {
    paddingHorizontal: '1%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: '1%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: '95%',
  },
  sensorData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '%1',
    marginTop: '2%',
    marginBottom: '5%',
  },
  tempcontainer: {
    borderRadius: 20,
    height: 100,
    width: '125%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(254, 253, 252, 0.85)',
  },
  temp: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: '#000',
    paddingHorizontal: '5%',
  },
  humiditycontainer: { 
    borderRadius: 20,
    height: 100,
    marginTop: '20%',
    width: '125%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(254, 253, 252, 0.85)',},
  humidity: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: '#000',
    paddingHorizontal: '5%',
  },
  lightcontainer: { 
    borderRadius: 20,
    height: 230,
    width: '30%',
    marginLeft: '0%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(254, 253, 252, 0.85)',
  },
  light: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: '#000',
    paddingHorizontal: '5%',
  },
  soilcontainer: {
    borderRadius: 20,
    height: 230,
    width: '30%',
    marginLeft: '0%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(254, 253, 252, 0.85)',
  },
  soil: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: '#000',
    paddingHorizontal: '5%',
  },
});

export default App;