import { Colors } from '@/constants/Colors'
import { sizes } from '@/constants/sizes&fonts'
import React from 'react'
import { View,Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router'

export default function index() {
  return (
    <SafeAreaView style={{ width: sizes.screenWidth, flex: 1, paddingHorizontal: sizes.marginSM*2,backgroundColor:Colors.light.background }}>
<View style={{width:"100%",backgroundColor:"#efefef",borderRadius:10,padding:20,flexDirection:"column",gap:10}}>
<View style={{ alignItems: "center", marginTop: 20, borderWidth:2,width:50,height:50,flexDirection:"row",justifyContent:"center",borderRadius:50,marginHorizontal:"auto" }}> 
<Feather name="user" size={24} color="black" />
  </View>
  <Text
    style={{
     
      textAlign: "center",
      fontSize: sizes.fontSize[5] + 10,
      paddingHorizontal: sizes.marginSM * 1.5,
     
  
      
    }}
  >
Yaw Gyek
  </Text>
  <Text
      style={{
        width:"100%",
    
        marginTop: 10,
        marginBottom: 15,
    
        fontSize: sizes.fontSize[3],
        textAlign:"center"
      }}
    >
020299
    </Text>
</View>
<Pressable onPress={()=> router.navigate("/notification")} style={{padding:sizes.marginSM}}>
  <Text>Go to sign in</Text>
</Pressable>
        </SafeAreaView>
  )
}
/*          <View  style={{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
          <View style={{width:50,height:50,backgroundColor:Colors.light.button,borderRadius:50}}></View>
          <Text style={{fontSize:sizes.fontSize[5]}}>Yaw Gyekye</Text>
        </View>
   
      </View>*/