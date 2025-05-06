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
import { images } from "../../constants";

const CARD_WIDTH = Dimensions.get("window").width / 4 - 16;

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
                numColumns={4}
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
            <View style={styles.modalBackdrop}>
              <TouchableOpacity
                style={styles.modalCloseArea}
                onPress={() => setSelectedPlant(null)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>

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
            </View>
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
    paddingHorizontal: 8,
  },
  plantCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 6,
    marginVertical: 6,
    width: CARD_WIDTH,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  plantImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 4,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  cardText: {
    fontSize: 20,
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
    padding: 20,
  },
  modalBackdrop: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    width: CARD_WIDTH + 40,
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalContent: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalImage: {
    width: CARD_WIDTH,
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
  },
  modalCloseArea: {
    position: "absolute",
    top: 8,
    right: 12,
    zIndex: 10,
  },
  modalCloseText: {
    fontSize: 24,
    color: "#888",
  },
});

export default Search;
