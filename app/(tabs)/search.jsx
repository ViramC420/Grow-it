/*import React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-web";
import { ImageBackground } from "react-native-web";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";

const Search = () => {
  const [query, setQuery] = useState('');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH ALL AND FILTER 
  const fetchPlants = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://growitweb.com/api/plants');
      const data = await response.json();
      // IF EMPTY, SHOW ALL; OTHERWISE FILTER BY PLANT
      if (query.trim() === '') {
        setPlants(data);
      } else {
        const filtered = data.filter(plant =>
          plant.plantname.toLowerCase().includes(query.toLowerCase())
        );
        setPlants(filtered);
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  };

  // FETCH PLANTS ON INITIAL LOAD AND ON QUERY
  useEffect(() => {
    fetchPlants();
  }, [query]);

  const renderItem = ({ item }) => (
    <View style={styles.plantItem}>
      <Text style={styles.plantName}>{item.plantname}</Text>
      <Text>Genus: {item.plantgenus}</Text>
      <Text>PH Range: {item.phrange.join(' - ')}</Text>
      <Text>Light Range: {item.lightrange.join(' - ')}</Text>
      <Text>Moisture Range: {item.moisturerange.join(' - ')}</Text>
      <Text>Humidity Range: {item.humidityrange.join(' - ')}</Text>
      <Text>Temperature Range: {item.temperaturerange.join(' - ')}</Text>
    </View>
  );

  return (
    <ImageBackground
      source = {images.home}
      style={[styles.background, { backgroundColor: '#000' }]}
      resizeMode="cover"
      blurRadius={7}
    >
      
      <SafeAreaView style = {styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}> Grow It! - Search</Text>
          <Text style={styles.home} onPress={() => router.push("/home")}>
            <FontAwesome name="home" size={35} color="#000" />
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
            <TextInput
              style={styles.searchInput}
              placeholder="Search for plants..."
              value={query}
              onChangeText={setQuery}
            />
        
            {loading ? (
              <ActivityIndicator size="large" color="#3d4325" />
            ) : (
              <View style={styles.outputContainer}>
                <FlatList
                data={plants}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.emptyText}>No plants found.</Text>}
                />
              </View>
           )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
  home: {
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
    flex: 1,
    width: '95%',
    //backgroundColor: 'rgba(254, 253, 252, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  searchInput: {
    borderRadius: 20,
    borderWidth: 2,
    minHeight: 45,
    marginTop: '1%',
    paddingHorizontal: 20,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#093001",
    backgroundColor: "#fff",   
    fontFamily: 'Roboto-Regular',
    color: '#072404',
  },
  outputContainer: {
    flex: 1,
    width: '85%',
    marginTop: '2%',
    backgroundColor: 'rgba(254, 253, 252, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  plantItem:  {
    minHeight: 45,
    marginTop: '5%',  
    fontFamily: 'Roboto-Regular',
    color: '#072404',
  },
  emptyText: {
    marginTop: '5%',
  },
});

export default Search;
*/

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-web";
import { ImageBackground } from "react-native-web";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { images } from "../../constants"; // Update path if needed

const CARD_WIDTH = Dimensions.get("window").width * 0.42; // Responsive small card

const Search = () => {
  const [query, setQuery] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://growitweb.com/api/plants");
        const data = await response.json();
        if (query.trim() === "") {
          setPlants(data);
        } else {
          const filtered = data.filter((plant) =>
            plant.plantname.toLowerCase().includes(query.toLowerCase())
          );
          setPlants(filtered);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [query]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.plantCard}
      onPress={() => setSelectedPlant(item)}
    >
      {item.image_url ? (
        <Image source={{ uri: item.image_url.trim() }} style={styles.plantImage} />
      ) : null}
      <Text style={styles.cardTitle}>{item.plantname}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={images.home}
      style={[styles.background, { backgroundColor: "#000" }]}
      resizeMode="cover"
      blurRadius={7}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Grow It! - Search</Text>
          <Text style={styles.home} onPress={() => router.push("/home")}>
            <FontAwesome name="home" size={35} color="#000" />
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
            <TextInput
              style={styles.searchInput}
              placeholder="Search for plants..."
              value={query}
              onChangeText={setQuery}
            />
            {loading ? (
              <ActivityIndicator size="large" color="#3d4325" />
            ) : (
              <FlatList
                data={plants}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.cardGrid}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No plants found.</Text>
                }
              />
            )}
          </View>
        </ScrollView>

        {selectedPlant && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={() => setSelectedPlant(null)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedPlant.plantname}</Text>
                {selectedPlant.image_url && (
                  <Image
                    source={{ uri: selectedPlant.image_url.trim() }}
                    style={styles.modalImage}
                  />
                )}
                <Text style={styles.cardText}>
                  Genus: {selectedPlant.plantgenus}
                </Text>
                <Text style={styles.cardText}>
                  🌡 Temp: {selectedPlant.temperaturerange.join(" - ")}
                </Text>
                <Text style={styles.cardText}>
                  💧 Humidity: {selectedPlant.humidityrange.join(" - ")}
                </Text>
                <Text style={styles.cardText}>
                  🔆 Light: {selectedPlant.lightrange.join(" - ")}
                </Text>
                <Text style={styles.cardText}>
                  🧪 pH: {selectedPlant.phrange.join(" - ")}
                </Text>
                <Text style={styles.cardText}>
                  🌱 Moisture: {selectedPlant.moisturerange}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
  home: {
    paddingHorizontal: "1%",
  },
  setup: {
    paddingHorizontal: "1%",
  },
  settings: {
    paddingHorizontal: "1%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: "1%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  searchInput: {
    borderRadius: 20,
    borderWidth: 2,
    minHeight: 45,
    marginTop: "1%",
    marginBottom: 10,
    paddingHorizontal: 20,
    width: "85%",
    borderColor: "#093001",
    backgroundColor: "#fff",
    fontFamily: "Roboto-Regular",
    color: "#072404",
  },
  cardGrid: {
    paddingBottom: 20,
  },
  plantCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginVertical: 10,
    width: CARD_WIDTH,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  plantImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    marginBottom: 6,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
    textAlign: "center",
  },
  emptyText: {
    marginTop: "5%",
    fontSize: 16,
    color: "#444",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBackdrop: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  modalContent: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: "cover",
  },
});

export default Search;
