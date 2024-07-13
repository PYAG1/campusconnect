import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
import { router } from "expo-router";
import { Size } from "iconsax-react-native";
import React from "react";
import { Button, ScrollView, View, Text } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const options = [
    {
      name: "Edit Event",
      icon: "bhb"
    },
    {
      name: "Delete Event",
      icon: "kmkm"
    }
  ];
  return (
    <SafeAreaView style={{ flex: 1, width: sizes.screenWidth }}>
      <Button title="uuh" onPress={() => router.back()}></Button>
      <ScrollView
        style={{
          marginVertical: sizes.marginSM,
          paddingHorizontal: sizes.marginSM,
        }}
      >
        <View
          style={{
            width: "100%",
            height: sizes.screenHeight / 3,
            backgroundColor: "black",
            borderRadius: 20,
            marginBottom: sizes.marginSM,
          }}
        ></View>
        <View style={{ flexDirection: "column", gap: 15 }}>
          <Text
            style={{
              color: Colors.light.button,
              fontSize: sizes.fontSize[5] + 3,
            }}
          >
            Event Name
          </Text>
          <Text
            style={{ color: Colors.light.button, fontSize: sizes.fontSize[3] }}
          >
            Event Name, 01:00-02:00
          </Text>
     <View style={{width:"100%",flexDirection:"row",gap:20}}>
     {
            options?.map((item)=>(
              <View style={{width:80,backgroundColor:"red",height:70,borderRadius:10}}></View>
            ))
          }
     </View>

     <Text style={{fontSize: sizes.fontSize[3]}}>Location</Text>
     <Divider style={{backgroundColor:Colors.light.tint}} />
     <Text style={{fontSize: sizes.fontSize[5]}}>Accra Mall</Text>
     <View style={{width:"100%",height:200,borderRadius:20,backgroundColor:"blue"}}>

     </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
