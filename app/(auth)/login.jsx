import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, ActivityIndicator, Alert, } from "react-native";
import { CustomButton } from "@/components";
import { useRouter } from "expo-router";
import { images } from "../../constants/index";
import { ImageBackground, ScrollView } from "react-native-web";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://growitweb.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/(tabs)/home"); // NAV TO HOME WHEN SUCCESS
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source = {images.landingbackground}
      style={[styles.background, { backgroundColor: '#000' }]}
      resizeMode="cover"
      blurRadius={7}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.email_input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
      
          <TextInput
            style={styles.password_input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
      
          <CustomButton
            title={loading ? "Logging in..." : "Login"}
            handlePress={handleLogin}
            containerStyles={styles.button}
          />
      
          <Text style={styles.linkText} onPress={() => router.push("/signUp")}>
            Don't have an account? Sign Up
          </Text>
          {loading && <ActivityIndicator size="large" color="#000" />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(254, 253, 252, 0.8)',
    marginTop: 30,
    marginLeft: 150,
    marginRight: 150,
    borderRadius: 50,
    alignItems: 'center',
  },
  title: {
    marginTop: 40,
    fontFamily: 'BungeeShade-Regular', 
    fontSize: 79, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#072404',
  },
  email_input: {
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 33,
    marginTop: 125,
    paddingHorizontal: 12,
    width: "36%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#cad6a3",
    backgroundColor: "#fff",   
    fontFamily: 'Roboto-Regular',
    color: '#072404',
  },
  password_input: {
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 33,
    marginTop: 11,
    paddingHorizontal: 12,
    width: "36%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#cad6a3",
    backgroundColor: "#fff",   
    fontFamily: 'Roboto-Regular',
    color: '#072404',
  },
  button: { marginTop: 11, width: "36%", backgroundColor: "#3a2b26"},
  linkText: {
    marginTop: 15,
    marginBottom: 30,
    color: "##3a2b26",
    fontSize: 16,
    fontFamily: 'Roboto-Italic',
    textDecorationLine: "underline",
  },
})

export default Login;