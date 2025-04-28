import React from "react";
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
/*

export default function Tab() {
    return (
      <View style={styles.container}>
        <Text>Tab [Home|Setup|Search|Settings]</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
 

  import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample plant database, waiting to connect to plant db we are using
const PLANT_DATABASE = [
  { id: "1", name: "Monstera" },
  { id: "2", name: "Snake Plant" },
  { id: "3", name: "Fiddle Leaf Fig" },
  { id: "4", name: "Pothos" },
  { id: "5", name: "Spider Plant" },
  { id: "6", name: "Aloe Vera" },
  { id: "7", name: "Peace Lily" },
  { id: "8", name: "Cactus" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState(PLANT_DATABASE);

//search bar
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setFilteredPlants(PLANT_DATABASE);
    } else {
      setFilteredPlants(
        PLANT_DATABASE.filter((plant) =>
          plant.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  // Function to add a plant
  const addPlant = (plant) => {
    if (!selectedPlants.find((p) => p.id === plant.id)) {
      setSelectedPlants([...selectedPlants, plant]);
    }
  };

  // Function to remove a plant
  const removePlant = (plantId) => {
    setSelectedPlants(selectedPlants.filter((p) => p.id !== plantId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search for a Plant</Text>

      {/* Search Bar */
      /*
      <TextInput
        style={styles.searchInput}
        placeholder="Type plant name..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Plant List */
      /*<FlatList

        data={filteredPlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.plantItem}
            onPress={() => addPlant(item)}
          >
            <Text style={styles.plantText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Selected Plants *//*}

      <Text style={styles.title}>Your Selected Plants</Text>
      <FlatList
        data={selectedPlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.selectedPlantItem}>
            <Text style={styles.plantText}>{item.name}</Text>
            <TouchableOpacity onPress={() => removePlant(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  plantItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#E0F2E9",
    borderRadius: 10,
  },
  plantText: {
    fontSize: 16,
  },
  selectedPlantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#CDEAC0",
    borderRadius: 10,
    marginBottom: 10,
  },
  removeText: {
    color: "red",
    fontWeight: "bold",
  },
});

*/