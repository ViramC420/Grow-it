import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { icons, images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { CustomButton, Loader } from "@/components";
import React from "react";

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  //if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#5F7E49",
          tabBarInactiveTintColor: "#1A1A1A",
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "#F8F6F1",
            borderTopWidth: 1,
            borderTopColor: "#6B6A68",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={ color } />
          }}
        />
        <Tabs.Screen
          name="setup"
          options={{
            title: "Setup",
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="wrench" color={ color } />
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={ color } />
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={ color } />
          }}
        />
      </Tabs>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />

    </>
  );
};

export default TabLayout;