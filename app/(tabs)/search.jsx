{/*import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet } from "react-native";

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
  });*/}
 

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

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Type plant name..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Plant List */}
      <FlatList
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

      {/* Selected Plants */}
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

