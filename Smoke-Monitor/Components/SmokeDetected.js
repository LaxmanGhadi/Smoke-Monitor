import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const SmokeDetected = () => {
  return (
    <View style={{flex:1,borderRadius:20,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:30 ,color:"#FF3131",fontWeight:"500"}}>Alert⚠</Text>
      <Image
              style={{ width: 120, height: 120, resizeMode: "contain",marginTop:10 }}
              source={require("../assets/smoke-icon.png")}
            />
      <Text style={{fontSize:18 ,color:"#fff",fontWeight:"500"}}>Smoke has been detected in your house</Text>      
    </View>
  )
}

export default SmokeDetected

const styles = StyleSheet.create({})