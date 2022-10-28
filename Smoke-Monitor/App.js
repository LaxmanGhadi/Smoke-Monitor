import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./Screens/MainScreen";
import Login from "./Screens/Login";
import SignIn from "./Screens/SignIn";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import HomeScreen from "./Screens/HomeScreen";
import SplashScreen from "./Screens/SplashScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();

export default function App({}) {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Splash">
        {/* <Stack.Screen name ="Splash" component={SplashScreen}
         initialParams={{
          userDetails: userDetails,
          setUserDetails: setUserDetails,
        }}
        options={{ headerShown: false }}/> */}
        <Stack.Screen name="LogIn" component={Login}
        options= {{
          title :"Fire Protect",
          backgroundColor:"#191919",
          
          
        }}
        ></Stack.Screen>
        <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
        <Stack.Screen
          name="MainScreen"
          component={HomeScreen}
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
