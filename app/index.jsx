//Index page is 'landing' page if user is not signed in to account
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton, Loader } from "@/components";
import { images } from "@/constants/index";
import { useGlobalContext } from "@/context/GlobalProvider";

const Greeting = () => {
  const { loading, isLogged } = useGlobalContext();

  //if (!loading && isLogged) return <Redirect href="/home"/> //uncomment once login is handled

  return (
    <SafeAreaView style = {styles.safeArea}>
      <Loader isLoading = {loading} />  
          <View style={styles.container}>
            <Image 
              source = {images.sun1}
              style = {styles.suni}
              resizeMode="contain"
            />

            <Text style = {styles.textContainer}>Grow It!</Text>

            <CustomButton
              title="Log In"
              handlePress={() => router.push("../(tabs)/home")} //change that to log in page once created
              containerStyles={{ marginTop: 150, width: "75%", backgroundColor: "#755649"}}
            />  

            <CustomButton
              title="Sign Up"
              handlePress={() => router.push("../(tabs)/home")} //change that to sign up page once created
              containerStyles={{ marginTop: 15, width: "75%", backgroundColor: "#1a1a1a"}}
            /> 

          </View>
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
    width: '45%',
    height: '45%',
  },
  textContainer: {
    fontFamily: 'BungeeShade-Regular', 
    fontSize: 55, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#3d4325',
  },
})

export default Greeting;