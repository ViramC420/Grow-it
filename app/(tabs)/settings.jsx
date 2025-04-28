import React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-web";
import { ImageBackground } from "react-native-web";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";

export default function SettingsPage() {
  const [username, setUsername] = useState("PlantLover123");
  const [password, setPassword] = useState("********");
  const [confirmPassword, setConfirmPassword] = useState("********");
  const [email, setEmail] = useState("plantlover@example.com");

  const handleUpdate = () => {
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    Alert.alert("Profile Updated", "Your settings have been saved.");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => Alert.alert("Account Deleted") },
      ]
    );
  };

  return (
    <ImageBackground
        source = {images.home}
        style={[styles.background, { backgroundColor: '#000' }]}
        resizeMode="cover"
        blurRadius={7}
    >
    
      <SafeAreaView style = {styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}> Grow It! - Settings</Text>
            <Text style={styles.home} onPress={() => router.push("/home")}>
              <FontAwesome name="home" size={35} color="#000" />
             </Text>
            <Text style={styles.search} onPress={() => router.push("/search")}>
              <FontAwesome name="search" size={35} color="#000" />
            </Text>
            <Text style={styles.setup} onPress={() => router.push("/setup")}>
              <FontAwesome name="plus" size={35} color="#000" />
            </Text>
        </View>
            
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
              <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

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
  search: {
    paddingHorizontal: '1%',
  },
  setup: {
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#5DB075",
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 15,
    marginTop: 20,
    alignItems: "center",
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});
