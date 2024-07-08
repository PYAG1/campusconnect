import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Text} from "react-native"
import { sizes } from '@/constants/sizes&fonts'
import { Colors } from '@/constants/Colors'

export default function saved() {
  return (
    <SafeAreaView style={{ width: sizes.screenWidth, flex: 1, paddingHorizontal: sizes.marginSM, paddingVertical: sizes.marginSM * 3,backgroundColor:Colors.light.background }}>
    <Text>Saved</Text>
  </SafeAreaView>
  )
}
