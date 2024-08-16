import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
import { router, useLocalSearchParams } from "expo-router";
import { Edit, Size, Trash ,Shar, ArrowForward} from "iconsax-react-native";
import React, { useState } from "react";
import { Button, ScrollView, View, Text, Share, Pressable } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import MapView from 'react-native-maps';
import { EventData } from "@/constants/Types";
import { formatDate } from "@/constants/formatDate";

export default function Index() {
  const { eventName, time, description } = useLocalSearchParams();
 
  const shareEvent = async () => {
    try {
      const result = await Share.share({
        message: `Check out this event: ${eventName}\nDate: ${formatDate(time as string)}\nDescription: ${description}\nLocation: Accra Mall`,
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      const err = error as Error;

      alert(err.message);
    }
  };
  const [active, setActive] = useState(0);
  function changeImage({ nativeEvent }: any) {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  }

  const options = [
    {
      name: "Edit Event",
      icon: <Edit size="28" color={Colors.light.blue}  variant="Bulk" />,
    },
    {
      name: "Delete Event",
      icon: <Trash size="28" color={Colors.light.blue}  variant="Bulk" />,
    },
    {
      name: "Share Event",
      icon:<ArrowForward size="32" color={Colors.light.blue}   variant="Bulk"/>,
      action: shareEvent,
    },
  ];
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="Back" onPress={() => router.back()}></Button>
      <ScrollView
        style={{
          marginVertical: sizes.marginSM,
          paddingHorizontal: sizes.marginSM,
        }}
        contentContainerStyle={{ paddingBottom: sizes.marginSM }}
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

<ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ width: sizes.screenWidth }}
          onScroll={changeImage}
        >
       
        </ScrollView>
        <View style={{ flexDirection: "column", gap: 15 }}>
          <Text
            style={{
              color: Colors.light.button,
              fontSize: sizes.fontSize[5] + 3,
            }}
          >
            {eventName}
          </Text>
          <Text
            style={{ color: Colors.light.button, fontSize: sizes.fontSize[3] }}
          >
            {formatDate(time as string)}
          </Text>
          <Text>{description}</Text>
          <View style={{ width: "100%", flexDirection: "row", gap: 20 }}>
            {options?.map((item, index) => (
              <Pressable onPress={item.action} key={index} style={{ width: 70, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 60, borderRadius: 10, backgroundColor:Colors.light.tint2 }}>
                {item.icon}
              </Pressable>
            ))}
          </View>

          <Text style={{ fontSize: sizes.fontSize[3] }}>Location</Text>
          <Divider style={{ backgroundColor: Colors.light.tint }} />
          <Text style={{ fontSize: sizes.fontSize[5] }}>Accra Mall</Text>
          <View style={{ width: "100%", height: 200, borderRadius: 20, marginBottom: sizes.marginSM }}>
            <MapView
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
