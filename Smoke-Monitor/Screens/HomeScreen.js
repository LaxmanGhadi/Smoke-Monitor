import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState, useRef, useEffect } from "react";
// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { Button, Platform } from "react-native";
import * as Device from "expo-device";
import { getDatabase, ref, onValue } from "firebase/database";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
//async () => {
//   await sendPushNotification(expoPushToken);
// }
// const Stack = createNativeStackNavigator();
const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const HomeScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [fire, setFire] = useState(0);
  const db = getDatabase();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    const starCountRef = ref(db, "smoke-level");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      // async () => {
      //   await
      // };

      sendPushNotification(expoPushToken, data);
      // setFire(data);
      // if (data != fire) {
      // }
    });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
                width: 30,
                height: 30,
                resizeMode: "contain",
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../assets/humidity.png")}
            />
            <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 7 }}>
              Everything looks great
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View
        style={{
          width: "84%",
          height: 1,
          backgroundColor: "black",
          marginTop: 10,
          marginBottom: 20,
        }}
      ></View>

      <View style={styles.Boxes}>
        <FontAwesome name="thumbs-up" color={"#E48457"} size={32} />
      </View>
    </SafeAreaView>
  );

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
  async function sendPushNotification(expoPushToken, data) {
    let message = {};
    if (data === 0) {
      message = {
        to: expoPushToken,
        sound: "default",
        title: "No Fire Detected",
        body: `Everything Looks good`,
        data: { someData: "goes here" },
      };
    } else {
      message = {
        to: expoPushToken,
        sound: "default",
        title: "⚠Fire Alert⚠",
        body: `Fire in the ${data}`,
        data: { someData: "goes here" },
      };
    }

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  Line: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Boxes: {
    height: 500,
    width: 500,
    backgroundColor: "rgba(20,20,20,0.7)",
    borderRadius: 20,
    margin: 20,
  },
});
