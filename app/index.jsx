//Index page is 'landing' page if user is not signed in to account
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, Loader } from "@/components";
import { images } from "../constants/index";
import { useGlobalContext } from "../context/GlobalProvider";
import { indexStyle } from "../components/styles";
import { ImageBackground } from "react-native-web";

const Greeting = () => {
  const { loading, isLogged } = useGlobalContext();

  //if (!loading && isLogged) return <Redirect href="/home"/> //uncomment once login is handled

  return (
    <ImageBackground
      source = {images.landingbackground}
      style={[indexStyle.background, { backgroundColor: '#000' }]}
      resizeMode="cover"
      blurRadius={7}
    >
      <SafeAreaView style = {indexStyle.safeArea}>
        <ScrollView contentContainerStyle={indexStyle.scrollContainer}>
          <Loader isLoading = {loading} />  
            <View style={indexStyle.container}>
              <Text style = {indexStyle.title}>Grow It!</Text>

              <Text style = {indexStyle.subtextContainer}>Helping your green thumb grow, one plant at a time.</Text>

              <CustomButton
                title="Log In"
                handlePress={() => router.push("../(auth)/login")}
                containerStyles={indexStyle.top_button}
              />  

              <CustomButton
                title="Sign Up"
                handlePress={() => router.push("../(auth)/signUp")}
                containerStyles={indexStyle.bottom_button}
             /> 
            </View>
        </ScrollView>
       </SafeAreaView>
    </ImageBackground>
  );
};

export default Greeting;