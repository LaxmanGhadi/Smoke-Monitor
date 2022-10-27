import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./Screens/MainScreen";
import Login from "./Screens/Login";
import SignIn from "./Screens/SignIn";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={Login}></Stack.Screen>
        <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          initialParams={{
            userDetails: userDetails,
          }}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
