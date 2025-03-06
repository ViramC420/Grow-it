import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { CustomButton } from "../../components";
import { FlatList, Image, RefreshControl, Text, View, StyleSheet } from "react-native";

const Home = () => {
    const handleButtonPress = () => {
        console.log('Button pressed!');
    };
    
    return (
        <View>
            <View>
                <View>
                    <Text style = {styles.textContainer}>Welcome!</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginTop: 100,
        fontFamily: 'Roboto-Medium',
        fontSize: 55, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: '#3d4325',
      },
});

export default Home;
