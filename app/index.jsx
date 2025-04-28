//Index page is 'landing' page if user is not signed in to account
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, Loader } from "@/components";
import { images } from "../constants/index";
import { useGlobalContext } from "../context/GlobalProvider";
import { ImageBackground } from "react-native-web";

const Greeting = () => {
  const { loading, isLogged } = useGlobalContext();

  //if (!loading && isLogged) return <Redirect href="/home"/> //uncomment once login is handled

  return (
    <ImageBackground
      source = {images.landingbackground}
      style={[styles.background, { backgroundColor: '#000' }]}
      resizeMode="cover"
      blurRadius={7}
    >
      <SafeAreaView style = {styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Loader isLoading = {loading} />  
            <View style={styles.container}>
              <Text style = {styles.title}>Grow It!</Text>

              <Text style = {styles.subtextContainer}>Helping your green thumb grow, one plant at a time.</Text>

              <CustomButton
                title="Log In"
                handlePress={() => router.push("../(auth)/login")}
                containerStyles={styles.top_button}
              />  

              <CustomButton
                title="Sign Up"
                handlePress={() => router.push("../(auth)/signUp")}
                containerStyles={styles.bottom_button}
             /> 
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
    paddingVertical: '4%',
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
    paddingVertical: '1%',
    fontFamily: "BungeeShade-Regular", 
    fontSize: 140, 
    fontWeight: 'bold', 
    textAlign: 'center',
    justifyContent: 'flex-start',
    color: '#093001',
  },
  subtextContainer: {
    fontFamily: 'Roboto-LightItalic',
    fontSize: 20, 
    textAlign: 'center', 
    marginTop: '2%',
    color: '#093001',
  },
  top_button: { 
    marginVertical: 5, 
    marginTop: '1%',
    width: "45%", 
    backgroundColor: "#45332b"},
  bottom_button: { 
    marginTop: '1%', 
    marginBottom: '2%',
    width: "45%",
    backgroundColor: "#1f1714"},
})

export default Greeting;