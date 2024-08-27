import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
import {
  Book1,
  Health,
  People,
  Save2,
  SearchStatus,
} from "iconsax-react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "@/config/usercontext";
import { useEffect } from "react";
import { FlatList, Image } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  // Pagination,
} from "react-native-reanimated-carousel";
import React from "react";
import { dateToMonthDay } from "@/utils/helper";
import { Location } from "iconsax-react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { EventData } from "@/constants/Types";

const width = Dimensions.get("window").width;
export default function TabTwoScreen() {
  const { getAllEvents, allEvents } = useUserContext();
  useEffect(() => {
    getAllEvents();
  }, []);

  const ref = React.useRef<ICarouselInstance>(null);
  const categories = [
    "Educational",
    "Career",
    "Music",
    "Food",
    "Sports",
    "Religious",
    "Movies",
    "Political",
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: sizes.marginSM,
        paddingTop: sizes.marginSM,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: sizes.fontSize[5] + 5,
            marginBottom: sizes.marginSM + 5,
          }}
        >
          Explore
        </Text>
      </View>
      <View style={styles.Searchcontainer}>
        <SearchStatus
          size="20"
          color={Colors.light.button}
          style={styles.icon}
        />
        <TextInput placeholder="Search an event" style={styles.input} />
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          {
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        style={[
          {
            marginVertical: 20,
            paddingVertical: 10,
          },
        ]}
      >
        {categories.map((e, i) => {
          return (
            <Pressable
              key={i}
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  // paddingVertical: 10,
                  borderWidth: 1.2,
                  height: 40,
                  borderRadius: 20,
                },
              ]}
            >
              <Text>{e}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
      showsVerticalScrollIndicator={false}
        data={allEvents}
        renderItem={({ item, index }:{item:EventData,index:number}) => {
          return (
            <View
              key={index}
              style={{
                marginBottom: 50,
                borderRadius: 30,
              }}

            >
              <View
                style={[
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    zIndex: 100,
                    left: 20,
                    top: 20,
                    // backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor:"white",
                    padding: 10,
                    borderRadius: 10,
                    gap: 5,
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      color: "black",
                      fontWeight: 300,
                      fontSize: 10,
                    },
                  ]}
                >
                  {dateToMonthDay(item.date).month}
                </Text>
                <Text
                  style={[
                    {
                      color: "black",
                      fontWeight: 900,
                      fontSize: 18,
                    },
                  ]}
                >
                  {dateToMonthDay(item.date).day}
                </Text>
              </View>

              <View
                style={[
                  {
                    position: "absolute",
                    zIndex: 1001,
                    right: 20,
                    top: 20,
                    borderColor: "#000000",
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 25,
                    backgroundColor: "rgba(0, 0,0, 0.2)",
                  },
                ]}
              >
                <Pressable>
                  <Save2 size="22" color="#ffffff" />
                </Pressable>
              </View>
              {item.images?.[0] ? (
                <View>
                  <Carousel
                    ref={ref}
                    width={width - sizes.marginSM * 2}
                    height={300}
                    data={item.images}
                    renderItem={({ index, item }) => {
                      return (
                        <Image
                          source={{ uri: item?.downloadURL as any }}
                          style={{
                            height: 400,
                            objectFit: "cover",
                            borderRadius: 30,
                          }}
                        />
                      );
                    }}
                  />
                </View>
              ) : (
                <View>
                  <Text>No images uploaded</Text>
                </View>
              )}
              <View
                style={[
                  {
                    gap: 10,
                    paddingVertical: 15,
                    borderWidth: 1,
                    borderColor: "#f5f5f5",
                    borderRadius: 30,
                    flexDirection:"row",
                    justifyContent:"space-between"
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      fontSize: 20,
                      fontWeight: 400,
                    },
                  ]}
                >
                  {item.eventName}
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      gap: 5,
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        fontWeight: 200,
                        fontSize: 18,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontWeight: "500",
                        },
                      ]}
                    >
                      HostedBy:{" "}
                    </Text>
                    {item?.hostedBy}
                  </Text>
                </View>
             

              </View>
              <Pressable
                onPress={()=> router.push({
                  pathname: "/eventDetails",
                  params: {
                    eventID: item.eventID,
                    eventName: item.eventName,
                    date: item.date,
                    description: item.description,
                    category:item.category,
                    isVerified: item.isVerified as string,
                    time: item.time,
                    createdBy:item.createdBy
                    
                  },
                })}
                  style={[
                    {
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 15,
                      backgroundColor: "#FF8A65",
                      borderRadius: 25,
                      marginTop: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        color: "#ffffff",
                        fontSize: 18,
                      },
                    ]}
                  >
                    View More
                  </Text>
                </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Searchcontainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.tint2,
    paddingVertical: 7,
    borderRadius: 150,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: "transparent",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
/*         router.push({
                  pathname: "/eventDetails",
                  params: {
                    eventID: item.eventID,
                    eventName: item.eventName,
                    date: item.date,
                    description: item.description,
                    category:item.category,
                    isVerified: item.isVerified as string,
                    time: item.time,
                    createdBy:item.createdBy
                    
                  },
                })*/