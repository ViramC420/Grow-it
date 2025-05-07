import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, ActivityIndicator, Alert, } from "react-native";
import { CustomButton } from "@/components";
import { useRouter } from "expo-router";
import { images } from "../../constants/index";
import { loginStyle } from "../../components/styles";
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
      style={[loginStyle.background, { backgroundColor: '#000' }]}
      resizeMode="cover"
      blurRadius={7}
    >
      <SafeAreaView style={loginStyle.safeArea}>
        <ScrollView contentContainerStyle={loginStyle.scrollContainer}>
          <View style={loginStyle.container}>
          <Text style={loginStyle.title}>Grow It!</Text>

          <TextInput
            style={loginStyle.email_input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
      
          <TextInput
            style={loginStyle.password_input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
      
          <CustomButton
            title={loading ? "Logging in..." : "Login"}
            handlePress={handleLogin}
            containerStyles={loginStyle.button}
          />
      
          <Text style={loginStyle.linkText} onPress={() => router.push("/signup")}>
            Don't have an account? Sign Up
          </Text>
          {loading && <ActivityIndicator size="large" color="#000" />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;