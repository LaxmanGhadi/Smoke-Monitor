import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState, useRef, useEffect } from "react";
// import "react-native-gesture-handler";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { IconButton } from "react-native-paper";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import NoFire from "../Components/NoFire";
import SmokeDetected from "../Components/SmokeDetected";

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

const HomeScreen = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [datee, setDatee] = useState(0);
  const [time, setTime] = useState(0);

  const notificationListener = useRef();
  const responseListener = useRef();
  const [fire, setFire] = useState(0);
  const db = getDatabase();
  const auth = getAuth();
  const handleLogOut = async () => {
    try {
      await auth.signOut();
      navigation.dispatch(StackActions.replace("SignIn", {}));
      console.log("Logged out");
    } catch (e) {
      console.log(e);
    }
  };

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
      setFire(data);
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
  useEffect(() => {
    setInterval(() => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      let current_date = mm + "/" + dd + "/" + yyyy;
      setDatee(current_date);
      var hours = today.getHours();
      var minutes = today.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      setTime(strTime);
    }, 1000);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: fire ? "red" : "#282828",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          height: 150,
          width: "90%",
          // backgroundColor: "#146",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingTop: 29,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "500",
            color: fire ? "#fff" : "#E48457",
          }}
        >
          Fire Protect
        </Text>

        <IconButton
          icon="logout"
          iconColor={fire ? "#fff" : "#E48457"}
          size={20}
          onPress={() => handleLogOut()}
        />
      </View>

      <View
        style={{
          height: 205,
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
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: "#fff",
                paddingLeft: 10,
              }}
            >
              Home
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                fontSize: 50,
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              {time}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "300",
                color: "#fff",
                height: 30,
              }}
            >
              {datee}
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
              source={require("../assets/smokeDetector.png")}
            />
            {fire == 0 ? (
              <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 7 }}>
                Everything looks great
              </Text>
            ) : (
              <Text
                style={{
                  color: "red",
                  fontSize: 25,
                  paddingLeft: 7,
                  fontWeight: "bold",
                }}
              >
                ⚠⚠⚠ Fire Alert ⚠⚠⚠
              </Text>
            )}
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

      <View style={styles.Boxes}>{fire ? <SmokeDetected /> : <NoFire />}</View>
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
    height: 220,
    width: "93%",
    backgroundColor: "rgba(20,20,20,0.7)",
    borderRadius: 20,
  },
});
