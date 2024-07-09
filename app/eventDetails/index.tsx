import { sizes } from '@/constants/sizes&fonts'
import { router } from 'expo-router'
import React from 'react'
import { Button, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
  return (
    <SafeAreaView>
<Button title='uuh' onPress={()=> router.back()}></Button>
<ScrollView horizontal={true} style={{    marginVertical: sizes.marginSM,
        maxHeight: 220  }}>

</ScrollView>
    </SafeAreaView>
  )
}
