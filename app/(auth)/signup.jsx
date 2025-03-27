import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { CustomButton } from "@/components";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://growitweb.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        router.push("/login"); // NAV TO LOGIN AFTER SIGN UP
      } else {
        Alert.alert("Sign Up Failed", data.message || "Error creating account");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton
        title={loading ? "Signing up..." : "Sign Up"}
        handlePress={handleSignUp}
        containerStyles={styles.button}
      />
      <Text style={styles.linkText} onPress={() => router.push("/login")}>
        Already have an account? Login
      </Text>
      {loading && <ActivityIndicator size="large" color="#000" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f6f1",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontFamily: "BungeeShade-Regular",
    fontSize: 40,
    color: "#3d4325",
    marginBottom: 20,
  },
  input: {
    width: "50%",
    height: 50,
    borderColor: "#cad6a3",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "50%",
    backgroundColor: "#755649",
    marginTop: 10,
  },
  linkText: {
    marginTop: 20,
    color: "#755649",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default SignUp;