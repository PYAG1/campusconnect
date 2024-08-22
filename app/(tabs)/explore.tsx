import { Dimensions, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
import { Book1, Health, People, SearchStatus } from "iconsax-react-native";
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

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;
export default function TabTwoScreen() {
  const { getAllEvents, allEvents } = useUserContext();
  useEffect(() => {
    getAllEvents();
  }, []);

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const eventCategories = [
    {
      icon: <Book1 size="32" color="#FF8A65" />,
      title: "Academic & Career Development",
    },
    {
      icon: <People size="32" color="#FF8A65" />,
      title: "Social & Extracurricular Activities",
    },
    { icon: <Health size="32" color="#FF8A65" />, title: "Health & Wellness" },
    { icon: "", title: "Cultural Events" },
    { icon: "", title: "Community Service" },
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
      <FlatList
        data={allEvents}
        renderItem={({ item, index }) => {
          console.log(item.images);
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
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    // backgroundColor: "rgba(0, 0,0, 0.2)",
                    padding: 10,
                    borderRadius: 10,
                    gap: 5,
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      color: "#fff",
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
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: 18,
                    },
                  ]}
                >
                  {dateToMonthDay(item.date).day}
                </Text>
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
              <View>
                <Text>{item.eventName}</Text>
                <View>
                  <Location size="16" variant="Bold" color="#000000" />
                  <Text>{item.location?.description}</Text>
                </View>
              </View>
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
