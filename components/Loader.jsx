//Loader file checks screen width and height for display purposes and 
//acts as a loading screen, isLoading is checked in other files as true or false
import React from "react";
import { View, ActivityIndicator, Dimensions, Platform, StyleSheet } from "react-native";

const Loader = ({ isLoading, backgroundColor }) => {
    const osName = Platform.OS;
    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;

    if (!isLoading) return null;

    return (
        <View
            styles = {[
                styles.loaderContainer,
                {
                    height: screenHeight,
                    width: screenWidth,
                }
            ]}
        >
            <ActivityIndicator
                animating = {isLoading}
                color="#d1cfc9"
                size={osName === "ios" ? "large" : 50}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f6f1"
    },
});

export default Loader;