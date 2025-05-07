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
  import { SafeAreaView } from "react-native-safe-area-context";
  import { images } from "../../constants"; // adjust if needed
  import { navBar, setupStyle } from "../../components/styles";
  import { FontAwesome } from "@expo/vector-icons";
  import { router, usePathname } from "expo-router";
import { set } from "mongoose";
  
  export default function ConnectPico() {
    const pathname = usePathname();
  
    return (
      <ImageBackground
        source={images.home}
        style={[setupStyle.background, { backgroundColor: "#000" }]}
        resizeMode="cover"
        blurRadius={7}
      >
        <SafeAreaView style={setupStyle.safeArea}>
          <View style={navBar.header}>
              <Text style={navBar.title}>Grow It! - Setup</Text>
              <Text style={navBar.home} onPress={() => router.push("/home")}>
                <FontAwesome name="home" size={45} color="#000" />
              </Text>
              <Text style={navBar.search} onPress={() => router.push("/search")}>
                <FontAwesome name="search" size={45} color="#000" />
              </Text>
              <Text style={navBar.settings} onPress={() => router.push("/settings")}>
                <FontAwesome name="cog" size={45} color="#000" />
              </Text>
          </View>
          
          <ScrollView contentContainerStyle={setupStyle.container}>
            <Text style={setupStyle.heading}>CONNECT YOUR RASPBERRY PI PICO</Text>
            <View style={setupStyle.card}>
              <Text style={setupStyle.sectionTitle}>📋 How to Set Up</Text>
              <Text style={setupStyle.instruction}>1. Hold down the BOOTSEL button and plug in your Pico.</Text>
              <Text style={setupStyle.instruction}>2. Drag and drop the <Text style={setupStyle.bold}>pico-w-firmware.uf2</Text> file into the RPI-RP2 drive.</Text>
              <Text style={setupStyle.instruction}>3. Connect to the Pico Wi-Fi network named <Text style={setupStyle.bold}>PICO-CONNECT</Text>.</Text>
              <Text style={setupStyle.instruction}>4. Open your browser and visit <Text style={setupStyle.bold}>http://192.168.4.1</Text>.</Text>
              <Text style={setupStyle.instruction}>5. Enter your home Wi-Fi name and password.</Text>
              <Text style={setupStyle.instruction}>6. Reboot your Pico. You're done!</Text>
            </View>
      
            <View style={setupStyle.card}>
              <Text style={setupStyle.sectionTitle}>🛠 Common Setup Issues & Fixes</Text>
              <Text style={setupStyle.instruction}>• I don’t see the "PICO-CONNECT" Wi-Fi:</Text>
              <Text style={setupStyle.faqText}>→ Reboot the Pico and make sure you installed the UF2 file.</Text>
  
              <Text style={setupStyle.instruction}>• The setup page (192.168.4.1) won’t load:</Text>
              <Text style={setupStyle.faqText}>→ Reconnect to the Pico Wi-Fi. Disable mobile data if needed.</Text>
  
              <Text style={setupStyle.instruction}>• I entered my Wi-Fi and nothing happened:</Text>
              <Text style={setupStyle.faqText}>→ Double-check your SSID and password. Try again.</Text>
  
              <Text style={setupStyle.instruction}>• How do I know it worked?</Text>
              <Text style={setupStyle.faqText}>→ If "PICO-CONNECT" disappears after reboot, it’s connected!</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }