import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
import { Book1, Health, People, SearchStatus } from "iconsax-react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "@/config/usercontext";
import { useEffect } from "react";

export default function TabTwoScreen() {
  const {getAllEvents,allEvents}= useUserContext()
  useEffect(()=>{
    getAllEvents()
  },[])
  console.log(allEvents)

  const eventCategories = [
    { icon: <Book1
      size="32"
      color="#FF8A65"
     />, title: "Academic & Career Development" },
    { icon: <People
      size="32"
      color="#FF8A65"
     />, title: "Social & Extracurricular Activities" },
    { icon: <Health
      size="32"
      color="#FF8A65"
     />, title: "Health & Wellness" },
    { icon: "", title: "Cultural Events" },
    { icon: "", title: "Community Service" },

  ];
  
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: sizes.marginSM,paddingTop:sizes.marginSM }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: sizes.fontSize[5] + 5,marginBottom:sizes.marginSM+5 }}>Explore</Text>
      </View>
      <View style={styles.Searchcontainer}>
        <SearchStatus
          size="20"
          color={Colors.light.button}
          style={styles.icon}
        />
        <TextInput placeholder="Search an event" style={styles.input} />
      </View>
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
