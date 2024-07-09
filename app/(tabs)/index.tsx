import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Logo from '@/components/logo';
import { Colors } from '@/constants/Colors';
import { sizes } from '@/constants/sizes&fonts';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
export default function HomeScreen() {
  return (
    <SafeAreaView style={{ width: sizes.screenWidth, height: "100%", paddingHorizontal: sizes.marginSM, paddingVertical: sizes.marginSM ,backgroundColor:Colors.light.background }}>
      <View  style={{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
    <Logo/>
       
        </View>
        <Pressable onPress={()=> router.navigate("/profile")}>
        <Ionicons name="settings-outline" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView horizontal={false} showsHorizontalScrollIndicator={true} style={{width:"100%",marginTop: 40,height:"100%"}} >
<Text style={{fontSize:sizes.fontSize[5]+5,fontWeight:"500",marginBottom:sizes.marginSM+3}}>Your Events</Text>

<View style={{width:"100%",flexDirection:"row"}}>
<View style={{width:100,height:100,backgroundColor:"black",borderRadius:10}}>

</View>
<Pressable onPress={()=> router.navigate("/eventDetails")} style={{padding:sizes.marginSM,flexDirection:"column",gap:1,alignItems:"flex-start"}}>
<Text style={{fontSize:sizes.fontSize[5]+3,color:"black"}}>Afro</Text>


<View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
<Text style={{flexDirection:"row",alignItems:"center"}}><Fontisto name="date" size={18} color="black" />  Tomorrow</Text>
<Text style={{flexDirection:"row",alignItems:"center"}}><EvilIcons name="location" size={24} color="black" />Accra Mall</Text>
</View>
</Pressable>
<View>

</View>
</View>
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
