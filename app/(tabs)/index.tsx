import Logo from "@/components/logo";
import { useUserContext } from "@/config/usercontext";
import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
import { EventData } from "@/constants/Types";
import { EvilIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { loading, filteredEvents, getYourEvents } = useUserContext();

  useEffect(() => {
    getYourEvents();
    Toast.show({
      type:"customSuccessToast",
      text1:"Welcome to CampusConnect",
      position: "top", 
      visibilityTime: 3000, 
      text1Style:{
        fontSize:sizes.fontSize[5]
      }
    })
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getYourEvents();
    setRefreshing(false);
  };

  const SkeletonLoader = () => (
    <MotiView
      transition={{ type: "timing" }}
      style={[styles.Skeletoncontainer, styles.padded]}
      animate={{ backgroundColor: "#ffffff" }}
    >
      <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
        <Skeleton colorMode={"light"} radius="square" height={75} width={75} />
        <View style={{ width: "100%" }}>
          <Skeleton colorMode={"light"} width={"100%"} height={20} />
          <Spacer height={8} />
          <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
            <Skeleton
              colorMode={"light"}
              radius="square"
              height={10}
              width={15}
            />
            <Skeleton colorMode={"light"} width={"85%"} height={25} />
          </View>
        </View>
      </View>
    </MotiView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <Pressable onPress={() => router.navigate("/profile")}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Events</Text>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading || refreshing ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : filteredEvents.length ||  filteredEvents.filter((item) => item.isVerified === true).length === 0 ? (
            <View style={styles.eventContainer}>
              <View style={styles.noEventsBox}>
                <Ionicons name="ticket-outline" size={35} color="#bababa" />
              </View>
              <View style={styles.noEventsTextContainer}>
                <Text style={styles.noEventsTitle}>No Verified Events</Text>
                <Text style={styles.noEventsSubtitle}>
                  Events created and verified will show here
                </Text>
              </View>
            </View>
          ) : (
            filteredEvents.filter((item) => item.isVerified === true)
            .map((item: EventData, index: number) => (
              <Pressable
                key={index}
                onPress={() =>
                  router.push({
                    pathname: "/eventDetails",
                    params: {
                      eventID: item.eventID,
                      eventName: item.eventName,
                      date: item.date,
                      description: item.description,
                   
                      isVerified: item.isVerified as string,
                      location: item.location,
                      time: item.time,
                    },
                  })
                }
                style={styles.eventContainer}
              >
                <Image
                  source={{ uri: item.images[0].downloadURL}}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventName}>{item.eventName}</Text>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                      <Fontisto name="date" size={18} color="black" />{" "}
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </Text>
                    <Text style={styles.infoText}>
                      <EvilIcons name="location" size={24} color="black" />{" "}
                      {item.location}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))
          )}
        </View>
        <Text style={styles.title}>Pending</Text>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading || refreshing ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : filteredEvents.filter((item) => item.isVerified === false)
              .length === 0 ? (
            <View style={styles.eventContainer}>
              <View style={styles.noEventsBox}>
                <Ionicons name="ticket-outline" size={35} color="#bababa" />
              </View>
              <View style={styles.noEventsTextContainer}>
                <Text style={styles.noEventsTitle}>No Pending Events</Text>
                <Text style={styles.noEventsSubtitle}>
                  No events are currently pending verification.
                </Text>
              </View>
            </View>
          ) : (
            filteredEvents
              .filter((item) => item.isVerified === false)
              .map((item: EventData, index: number) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    router.push({
                      pathname: "/eventDetails",
                      params: {
                        eventID: item.eventID,
                        eventName: item.eventName,
                        date: item.date,
                        description: item.description,
                        isVerified: item.isVerified as string,
                        location: item.location,
                        time: item.time,
                      },
                    })
                  }
                  style={styles.eventContainer}
                >
                  <Image
                    source={{ uri:item.images[0].downloadURL }}
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventName}>{item.eventName}</Text>
                    <View style={styles.infoContainer}>
                      <Text style={styles.infoText}>
                        <Fontisto name="date" size={18} color="black" />{" "}
                        {new Date(item.date).toLocaleDateString("en-GB")}
                      </Text>
                      {item.isVerified === false && (
                        <View style={styles.badge}>
                          <View style={styles.badgeIcon} />
                          <Text style={styles.badgeText}>Not Verified</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.marginSM,
    paddingVertical: sizes.marginSM,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: sizes.marginSM,
  },
  scrollViewContent: {
    alignItems: "flex-start",
    minHeight: "auto",
  },
  title: {
    fontSize: sizes.fontSize[5] + 5,
    fontWeight: "500",
    marginBottom: sizes.marginSM + 3,
    textAlign: "left",
  },
  noEventsBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#f2f2f3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  noEventsTextContainer: {
    paddingHorizontal: sizes.marginSM,
  },
  noEventsTitle: {
    fontSize: sizes.fontSize[5] + 2,
    fontWeight: "500",
  },
  noEventsSubtitle: {
    color: Colors.light.grey,
  },
  eventContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: sizes.marginSM,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  eventDetails: {
    flex: 1,
    padding: sizes.marginSM,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  eventName: {
    fontSize: sizes.fontSize[5] + 3,
    color: "black",
  },
  infoContainer: {
    flexDirection: "column",
  },
  infoText: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bcc0c5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  badgeIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3f4042",
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "black",
  },
  Skeletoncontainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  padded: {
    padding: 16,
  },
});

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

