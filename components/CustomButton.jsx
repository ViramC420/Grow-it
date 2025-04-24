//Base for buttons, style is similar throughout the app
//customizable parts are the title of the button and background color
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ 
    title, 
    backgroundColor,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity= {0.5}
            style = {[
                styles.buttonContainer,
                containerStyles,
                backgroundColor,
                isLoading && styles.loadingButton,
            ]}
            disabled={isLoading}
        >
            <Text style={[styles.buttonText, textStyles]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 20,
        minHeight: 33,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    loadingButton: {
        opacity: 0.5,
    },  
    buttonText: {
        fontFamily: 'Roboto-Regular',
        color: 'white',
        fontSize: 15,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CustomButton;