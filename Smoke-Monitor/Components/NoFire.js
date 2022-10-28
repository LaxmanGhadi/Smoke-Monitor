import { StyleSheet, Text, View,Image, ImageBackground } from "react-native";
import React from "react";

const NoFire = () => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30, color: "#39FF14", fontWeight: "500" }}>
        Safe
      </Text>
      <ImageBackground
       style={{
        width: 120,
        height: 120,
        resizeMode: "contain",
        marginTop: 10,
        alignItems:"center",
        justifyContent:"center"
      }}
      source={require("../assets/shiled.png")}
      >
        <Image
        style={{
          width: 70,
          height: 70,
          resizeMode: "contain",
          marginBottom: 15,
        }}
        source={require("../assets/house-icon.png")}
      >
        
      </Image>


      </ImageBackground>
      
      <Text style={{ fontSize: 18, color: "#fff", fontWeight: "500" }}>
        Everything looks great
      </Text>
    </View>
  );
};

export default NoFire;

const styles = StyleSheet.create({});
