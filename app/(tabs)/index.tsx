import { Image, StyleSheet, Platform, ScrollView, View,Text, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sizes } from '@/constants/sizes&fonts';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ width: sizes.screenWidth, height: "100%", paddingHorizontal: sizes.marginSM, paddingVertical: sizes.marginSM ,backgroundColor:Colors.light.background }}>
      <View  style={{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
          <View style={{width:50,height:50,backgroundColor:Colors.light.button,borderRadius:50}}></View>
         
        </View>
        <Pressable onPress={()=> router.navigate("/profile")}>
        <Ionicons name="settings-outline" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView horizontal={false} showsHorizontalScrollIndicator={true} style={{width:"100%",marginTop: 40,height:"100%"}} >

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
