import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, ActivityIndicator, Alert, } from "react-native";
import { CustomButton } from "@/components";
import { useRouter } from "expo-router";
import { images } from "../../constants/index";
import { signupStyle } from "../../components/styles";
import { ImageBackground, ScrollView } from "react-native-web";

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
    <ImageBackground
          source = {images.landingbackground}
          style={[signupStyle.background, { backgroundColor: '#000' }]}
          resizeMode="cover"
          blurRadius={7}
    >
    <SafeAreaView style={signupStyle.safeArea}>
      <ScrollView contentContainerStyle={signupStyle.scrollContainer}>
        <View style={signupStyle.container}>
          <Text style={signupStyle.title}>Grow It!</Text>
      
          <TextInput
            style={signupStyle.username_input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            style={signupStyle.email_input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
      
          <TextInput
            style={signupStyle.password_input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
      
          <CustomButton
            title={loading ? "Signing up..." : "Sign Up"}
            handlePress={handleSignUp}
            containerStyles={signupStyle.button}
          />
      
          <Text style={signupStyle.linkText} onPress={() => router.push("/login")}>
            Already have an account? Login
          </Text>
          {loading && <ActivityIndicator size="large" color="#000" />}
        </View>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUp;