import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseApi";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase } from "firebase/database";

const SplashScreen = (navigation, route) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const ref = React.useRef(false);

  useEffect(() => {
    console.log(ref.current);

    if (!ref.current) {
      onAuthStateChanged(
        auth,
        (user = {
          if(user) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/${user.uid}`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                  user.details = snapshot.val();
                } else {
                  console.log("No data available");
                }
              })
              .catch((error) => {
                console.error(error);
              });

            route.params.setUserDetails(user);
            // console.log(user.role);
            // const uid = user.uid;
            // console.log(uid);
            if (!isCalledRef.current) {
              isCalledRef.current = true;
              setTimeout(function () {
                //your code to be executed after 1 second
                navigation.dispatch(StackActions.replace("MainScreen", {}));
                console.log("\n\n\n\nSplash to Main\n\n\n\n", isCalledRef);
              }, 3000);
            }
            // ...
          },
        })
      );
    } else {
      if (!isCalledRef.current) {
        isCalledRef.current = true;
        setTimeout(function () {
          navigation.dispatch(StackActions.replace("Login", {}));
          console.log("\n\n\n\nSplash to Signin\n\n\n\n");
        }, 3000);
      }
    }
  }, []);

  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
