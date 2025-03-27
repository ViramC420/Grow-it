//Index page is 'landing' page if user is not signed in to account
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, Loader } from "@/components";
import { images } from "../constants/index";
import { useGlobalContext } from "../context/GlobalProvider";


const Greeting = () => {
  const { loading, isLogged } = useGlobalContext();

  //if (!loading && isLogged) return <Redirect href="/home"/> //uncomment once login is handled

  return (
    <SafeAreaView style = {styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Loader isLoading = {loading} />  
          <View style={styles.container}>
            <Image 
              source = {images.sun1}
              style = {styles.suni}
              resizeMode="contain"
            />

            <Text style = {styles.textContainer}>Grow It!</Text>
            <Text style = {styles.subtextContainer}>In case your green thumb needs some work.</Text>

            <CustomButton
              title="Log In"
              handlePress={() => router.push("../(auth)/login")} //change that to log in page once created
              containerStyles={{ marginTop: 15, width: "50%", backgroundColor: "#755649"}}
            />  

            <CustomButton
              title="Sign Up"
              handlePress={() => router.push("../(auth)/signup")} //change that to sign up page once created
              containerStyles={{ marginTop: 15, width: "50%", backgroundColor: "#3a2b26"}}
            /> 

          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f8f6f1',
    height: '100%',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  suni: {
    marginTop: 20,
    width: '75%',
    height: '75%',
  },
  textContainer: {
    marginTop: 10,
    fontFamily: 'BungeeShade-Regular', 
    fontSize: 60, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#3d4325',
  },
  subtextContainer: {
    fontFamily: 'Roboto-Regular', 
    fontSize: 15, 
    textAlign: 'center', 
    marginTop: 75,
    color: '#aaaaaa',
  }
})

export default Greeting;
