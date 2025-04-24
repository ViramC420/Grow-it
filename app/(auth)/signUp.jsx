import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, ActivityIndicator, Alert, } from "react-native";
import { CustomButton } from "@/components";
import { useRouter } from "expo-router";
import { images } from "../../constants/index";
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
          style={[styles.background, { backgroundColor: '#000' }]}
          resizeMode="cover"
          blurRadius={7}
    >
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
      
          <TextInput
            style={styles.username_input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

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
            title={loading ? "Signing up..." : "Sign Up"}
            handlePress={handleSignUp}
            containerStyles={styles.button}
          />
      
          <Text style={styles.linkText} onPress={() => router.push("/login")}>
            Already have an account? Login
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
    fontSize: 80, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#072404',
  },
  username_input: {
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 33,
    marginTop: 115,
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
  email_input: {
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
  button: { marginTop: 11, width: "36%", backgroundColor: "#3a2b26", },
  linkText: {
    marginTop: 15,
    marginBottom: 30,
    color: "##3a2b26",
    fontSize: 16,
    fontFamily: 'Roboto-Italic',
    textDecorationLine: "underline",
  },
})

export default SignUp;