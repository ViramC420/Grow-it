import { useGlobalContext } from "../../context/GlobalProvider";
import { Stack } from "expo-router";
import React from "react";
import GlobalProvider from "../../context/GlobalProvider";

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  //if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="setup" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default TabLayout;
