import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import image from "../assets/splash.png";
import { StackActions } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { ToastAndroid } from "react-native";
import { Alert } from "react-native";
import { initializeApp } from "firebase/app";

import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../firebaseApi";

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usercred, setUsercred] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const User = userCredential.user;
        // setUserCred(User);
        setUsercred(User);
        console.log(User);

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${User.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              User.details = snapshot.val();
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
        ToastAndroid.show("Logged in Successfully", ToastAndroid.SHORT);
        navigation.dispatch(StackActions.replace("MainScreen", {}));
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setLoading(false);
        ToastAndroid.show(errorCode, ToastAndroid.SHORT);
        Alert.alert("Login Error", errorCode);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View style={{ ...styles.container }}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{ height: "100%", width: "100%", ...styles.container }}
        >
          <View
            style={{
              borderColor: "#E48457",
              borderWidth: 1.4,
              width: "80%",
              height: 370,
              borderRadius: 10,
              backgroundColor: "rgba(20,20,20,1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontFamily: "sans-serif",
                fontSize: 20,
                fontWeight: "bold",
                textTransform: "uppercase",
                padding: 20,
                paddingTop: 70,
                color:"#fff"
              }}
            >
              Welcome
            </Text>
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                width: "90%",
                alignSelf: "center",
                margin: 10,
                marginBottom: 40,
                backgroundColor: "rgba(180,180,180,1)",
              }}
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              borderWidth={0}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={!showPassword ? "eye" : "eye-off"}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              }
              style={{
                width: "90%",
                alignSelf: "center",
                backgroundColor: "rgba(180,180,180,1)",
                borderWidth: 0,
                
              }}
            />

            <Button
              mode="contained"
              onPress={() => {
                navigation.navigate("SignIn");
              }}
              style={{
                alignSelf: "center",
                marginTop: 20,
                backgroundColor: "rgba(0,0,0,0)",
              }}
            >
              Already have an account? SignIn
            </Button>
          </View>
          {!loading ? (
            <Button
              icon="account-arrow-left"
              mode="contained"
              onPress={() => {
                console.log("SignIn Pressed");
                handleLogin();
                setLoading(true);
              }}
              style={{ width: "50%", alignSelf: "center", marginTop: 20 }}
            >
              Sign In
            </Button>
          ) : (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ marginTop: 10 }}
            />
          )}
          <Text
            style={{ color: "white", marginTop: 30 }}
            onPress={() => {
              console.log("Forget pressed");
            }}
          >
            Forget Password?
          </Text>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#rgba(30,30,30,1)",
    alignItems: "center",
    justifyContent: "center",
  },
});
