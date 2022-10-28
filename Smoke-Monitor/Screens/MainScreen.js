import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome ,MaterialCommunityIcons} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import Profile from "./Profile";
const Tab = createBottomTabNavigator();
const MainScreen = ({navigation,route}) => {
  return (
    <Tab.Navigator
      initialRouteName="feed"
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: "#090A0B",
          borderTopColor: "#090A0B",
          stopAnimation: "false",
        },
      }}
      tabBarOptions={{
        activeTintColor: "#E48457",
      }}
    >
      <Tab.Screen
        name="Fire Protect"
        component={HomeScreen}
        initialParams={{
          userDetails: route.params.userDetails,
        }}
        options={{
          tabBarLabel: "",
          headerStyle: {
            backgroundColor: "#282828",
            height: 120,
            borderBottomEndRadius:0,
            borderBottomColor:"#000"
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 27,
            fontWeight: "200",
            color: "#E48457",
            marginLeft: 20,
          },
            tabBarLabelStyle: { fontSize :15 ,fontWeight: "470",
           },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={23.5} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{
          userDetails: route.params.userDetails,
        }}
        options={{
          tabBarLabel: "",
          headerStyle: {
            backgroundColor: "#090A0B",
            height: 120,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 27,
            fontWeight: "200",
            color: "#fff",
            marginLeft: 20,
          },
          //   tabBarLabelStyle: { fontSize :15 ,fontWeight: "470",
          //  },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={23.5} />
          ),
        }}
      />
    </Tab.Navigator>
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
