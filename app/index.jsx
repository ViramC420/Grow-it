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
              <Text style = {styles.textContainer}>Grow It!</Text>

              <Text style = {styles.subtextContainer}>In case your green thumb needs some work.</Text>

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
  textContainer: {
    marginTop: 40,
    fontFamily: 'BungeeShade-Regular', 
    fontSize: 79, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#072404',
  },
  subtextContainer: {
    fontFamily: 'Roboto-Bold', 
    fontWeight: 'bold',
    fontSize: 15, 
    textAlign: 'center', 
    marginTop: 125,
    color: '#072404',
  },
  top_button: { marginTop: 20, width: "36%", backgroundColor: "#755649"},
  bottom_button: { marginTop: 15, marginBottom: 40, width: "36%", backgroundColor: "#3a2b26"},
})

export default Greeting;
