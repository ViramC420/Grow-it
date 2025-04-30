/**import React from "react";
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
  });*/
  import React from "react";
  import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
  } from "react-native";
  import { images } from "../../constants"; // adjust if needed
  import { FontAwesome } from "@expo/vector-icons";
  import { router, usePathname } from "expo-router";
  
  export default function ConnectPico() {
    const pathname = usePathname();
  
    return (
      <ImageBackground
        source={images.home}
        style={[styles.background, { backgroundColor: "#000" }]}
        resizeMode="cover"
        blurRadius={7}
      >
        <ScrollView contentContainerStyle={styles.container}>
         
          <View style={styles.topIcons}>
  {pathname !== "/home" && (
    <TouchableOpacity onPress={() => router.push("/home")} style={styles.icon}>
      <FontAwesome name="home" size={35} color="#000" />
    </TouchableOpacity>
  )}
  {pathname !== "/search" && (
    <TouchableOpacity onPress={() => router.push("/search")} style={styles.icon}>
      <FontAwesome name="search" size={35} color="#000" />
    </TouchableOpacity>
  )}
  {pathname !== "/setup" && (
    <TouchableOpacity onPress={() => router.push("/setup")} style={styles.icon}>
      <FontAwesome name="plus" size={35} color="#000" />
    </TouchableOpacity>
  )}
  {pathname !== "/settings" && (
    <TouchableOpacity onPress={() => router.push("/settings")} style={styles.icon}>
      <FontAwesome name="cog" size={35} color="#000" />
    </TouchableOpacity>
  )}
</View>

          <Text style={styles.heading}>CONNECT YOUR RASPBERRY PI PICO</Text>
  
         
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>📋 How to Set Up</Text>
            <Text style={styles.instruction}>1. Hold down the BOOTSEL button and plug in your Pico.</Text>
            <Text style={styles.instruction}>2. Drag and drop the <Text style={styles.bold}>pico-w-firmware.uf2</Text> file into the RPI-RP2 drive.</Text>
            <Text style={styles.instruction}>3. Connect to the Pico Wi-Fi network named <Text style={styles.bold}>PICO-CONNECT</Text>.</Text>
            <Text style={styles.instruction}>4. Open your browser and visit <Text style={styles.bold}>http://192.168.4.1</Text>.</Text>
            <Text style={styles.instruction}>5. Enter your home Wi-Fi name and password.</Text>
            <Text style={styles.instruction}>6. Reboot your Pico. You're done!</Text>
          </View>
  
      
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>🛠 Common Setup Issues & Fixes</Text>
            <Text style={styles.instruction}>• I don’t see the "PICO-CONNECT" Wi-Fi:</Text>
            <Text style={styles.faqText}>→ Reboot the Pico and make sure you installed the UF2 file.</Text>
  
            <Text style={styles.instruction}>• The setup page (192.168.4.1) won’t load:</Text>
            <Text style={styles.faqText}>→ Reconnect to the Pico Wi-Fi. Disable mobile data if needed.</Text>
  
            <Text style={styles.instruction}>• I entered my Wi-Fi and nothing happened:</Text>
            <Text style={styles.faqText}>→ Double-check your SSID and password. Try again.</Text>
  
            <Text style={styles.instruction}>• How do I know it worked?</Text>
            <Text style={styles.faqText}>→ If "PICO-CONNECT" disappears after reboot, it’s connected!</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
  
  const CARD_WIDTH = Dimensions.get("window").width > 600 ? 500 : Dimensions.get("window").width * 0.92;
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: "cover",
      width: "100%",
      height: "100%",
    },
    container: {
      alignItems: "center",
      padding: 20,
      paddingTop: 100,
      paddingBottom: 60,
    },
    heading: {
      fontSize: 26,
      fontFamily: "BungeeShade-Regular",
      fontWeight: "bold",
      color: "#000",
      textAlign: "center",
      marginBottom: 25,
    },
    topIcons: {
      position: "absolute",
      top: 30,
      right: 20,
      flexDirection: "row",
      gap: 15,
      zIndex: 10,
    },
    icon: {
      marginLeft: 15,
    },
    
    card: {
      backgroundColor: "#fff",
      width: CARD_WIDTH,
      borderRadius: 20,
      padding: 20,
      marginBottom: 25,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 10,
      color: "#333",
    },
    instruction: {
      fontSize: 14,
      color: "#444",
      marginBottom: 8,
    },
    bold: {
      fontWeight: "bold",
    },
    faqText: {
      fontSize: 13,
      color: "#666",
      marginBottom: 10,
      marginLeft: 10,
    },
  });
  