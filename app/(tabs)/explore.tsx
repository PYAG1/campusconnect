import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
import { Save2, SearchStatus } from "iconsax-react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "@/config/usercontext";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import React from "react";
import { dateToMonthDay } from "@/utils/helper";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { EventData } from "@/constants/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const categoryMapping = {
  "Academic Event": {
    icon: <MaterialIcons name="my-library-books" size={24} color="black" />,
    label: "Academic Event",
  },
  "Cultural Event": {
    icon: <Entypo name="hour-glass" size={24} color="black" />,
    label: "Cultural Event",
  },
  "Social Event": {
    icon: <Ionicons name="people-circle-outline" size={24} color="black" />,
    label: "Social Event",
  },
  "Sports & Recreation Event": {
    icon: <MaterialIcons name="sports-gymnastics" size={24} color="black" />,
    label: "Sports & Recreation",
  },
  "Career Event": {
    icon: <MaterialIcons name="work-outline" size={24} color="black" />,
    label: "Career Event",
  },
  "Health & Wellness Event": {
    icon: <MaterialIcons name="health-and-safety" size={24} color="black" />,
    label: "Health & Wellness Event",
  },
  "Religious Event": {
    icon: <MaterialIcons name="church" size={24} color="black" />,
    label: "Religious Event",
  },
};
const width = Dimensions.get("window").width;

const CategoryDisplay = ({ category }) => {
  const categoryInfo = categoryMapping[category];

  if (!categoryInfo) return null;

  return (
    <View style={{ flexDirection: "row", alignItems: "center",borderWidth:1,borderColor:Colors.light.background,padding:sizes.marginSM,borderRadius:100,backgroundColor:Colors.light.background }}>
      {categoryInfo.icon}
      
    </View>
  );
};
export default function TabTwoScreen() {
  const { getAllEvents, allEvents } = useUserContext();
  const [liked, setLiked] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);

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
    const syncChanges = async () => {
      try {
        await AsyncStorage.setItem("saved", JSON.stringify(liked));
      } catch (e) {
        console.error("Error saving liked posts:", e);
      }
    };

    // Debounce saving to avoid too frequent updates
    const timeout = setTimeout(syncChanges, 500);

    return () => clearTimeout(timeout);
  }, [liked]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allEvents.filter(event =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.hostedBy?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(allEvents);
    }
  }, [searchQuery, allEvents]);
  
  const ref = React.useRef<ICarouselInstance>(null);

  const handleLike = (eventID: string) => {
    setLiked((prevLiked) => {
      if (prevLiked.includes(eventID)) {
        return prevLiked.filter((id) => id !== eventID);
      } else {
        return [...prevLiked, eventID];
      }
    });
  };

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
        backgroundColor:Colors.light.background
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
        <TextInput placeholder="Search an event" style={styles.input}  value={searchQuery}
  onChangeText={text => setSearchQuery(text)} />
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
        {categories.map((e, i) => (
          <Pressable
            key={i}
            style={[
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
                borderWidth: 1.2,
                height: 40,
                borderRadius: 20,
              },
            ]}
          >
            <Text>{e}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {filteredEvents.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredEvents}
            renderItem={({ item, index }: { item: EventData; index: number }) => (
              <View
                key={index}
                style={{
                  marginBottom: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: "#f5f5f5",
                  backgroundColor:Colors.light.tint2
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

                <Pressable onPress={() => handleLike(String(item.eventID))}
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
            
                    <Save2
                      size="22"
                      color="#ffffff"
                      variant={
                        liked.includes(String(item.eventID)) ? "Bold" : "Linear"
                      }
                    />
             
                </Pressable>

                {item.images?.[0] ? (
                  <View>
                    <Carousel
                      ref={ref}
                      width={width - sizes.marginSM * 2}
                      height={300}
                      data={item.images}
                      renderItem={({ index, item }) => (
                        <Image
                          source={{ uri: item?.downloadURL as any }}
                          style={{
                            height: 400,
                            objectFit: "cover",
                            borderRadius: 30,
                          }}
                        />
                      )}
                    />
                  </View>
                ) : (
                  <View>
                    <Text>No images uploaded</Text>
                  </View>
                )}

                <View
                style={{paddingBottom:15}}
                >
              <View  style={[
                    {
                      gap: 10,
                      padding: 15,
              
                   
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                  ]}>
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
                  <View style={{flexDirection:"row",alignContent:"center",justifyContent:"space-between",paddingHorizontal:15}}>
  
                  <CategoryDisplay category={item?.category} />
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
                     
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 15,
                      backgroundColor: "#FF8A65",
                      width:200,
                      borderRadius: 25,
            
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        color: "white",
                        fontWeight: 300,
                      },
                    ]}
                  >
                    View Details
                  </Text>
                </Pressable>
</View>
                </View>

              </View>
            )}
            keyExtractor={(item) => item.eventID.toString()}
          />
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No events found</Text>
          </View>
        )}
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
  noEventsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noEventsText: {
    fontSize: sizes.fontSize[5],
    color: Colors.light.button,
  },
});
