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
import { navBar, searchStyle } from "../../components/styles";
import { images } from "../../constants";

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
      style={searchStyle.plantCard}
      onPress={() => setSelectedPlant(item)}
    >
      {item.image_url ? (
        <Image source={{ uri: item.image_url.trim() }} style={searchStyle.plantImage} />
      ) : null}
      <Text style={searchStyle.cardTitle}>{item.plantname}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={images.home}
      style={[searchStyle.background, { backgroundColor: "#000" }]}
      resizeMode="cover"
      blurRadius={7}
    >
      <SafeAreaView style={searchStyle.safeArea}>
        <View style={navBar.header}>
          <Text style={navBar.title}>Grow It! - Search</Text>
          <Text style={navBar.home} onPress={() => router.push("/home")}>
            <FontAwesome name="home" size={45} color="#000" />
          </Text>
          <Text style={navBar.setup} onPress={() => router.push("/setup")}>
            <FontAwesome name="plus" size={45} color="#000" />
          </Text>
          <Text style={navBar.settings} onPress={() => router.push("/settings")}>
            <FontAwesome name="cog" size={45} color="#000" />
          </Text>
        </View>

        <ScrollView contentContainerStyle={searchStyle.scrollContainer}>
          <View style={searchStyle.container}>
            <TextInput
              style={searchStyle.searchInput}
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
                numColumns={4}
                contentContainerStyle={searchStyle.cardGrid}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                ListEmptyComponent={
                  <Text style={searchStyle.emptyText}>No plants found.</Text>
                }
              />
            )}
          </View>
        </ScrollView>

        {selectedPlant && (
          <View style={searchStyle.modalOverlay}>
            <View style={searchStyle.modalBackdrop}>
              <TouchableOpacity
                style={searchStyle.modalCloseArea}
                onPress={() => setSelectedPlant(null)}
              >
                <Text style={searchStyle.modalCloseText}>✕</Text>
              </TouchableOpacity>

              <View style={searchStyle.modalContent}>
                <Text style={searchStyle.modalTitle}>{selectedPlant.plantname}</Text>
                {selectedPlant.image_url && (
                  <Image
                    source={{ uri: selectedPlant.image_url.trim() }}
                    style={searchStyle.modalImage}
                  />
                )}
                <Text style={searchStyle.cardText}>
                  Genus: {selectedPlant.plantgenus}
                </Text>
                <Text style={searchStyle.cardText}>
                  🌡 Temp: {selectedPlant.temperaturerange.join(" - ")}
                </Text>
                <Text style={searchStyle.cardText}>
                  💧 Humidity: {selectedPlant.humidityrange.join(" - ")}
                </Text>
                <Text style={searchStyle.cardText}>
                  🔆 Light: {selectedPlant.lightrange.join(" - ")}
                </Text>
                <Text style={searchStyle.cardText}>
                  🧪 pH: {selectedPlant.phrange.join(" - ")}
                </Text>
                <Text style={searchStyle.cardText}>
                  🌱 Moisture: {selectedPlant.moisturerange}
                </Text>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Search;
