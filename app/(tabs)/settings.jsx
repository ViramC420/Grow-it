/**import React from "react";
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
  });
*/
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  ImageBackground,
} from "react-native";
import { images } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

export default function SettingsPage() {
  const [username, setUsername] = useState("PlantLover123");
  const [email, setEmail] = useState("plantlover@example.com");
  const [password, setPassword] = useState("********");
  const [confirmPassword, setConfirmPassword] = useState("********");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const pathname = usePathname();

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    Alert.alert("Profile Updated", "Your settings have been saved.");
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => Alert.alert("Account Deleted") },
    ]);
  };

  return (
    <ImageBackground
      source={images.home}
      style={styles.background}
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
        </View>

      
        <Text style={styles.heading}>GROW IT! - SETTINGS</Text>

        <View style={styles.settingsBox}>
      
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />

        
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

      
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

 
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />


          <View style={styles.toggleRow}>
            <Text style={styles.label}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
          </View>

          <View style={styles.dropdownRow}>
            <Text style={styles.label}>Language</Text>
            <Text style={styles.dropdownText}>English (coming soon)</Text>
          </View>

    
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 80,
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
  heading: {
    fontSize: 30,
    fontFamily: "BungeeShade-Regular",
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 25,
  },
  settingsBox: {
    backgroundColor: "#fff",
    width: "90%",
    maxWidth: 500,        
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    elevation: 4,
    alignSelf: "center",      
  },
  
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dropdownRow: {
    marginBottom: 25,
  },
  dropdownText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#5DB075",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 14,
    marginTop: 20,
    alignItems: "center",
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});

