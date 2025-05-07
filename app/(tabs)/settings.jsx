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
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { navBar, settingsStyle } from "../../components/styles";
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
      style={settingsStyle.background}
      resizeMode="cover"
      blurRadius={7}
    >
      <SafeAreaView style={settingsStyle.safeArea}>
        <View style={navBar.header}>
          <Text style={navBar.title}>Grow It! - Settings</Text>
          <Text style={navBar.home} onPress={() => router.push("/home")}>
            <FontAwesome name="home" size={45} color="#000" />
          </Text>
          <Text style={navBar.setup} onPress={() => router.push("/search")}>
            <FontAwesome name="search" size={45} color="#000" />
          </Text>
          <Text style={navBar.settings} onPress={() => router.push("/setup")}>
            <FontAwesome name="plus" size={45} color="#000" />
          </Text>
        </View>

        <ScrollView contentContainerStyle={settingsStyle.container}>
          <View style={settingsStyle.settingsBox}>
      
          <Text style={settingsStyle.label}>Username</Text>
          <TextInput style={settingsStyle.input} value={username} onChangeText={setUsername} />

        
          <Text style={settingsStyle.label}>Email</Text>
          <TextInput
            style={settingsStyle.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

      
          <Text style={settingsStyle.label}>New Password</Text>
          <TextInput
            style={settingsStyle.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

 
          <Text style={settingsStyle.label}>Confirm New Password</Text>
          <TextInput
            style={settingsStyle.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />


          <View style={settingsStyle.toggleRow}>
            <Text style={settingsStyle.label}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
          </View>

          <View style={settingsStyle.dropdownRow}>
            <Text style={settingsStyle.label}>Language</Text>
            <Text style={settingsStyle.dropdownText}>English (coming soon)</Text>
          </View>

    
          <TouchableOpacity style={settingsStyle.button} onPress={handleUpdate}>
            <Text style={settingsStyle.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={settingsStyle.deleteButton} onPress={handleDeleteAccount}>
            <Text style={settingsStyle.deleteText}>Delete Account</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

