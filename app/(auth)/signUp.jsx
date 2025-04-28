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
          <Text style={styles.title}>Grow It!</Text>
      
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
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: '2%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    width: '75%',
    backgroundColor: 'rgba(254, 253, 252, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  title: {
    marginTop: '1%',
    fontFamily: "BungeeShade-Regular", 
    fontSize: 140, 
    fontWeight: 'bold', 
    textAlign: 'center',
    justifyContent: 'flex-start',
    color: '#093001',
  },
  username_input: {
    borderRadius: 20,
    borderWidth: 2,
    minHeight: 45,
    marginTop: '4%',
    paddingHorizontal: 20,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#093001",
    backgroundColor: "#fff",   
    fontFamily: 'Roboto-Regular',
    color: '#072404',
  },
  email_input: {
    borderRadius: 20,
    borderWidth: 2,
    minHeight: 45,
    marginTop: '1%',
    paddingHorizontal: 20,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#093001",
    backgroundColor: "#fff",   
    fontFamily: 'Roboto-Regular',
    color: '#072404',
  },
  password_input: {
    borderRadius: 20,
    borderWidth: 2,
    minHeight: 45,
    marginTop: '1%',
    paddingHorizontal: 20,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#093001",
    backgroundColor: "#fff",   
    fontFamily: 'Roboto-Regular',
    color: '#072404',
  },
  button: { 
    marginVertical: 5, 
    marginTop: '1%',
    width: "45%", 
    backgroundColor: "#1f1714"
  },
  linkText: {
    marginTop: '2%',
    marginBottom: '2%',
    color: "#093001",
    fontSize: 20,
    fontFamily: 'Roboto-Italic',
    textDecorationLine: "underline",
  },
})

export default SignUp;