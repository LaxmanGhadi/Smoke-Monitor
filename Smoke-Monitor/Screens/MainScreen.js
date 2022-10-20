import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
    FontAwesome
  } from "@expo/vector-icons";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();
const MainScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#282828",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View style={{ padding: 50 }}>
        <Text style={{ fontSize: 32, fontWeight: "500", color: "#E48457" }}>
          Fire Protect
        </Text>
      </View>

      <View
        style={{
          height: 240,
          width: "94%",
          //   backgroundColor: "rgba(20,20,20,0.7)",
          flexDirection: "column",
          justifyContent: "flex-start",
          margin: 10,
          justifyContent: "space-evenly",
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 3,
        }}
      >
        <LinearGradient
          style={{
            flex: 1,
            padding: 20,
            borderRadius: 20,
          }}
          colors={["#404040", "#252525", "#121212"]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 20, height: 20, resizeMode: "contain" }}
              source={require("../assets/house-icon.png")}
            />
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>
                Home
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ fontSize: 50, color: "#fff" }}>07:17 AM</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "300",
                color: "#fff",
              }}
            >
              10/08/2022
            </Text>
          </View>

          <View style={styles.Line}>
            <Image
              style={{
                width: 33,
                height: 33,
                resizeMode: "contain",
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../assets/snowflake.png")}
            />
            <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 7 }}>
              19"C
            </Text>
          </View>
          <View style={styles.Line}>
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../assets/humidity.png")}
            />
            <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 7 }}>
              27
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View style={{ width: "84%", height: 1, backgroundColor: "black",marginTop:10,marginBottom:20 }} ></View>


      <View style={styles.Boxes} >

      <FontAwesome name="thumbs-up" color={"#E48457"} size={32} />
      </View>
      
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  Line: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Boxes: {
    height: 200,
    width: 200,
    backgroundColor: "rgba(20,20,20,0.7)",
    borderRadius: 20,
    margin: 20,
  },
});
