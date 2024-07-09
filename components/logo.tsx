import { View,Image } from "react-native";
import logo from "../assets/images/affiliate.png"
 import React from 'react'
 
 export default function Logo() {
   return (
    <View style={{width:50,height:50,backgroundColor:"black",borderRadius:100,justifyContent:"center",flexDirection:"row",alignItems:"center"}}>
    <Image source={logo} style={{width:30, height:30}}/>
    </View>
   )
 }
 