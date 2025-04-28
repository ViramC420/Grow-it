//Base for buttons, style is similar throughout the app
//customizable parts are the title of the button and background color
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ 
    title, 
    backgroundColor,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Pressable
            onPress={handlePress}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            style = {[
                styles.buttonContainer,
                containerStyles,
                backgroundColor,
                isLoading && styles.loadingButton,
                isHovered && styles.hoverButton,
            ]}
            disabled={isLoading}
        >
            <Text style={[styles.buttonText, textStyles]}>
                {title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 20,
        minHeight: 45,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        width: '100%',
        transition: 'all 0.2s ease-in-out',
    },
    loadingButton: {
        opacity: 0.5,
    }, 
    hoverButton: {
        opacity: 0.9,
        transform: [{ scale: 1.05 }],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    }, 
    buttonText: {
        fontFamily: 'Roboto-Light',
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    fixToText: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
});

export default CustomButton;