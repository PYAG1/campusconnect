import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowForward, Back, Edit, Trash } from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";

import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  ActivityIndicator,
  Button,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventRef, storageBucket } from "@/config/firebase";
import { useUserContext } from "@/config/usercontext";
import { CoordinateTypes, EventData, ImageObject } from "@/constants/Types";
import { formatDate } from "@/constants/formatDate";
import { Ionicons } from "@expo/vector-icons";
import openMap from "react-native-open-maps";
import {
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import RBSheet from "react-native-raw-bottom-sheet";
import { deleteObject, ref } from "firebase/storage";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
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

const CategoryDisplay = ({ category }) => {
  const categoryInfo = categoryMapping[category];

  if (!categoryInfo) return null;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {categoryInfo.icon}
      <Text style={{ marginLeft: 5 }}>{categoryInfo.label}</Text>
    </View>
  );
};

export default function Index() {
  const { eventName, time, description, eventID, date, category, createdBy, ...rest } =
    useLocalSearchParams();
  //state variables
  const [event, setEvent] = useState<DocumentData | EventData>();
  const refRBSheet = useRef<any>();
  const [isVisible, setIsVisible] = useState(false);
  const { setLoading, getYourEvents, loading, user } = useUserContext();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [active, setActive] = useState(0);
  //react native bottom tab controller
  //to open bottom tab
  const openBottomSheet = () => {
    setIsVisible(true);
    refRBSheet.current.open();
  };
  //to close bottom tab
  const closeBottomSheet = () => {
    setIsVisible(false);
    refRBSheet.current.close();
  };
  //Event Details Functionality
  const shareEvent = async () => {
    try {
      const result = await Share.share({
        message: `Check out this event: ${eventName}\nDate: ${formatDate(
          time as string
        )}\nDescription: ${description}\nLocation: Accra Mall`,
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
  const EditEvent = () => {
    router.navigate({
      pathname: "/editEvent",
      params: {
        eventID: eventID,
        eventName: eventName,
        description: description,
        location: JSON.stringify(event?.location),
        time: time,
        date: date,
      },
    });
  };

  const deleteEvent = async (eventID: number) => {
    setIsDeleting(true);
    try {
      const q = query(EventRef, where("eventID", "==", eventID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const eventDocRef = doc(EventRef, docSnapshot.id);
          const eventData = docSnapshot.data();

          // Assuming imagePaths is an array of paths stored in the event document
          const imagePaths = eventData.path;

          // Delete images from storage
          if (imagePaths && imagePaths.length > 0) {
            const deleteImagePromises = imagePaths.map((path: string) => {
              const imageRef = ref(storageBucket, path);
              return deleteObject(imageRef)
                .then(() => {
                  console.log(`Deleted image at path: ${path}`);
                })
                .catch((error) => {
                  console.error(
                    `Failed to delete image at path: ${path}`,
                    error
                  );
                });
            });

            await Promise.all(deleteImagePromises);
          }

          // Delete the event document
          await deleteDoc(eventDocRef);
        });

        console.log("Event and associated images deleted successfully.");
        closeBottomSheet();
      } else {
        console.log("No event found with the provided ID.");
      }
    } catch (error) {
      console.error("Error deleting event and images:", error);
    } finally {
      setIsDeleting(false);
      await getYourEvents();
      router.navigate("/(tabs)");
    }
  };

  const options = [
    {
      name: "Edit Event",
      icon: <Edit size="28" color={Colors.light.blue} variant="Bulk" />,
      action: EditEvent,
    },
    {
      name: "Delete Event",
      icon: <Trash size="28" color={Colors.light.blue} variant="Bulk" />,
      action: openBottomSheet,
    },
    {
      name: "Share Event",
      icon: <ArrowForward size="32" color={Colors.light.blue} variant="Bulk" />,
      action: shareEvent,
    },
  ];

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const id = Number(eventID);
      if (isNaN(id)) {
        throw new Error("Invalid eventID. It must be a number.");
      }

      const q = query(EventRef, where("eventID", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const eventData = querySnapshot.docs[0].data();
        setEvent(eventData); // Ensure eventData has the structure you expect
        console.log("fetched", eventData.location);
        if (
          eventData.location?.MapDetails?.lat &&
          eventData.location?.MapDetails?.lng
        ) {
          setMapRegion({
            latitude: eventData.location.MapDetails.lat,
            longitude: eventData.location.MapDetails.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setMapLoaded(true);
        }
      } else {
        console.log("No event found with the provided ID.");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  function changeImage({ nativeEvent }: any) {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  }

  useEffect(() => {
    fetchEvent();
    if (event?.location?.MapDetails?.lat && event?.location?.MapDetails?.lng) {
      setMapRegion({
        latitude: event.location.MapDetails.lat,
        longitude: event.location.MapDetails.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMapLoaded(true);
    }
  }, [eventID]);
console.log("here",createdBy)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: sizes.marginSM }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              position: "absolute",
              padding: sizes.marginSM,
              backgroundColor: "white",
              zIndex: 9999,
              marginLeft: 10,
              marginTop: 10,
              borderRadius: 50,
            }}
          >
            <Back size="24" color="black" />
          </Pressable>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={changeImage}
            showsHorizontalScrollIndicator={false}
            style={{ width: sizes.screenWidth, height: sizes.screenHeight / 3 }}
          >
            {!loading ? (
              event?.images?.map((item: ImageObject, index: number) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: sizes.screenWidth,
                      height: "100%",
                      position: "relative",
                      marginBottom: sizes.marginSM,
                    }}
                  >
                    <Image
                      source={{ uri: item.downloadURL }}
                      style={{
                        width: sizes.screenWidth,
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                    <View
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></View>
                  </View>
                );
              })
            ) : (
              <ImageSkeletonLoader />
            )}
          </ScrollView>

          <View style={styles.dotContainer}>
            {!loading ? (
              event?.images?.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        active === index
                          ? Colors.light.blue
                          : Colors.light.grey,
                    },
                  ]}
                />
              ))
            ) : (
              <Text>.</Text>
            )}
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 15,
              paddingHorizontal: sizes.marginSM,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: Colors.light.button,
                fontSize: sizes.fontSize[5] + 3,
              }}
            >
              {eventName}
            </Text>
            <Text
              style={{
                color: Colors.light.button,
                fontSize: sizes.fontSize[3],
              }}
            >
              {formatDate(time as string)}
            </Text>
            <Text>{description}</Text>
            <View style={{ width: "100%", flexDirection: "row", gap: 20 }}>
             {
              createdBy === user.email && (<>
               <Pressable
                onPress={EditEvent}
                style={{
                  width: 70,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: Colors.light.tint2,
                }}
              >
                <Edit size="28" color={Colors.light.blue} variant="Bulk" />
              </Pressable>
              <Pressable
                onPress={openBottomSheet}
                style={{
                  width: 70,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: Colors.light.tint2,
                }}
              >
                <Trash size="28" color={Colors.light.blue} variant="Bulk" />
              </Pressable></>) 
             }
              <Pressable
                onPress={shareEvent}
                style={{
                  width: 70,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: Colors.light.tint2,
                }}
              >
                <ArrowForward
                  size="32"
                  color={Colors.light.blue}
                  variant="Bulk"
                />
                
              </Pressable>
            </View>
            <Divider style={{ backgroundColor: Colors.light.tint }} />

            <CategoryDisplay category={category} />

            <Divider style={{ backgroundColor: Colors.light.tint }} />
            <Text style={{ fontSize: sizes.fontSize[3] }}>Location</Text>
            <Divider style={{ backgroundColor: Colors.light.tint }} />

            {mapLoaded ? (
              <View style={{ flexDirection: "column", gap: sizes.marginSM }}>
                <Text style={{ fontSize: sizes.fontSize[5], color: "#595959" }}>
                  {event?.location?.description}
                </Text>
                <View
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 20,
                    marginBottom: sizes.marginSM,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      openMap({
                        latitude: event?.location.MapDetails.lat,
                        longitude: event?.location.MapDetails.lng,
                      });
                    }}
                  >
                    <MapView
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20,
                      }}
                      region={mapRegion}
                    >
                      <Marker
                        coordinate={{
                          latitude: event?.location.MapDetails.lat,
                          longitude: event?.location.MapDetails.lng,
                        }}
                      />
                    </MapView>
                  </Pressable>
                </View>
              </View>
            ) : (
              <SkeletonLoader />
            )}
          </View>
        </ScrollView>
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
          customStyles={{
            container: {
              backgroundColor: "transparent",

              height: 280,
            },
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
          customModalProps={{
            animationType: "slide",
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: Colors.light.background,
              borderRadius: 30,
              paddingHorizontal: sizes.marginSM,
              paddingVertical: sizes.marginSM + 5,
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: Colors.light.tint2,
                  borderRadius: 100,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Trash size="28" color={"rgb(248 113 113);"} variant="Bulk" />
              </View>
              <Pressable onPress={closeBottomSheet}>
                <Ionicons name="close-outline" size={24} color="black" />
              </Pressable>
            </View>
            <View>
              <Text
                style={{ fontSize: sizes.fontSize[5] + 2, marginBottom: 8 }}
              >
                Cancel Event?
              </Text>
              <Text style={{ color: Colors.light.tint }}>
                Delete / Cancelling an event cannot be reverted
              </Text>
            </View>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Pressable
                onPress={() => {
                  deleteEvent(event?.eventID);
                }}
                style={{
                  width: "100%",
                  backgroundColor: " rgb(239 68 68)",
                  padding: sizes.marginSM,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isDeleting ? (
                    <ActivityIndicator animating={true} color={"white"} />
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",

                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      Delete
                    </Text>
                  )}
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  closeBottomSheet();
                }}
                style={{
                  width: "100%",
                  backgroundColor: Colors.light.background,
                  borderWidth: 1,
                  padding: sizes.marginSM,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: Colors.light.text, textAlign: "center" }}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </RBSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const SkeletonLoader = () => (
  <MotiView
    transition={{ type: "timing" }}
    style={{
      flex: 1,
      width: "100%",
      justifyContent: "center",
      backgroundColor: "transparent",
      flexDirection: "column",
      gap: 10,
      marginTop: sizes.marginSM + 5,
    }}
    animate={{ backgroundColor: "transparent" }}
  >
    <Skeleton colorMode={"light"} width={"100%"} height={20} />

    <Skeleton colorMode={"light"} radius={20} height={300} width={"100%"} />
  </MotiView>
);

const ImageSkeletonLoader = () => (
  <MotiView
    transition={{ type: "timing" }}
    style={{
      flex: 1,
      width: "100%",
      justifyContent: "center",
      backgroundColor: "transparent",
    }}
    animate={{ backgroundColor: "transparent" }}
  >
    <Skeleton colorMode={"light"} radius={20} height={300} width={"100%"} />
  </MotiView>
);

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: sizes.marginSM,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});
