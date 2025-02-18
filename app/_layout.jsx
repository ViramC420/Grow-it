//handles fonts n stuff
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "BungeeShade-Regular": require("../assets/fonts/BungeeShade-Regular.ttf"),
    "Roboto-Italic-VariableFont_wdth,wght": require("../assets/fonts/Roboto-Italic-VariableFont_wdth,wght.ttf"),
    "Roboto-VariableFont_wdth,wght": require("../assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
    "Roboto_Condensed-Black": require("../assets/fonts/Roboto_Condensed-Black.ttf"),
    "Roboto_Condensed-BlackItalic": require("../assets/fonts/Roboto_Condensed-BlackItalic.ttf"),
    "Roboto_Condensed-Bold": require("../assets/fonts/Roboto_Condensed-Bold.ttf"),
    "Roboto_Condensed-BoldItalic": require("../assets/fonts/Roboto_Condensed-BoldItalic.ttf"),
    "Roboto_Condensed-ExtraBold": require("../assets/fonts/Roboto_Condensed-ExtraBold.ttf"),
    "Roboto_Condensed-ExtraBoldItalic": require("../assets/fonts/Roboto_Condensed-ExtraBoldItalic.ttf"),
    "Roboto_Condensed-ExtraLight": require("../assets/fonts/Roboto_Condensed-ExtraLight.ttf"),
    "Roboto_Condensed-ExtraLightItalic": require("../assets/fonts/Roboto_Condensed-ExtraLightItalic.ttf"),
    "Roboto_Condensed-Italic": require("../assets/fonts/Roboto_Condensed-Italic.ttf"),
    "Roboto_Condensed-Light": require("../assets/fonts/Roboto_Condensed-Light.ttf"),
    "Roboto_Condensed-LightItalic": require("../assets/fonts/Roboto_Condensed-LightItalic.ttf"),
    "Roboto_Condensed-Medium": require("../assets/fonts/Roboto_Condensed-Medium.ttf"),
    "Roboto_Condensed-MediumItalic": require("../assets/fonts/Roboto_Condensed-MediumItalic.ttf"),
    "Roboto_Condensed-Regular": require("../assets/fonts/Roboto_Condensed-Regular.ttf"),
    "Roboto_Condensed-SemiBold": require("../assets/fonts/Roboto_Condensed-SemiBold.ttf"),
    "Roboto_Condensed-SemiBoldItalic": require("../assets/fonts/Roboto_Condensed-SemiBoldItalic.ttf"),
    "Roboto_Condensed-Thin": require("../assets/fonts/Roboto_Condensed-Thin.ttf"),
    "Roboto_Condensed-ThinItalic": require("../assets/fonts/Roboto_Condensed-ThinItalic.ttf"),
    "Roboto_SemiCondensed-Black": require("../assets/fonts/Roboto_SemiCondensed-Black.ttf"),
    "Roboto_SemiCondensed-BlackItalic": require("../assets/fonts/Roboto_SemiCondensed-BlackItalic.ttf"),
    "Roboto_SemiCondensed-Bold": require("../assets/fonts/Roboto_SemiCondensed-Bold.ttf"),
    "Roboto_SemiCondensed-BoldItalic": require("../assets/fonts/Roboto_SemiCondensed-BoldItalic.ttf"),
    "Roboto_SemiCondensed-ExtraBold": require("../assets/fonts/Roboto_SemiCondensed-ExtraBold.ttf"),
    "Roboto_SemiCondensed-ExtraBoldItalic": require("../assets/fonts/Roboto_SemiCondensed-ExtraBoldItalic.ttf"),
    "Roboto_SemiCondensed-ExtraLight": require("../assets/fonts/Roboto_SemiCondensed-ExtraLight.ttf"),
    "Roboto_SemiCondensed-ExtraLightItalic": require("../assets/fonts/Roboto_SemiCondensed-ExtraLightItalic.ttf"),
    "Roboto_SemiCondensed-Italic": require("../assets/fonts/Roboto_SemiCondensed-Italic.ttf"),
    "Roboto_SemiCondensed-Light": require("../assets/fonts/Roboto_SemiCondensed-Light.ttf"),
    "Roboto_SemiCondensed-LightItalic": require("../assets/fonts/Roboto_SemiCondensed-LightItalic.ttf"),
    "Roboto_SemiCondensed-Medium": require("../assets/fonts/Roboto_SemiCondensed-Medium.ttf"),
    "Roboto_SemiCondensed-MediumItalic": require("../assets/fonts/Roboto_SemiCondensed-MediumItalic.ttf"),
    "Roboto_SemiCondensed-Regular": require("../assets/fonts/Roboto_SemiCondensed-Regular.ttf"),
    "Roboto_SemiCondensed-SemiBold": require("../assets/fonts/Roboto_SemiCondensed-SemiBold.ttf"),
    "Roboto_SemiCondensed-SemiBoldItalic": require("../assets/fonts/Roboto_SemiCondensed-SemiBoldItalic.ttf"),
    "Roboto_SemiCondensed-Thin": require("../assets/fonts/Roboto_SemiCondensed-Thin.ttf"),
    "Roboto_SemiCondensed-ThinItalic": require("../assets/fonts/Roboto_SemiCondensed-ThinItalic.ttf"),
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("../assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("../assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-ExtraBold": require("../assets/fonts/Roboto-ExtraBold.ttf"),
    "Roboto-ExtraBoldItalic": require("../assets/fonts/Roboto-ExtraBoldItalic.ttf"),
    "Roboto-ExtraLight": require("../assets/fonts/Roboto-ExtraLight.ttf"),
    "Roboto-ExtraLightItalic": require("../assets/fonts/Roboto-ExtraLightItalic.ttf"),
    "Roboto-Italic": require("../assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("../assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("../assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
    "Roboto-SemiBoldItalic": require("../assets/fonts/Roboto-SemiBoldItalic.ttf"),
    "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("../assets/fonts/Roboto-ThinItalic.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};