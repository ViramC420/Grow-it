//handles fonts n stuff
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { SplashScreen, Stack } from "expo-router";

import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "BungeeShade-Regular": require("../assets/fonts/BungeeShade-Regular.ttf"),
          "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Italic": require("../assets/fonts/Roboto-Italic.ttf"),
          "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
          "Roboto-LightItalic": require("../assets/fonts/Roboto-LightItalic.ttf"),
          "WorkSans-SemiBold": require("../assets/fonts/WorkSans-SemiBold.ttf"),
          "WorkSans-SemiBoldItalic": require("../assets/fonts/WorkSans-SemiBoldItalic.ttf"),
          /*
          "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
          "Roboto-BlackItalic": require("../assets/fonts/Roboto-BlackItalic.ttf"),
          "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
          "Roboto-LightItalic": require("../assets/fonts/Roboto-LightItalic.ttf"),
          "Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
          "Roboto-SemiBoldItalic": require("../assets/fonts/Roboto-SemiBoldItalic.ttf"),
          "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
          "Roboto-ThinItalic": require("../assets/fonts/Roboto-ThinItalic.ttf"), */
        });
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      } catch (error) {
        console.error("Error loading fonts", error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
}
