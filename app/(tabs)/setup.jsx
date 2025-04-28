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
  import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Redirect, router } from "expo-router";

export default function Tab() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleConnect = () => {
    // Placeholder action for connecting to Raspberry Pi Pico
    alert(`Attempting to connect to "${ssid}"...`);
  };

  const handleSendChat = () => {
    if (chatMessage.trim() === "") return;

    setChatLog([...chatLog, { sender: "user", text: chatMessage }]);
    setChatMessage("");

    // Simulated AI response
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        { sender: "ai", text: "I'm here to help! Try making sure your Pico is in setup mode." },
      ]);
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tab [Home|Setup|Search|Settings]</Text>

      {/* WiFi Setup Section */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Setup Your Raspberry Pi Pico</Text>

        <TextInput
          placeholder="Enter WiFi SSID"
          style={styles.input}
          value={ssid}
          onChangeText={setSsid}
        />
        <TextInput
          placeholder="Enter WiFi Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleConnect}>
          <Text style={styles.buttonText}>Connect Device</Text>
        </TouchableOpacity>
      </View>

      {/* AI Chatbot Section */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Need Help? Ask Our AI Chatbot</Text>

        <View style={styles.chatBox}>
          {chatLog.map((msg, index) => (
            <Text
              key={index}
              style={{
                color: msg.sender === "user" ? "#333" : "#5DB075",
                marginBottom: 5,
              }}
            >
              {msg.sender === "user" ? "You: " : "GrowBot: "}
              {msg.text}
            </Text>
          ))}
        </View>

        <TextInput
          placeholder="Ask something..."
          style={styles.input}
          value={chatMessage}
          onChangeText={setChatMessage}
        />
        <TouchableOpacity style={styles.chatButton} onPress={handleSendChat}>
          <Text style={styles.chatButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#5DB075",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  chatBox: {
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderRadius: 10,
    height: 150,
    marginBottom: 10,
  },
  chatButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  chatButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
