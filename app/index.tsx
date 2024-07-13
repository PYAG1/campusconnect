import { Colors } from '@/constants/Colors'
import { sizes } from '@/constants/sizes&fonts'
import React,{useEffect, useRef, useState} from 'react'
import { View,Text, Pressable, TouchableWithoutFeedback,Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RBSheet from 'react-native-raw-bottom-sheet';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'
import Logo from '@/components/logo'

export default function GetStarted() {
    const refRBSheet = useRef<any>();
    const [isVisible, setIsVisible] = useState(false);

  const openBottomSheet = () => {
    setIsVisible(true);
    refRBSheet.current.open();
  };

  const closeBottomSheet = () => {
    setIsVisible(false);
    refRBSheet.current.close();
  };
  return (
<SafeAreaView style={{width:sizes.screenWidth,flex:1,position:"relative",paddingBottom:sizes.marginSM}}>

<View style={{width:"100%",flexDirection:"column",alignItems:"center",gap:10,paddingHorizontal:sizes.marginSM,position:"absolute",bottom:sizes.marginSM*2}}>
<Text style={{color:Colors.light.tint,fontSize:sizes.fontSize[5]}}>CampusHubConnect</Text>
<Text style={{color:Colors.light.text,fontSize:sizes.fontSize[5]+5}}>Explore Events Around You</Text>
<Pressable  onPress={openBottomSheet} style={{width:"100%",backgroundColor:Colors.light.button,paddingVertical:sizes.marginSM,borderRadius:10,marginTop:sizes.marginSM}}>
    <Text style={{color:Colors.dark.text,fontSize:sizes.fontSize[5],textAlign:"center"}}>
        Get Started
    </Text>
</Pressable>
</View>

<RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        customStyles={{
            container:{
backgroundColor:"transparent",
padding:10,
height:310
            },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)' ,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
<View style={{width:"100%",height:"100%",backgroundColor:Colors.light.background,borderRadius: 30,paddingHorizontal:sizes.marginSM,paddingVertical:sizes.marginSM+5,flexDirection:"column",gap:10}}>
<View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
 <Logo/>
    <Pressable onPress={closeBottomSheet}>
    <Ionicons name="close-outline" size={24} color="black" />
    </Pressable>
</View>
<View>
    <Text style={{fontSize:sizes.fontSize[5]+2,marginBottom:8}}>Get Started</Text>
    <Text style={{color:Colors.light.tint}}>Stay updated with events happening on campus with the click on a button</Text>

</View>
<View style={{flexDirection:"column",gap:10}}>
    <Pressable onPress={()=> {
        closeBottomSheet()
        router.navigate("/signup")
        
    }} style={{width:"100%",backgroundColor:Colors.dark.background,padding:sizes.marginSM,borderRadius:10}}>
        <Text style={{color:Colors.dark.text,textAlign:"center"}}>Sign Up</Text>
    </Pressable>
    <Pressable onPress={()=> {
        closeBottomSheet()
        router.navigate("/signin")
        
    }}  style={{width:"100%",backgroundColor:Colors.light.background,borderWidth:1,padding:sizes.marginSM,borderRadius:10}}>
    <Text style={{color:Colors.light.text,textAlign:"center"}}>Sign In</Text>
    </Pressable>
</View>
</View>
      </RBSheet>
</SafeAreaView>
  )
}
