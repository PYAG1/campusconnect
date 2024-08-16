import Logo from '@/components/logo';
import { useUserContext } from '@/config/usercontext';
import { Colors } from '@/constants/Colors';
import { sizes } from '@/constants/sizes&fonts';
import { EventData } from '@/constants/Types';
import { EvilIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {

  const [refreshing, setRefreshing] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);

  const { loading,filteredEvents,getYourEvents} = useUserContext();

  useEffect(() => {
 
    getYourEvents();
  }, []);

  const getPendingEvents = async () => {
    setLoadingPending(true);
    await getYourEvents(); 
    setLoadingPending(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getPendingEvents();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <Pressable onPress={() => router.navigate('/profile')}>
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
        <View style={{width: "100%", flexDirection: "column", alignItems: "center"}}>
          {loading || refreshing ? (
            <ActivityIndicator size="large" color={Colors.light.button} />
          ) : filteredEvents.length === 0 ? (
           <View style={styles.eventContainer}>
            <View style={{ width: 100, height: 100, borderRadius: 10, backgroundColor: "#f2f2f3", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Ionicons name="ticket-outline" size={35} color="#bababa" />
            </View>
            <View style={{ paddingHorizontal: sizes.marginSM }}>
              <Text style={{ fontSize: sizes.fontSize[5] + 2, fontWeight: 500 }}>No Events</Text>
              <Text style={{ color: Colors.light.grey }}>Events created and been verified will show here</Text>
            </View>
           </View>
          ) : (
            filteredEvents.map((item: EventData, index: number) => (
              <Pressable
                key={index}
                onPress={() => router.push({
                  pathname: "/eventDetails",
                  params: {
                    eventName: item.eventName,
                    date: item.date,
                    description: item.description,
                    images: item.images,
                    isVerified: item.isVerified as string,
                    location: item.location, 
                    time: item.time,
                  }
                })}
                style={styles.eventContainer}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventName}>{item.eventName}</Text>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                      <Fontisto name="date" size={18} color="black" /> {new Date(item.date).toLocaleDateString('en-GB')}
                    </Text>
                    <Text style={styles.infoText}>
                      <EvilIcons name="location" size={24} color="black" /> {item.location}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))
          )}
        </View>
        <Text style={styles.title}>Pending</Text>
        <View style={{ width: "100%", flexDirection: "column", alignItems: "center" }}>
          {loadingPending ? (
            <ActivityIndicator size="large" color={Colors.light.button} />
          ) : filteredEvents.filter(item => item.isVerified === false).length === 0 ? (
            <View style={styles.eventContainer}>
              <View style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                backgroundColor: "#f2f2f3",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Ionicons name="ticket-outline" size={35} color="#bababa" />
              </View>
              <View style={{ paddingHorizontal: sizes.marginSM }}>
                <Text style={{ fontSize: sizes.fontSize[5] + 2, fontWeight: 500 }}>No Pending Events</Text>
                <Text style={{ color: Colors.light.grey }}>No events are currently pending verification.</Text>
              </View>
            </View>
          ) : (
            filteredEvents.filter(item => item.isVerified === false).map((item: EventData, index: number) => (
              <Pressable
                key={index}
                onPress={() => router.push({
                  pathname: '/eventDetails',
                  params: {
                    eventName: item.eventName,
                    date: item.date,
                    description: item.description,
                    images: item.images,
                    isVerified: item.isVerified as string,
                    location: item.location,
                    time: item.time,
                  }
                })}
                style={styles.eventContainer}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventName}>{item.eventName}</Text>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                      <Fontisto name="date" size={18} color="black" /> {new Date(item.date).toLocaleDateString('en-GB')}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizes.marginSM,
  },
  scrollViewContent: {
    alignItems: "flex-start",
    minHeight: "auto"
  },
  title: {
    fontSize: sizes.fontSize[5] + 5,
    fontWeight: '500',
    marginBottom: sizes.marginSM + 3,
    textAlign: 'left',
  },
  noEventsText: {
    fontSize: sizes.fontSize[4],
    color: 'gray',
    marginTop: sizes.marginSM,
  },
  eventContainer: {
    width: '100%',
    flexDirection: 'row',
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
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  eventName: {
    fontSize: sizes.fontSize[5] + 3,
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'column',
  },
  infoText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pendingText: {
    color: 'black',
    marginTop: sizes.marginSM,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bcc0c5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  badgeIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3f4042',
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    color: 'black',
  },
});
