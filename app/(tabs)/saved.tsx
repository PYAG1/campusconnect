import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { sizes } from "@/constants/sizes&fonts";
import { Colors } from "@/constants/Colors";
import { Save2, Location } from "iconsax-react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { dateToMonthDay } from "@/utils/helper";
import Carousel, {
  ICarouselInstance,
  // Pagination,
} from "react-native-reanimated-carousel";
import { router } from "expo-router";
import { useUserContext } from "@/config/usercontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventData } from "@/constants/Types";
import { useFocusEffect } from "@react-navigation/native";

const width = Dimensions.get("window").width;
export default function saved() {
  const [liked, setLiked] = useState<string[]>([]);
  const { getAllEvents, allEvents } = useUserContext();
  useEffect(() => {
    getAllEvents();
  }, []);
  const [list, setList] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem("saved");
          if (value !== null) {
            setLiked(JSON.parse(value));
          }
        } catch (e) {
          console.error("Error reading saved liked posts:", e);
        }
      };
      getData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getAllEvents();
    }, [])
  );
  useEffect(() => {
    async function syncChanges() {
      await AsyncStorage.setItem("saved", JSON.stringify(liked));
    }
    syncChanges();
  }, [liked]);
  const ref = React.useRef<ICarouselInstance>(null);
  return (
    <SafeAreaView
      style={{
        width: sizes.screenWidth,
        flex: 1,
        paddingHorizontal: sizes.marginSM,
        paddingVertical: sizes.marginSM * 3,
        backgroundColor: Colors.light.background,
      }}
    >
      <Text
        style={[
          {
            fontSize: 28,
            fontWeight: 500,
            marginBottom: 20,
          },
        ]}
      >
        Saved
      </Text>
      {/* <GooglePlacesAutocomplete
        placeholder="Search Location"
        onPress={(data, details = null) => {
          console.log(JSON.stringify(data));
          console.log(JSON.stringify(details?.geometry?.location));
        }}
        query={{
          key: `${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`,
          language: "en",
        }}
        textInputProps={{
          style: {
            borderWidth: 1,
            borderColor: "transparent",
            fontSize: 16,
            borderRadius: 8,
            color: Colors.light.text,
            paddingVertical: 11,
            paddingHorizontal: 16,
            backgroundColor: Colors.light.tint2,
            width: "100%",
          },
        }}
        fetchDetails={true}
        onFail={(error) => console.error(error)}
        onNotFound={() => console.log("no results")}
      /> */}
      <FlatList
        key={String(liked)}
        showsVerticalScrollIndicator={false}
        data={allEvents.filter(e => (liked.includes(String(e.eventID))))}
        renderItem={({ item, index }: { item: EventData; index: number }) => {
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
                    backgroundColor: "white",
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
                <Pressable
                  onPress={() => {
                    if (liked.includes(String(item.eventID))) {
                      setLiked((_) => {
                        return _.filter((e) => e != String(item.eventID));
                      });
                    } else {
                      setLiked([...liked, String(item.eventID)]);
                    }
                  }}
                >
                  <Save2
                    size="22"
                    color="#ffffff"
                    variant={
                      liked.includes(String(item.eventID)) ? "Bold" : "Linear"
                    }
                  />
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
                    flexDirection: "row",
                    justifyContent: "space-between",
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
                onPress={() =>
                  router.push({
                    pathname: "/eventDetails",
                    params: {
                      eventID: item.eventID,
                      eventName: item.eventName,
                      date: item.date,
                      description: item.description,
                      category: item.category,
                      isVerified: item.isVerified as string,
                      time: item.time,
                      createdBy: item.createdBy,
                    },
                  })
                }
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
