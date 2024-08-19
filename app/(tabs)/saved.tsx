import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Text} from "react-native"
import { sizes } from '@/constants/sizes&fonts'
import { Colors } from '@/constants/Colors'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function saved() {
  return (
    <SafeAreaView style={{ width: sizes.screenWidth, flex: 1, paddingHorizontal: sizes.marginSM, paddingVertical: sizes.marginSM * 3,backgroundColor:Colors.light.background }}>
<GooglePlacesAutocomplete

placeholder="Search Location"

onPress={(data, details = null) => {
console.log(JSON.stringify(data))
console.log(JSON.stringify(details?.geometry?.location))
}}
query={{
  key: `${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  language: 'en',
}}

textInputProps={{


  style: {
    borderWidth: 1,
    borderColor: "transparent",
    fontSize: 16,
    borderRadius: 8,
    color: Colors.light.text,
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.tint2,
    width: "100%",
  },
}}
fetchDetails={true}
onFail={error => console.error(error)}
onNotFound={() => console.log('no results')}
/>
  </SafeAreaView>
  )
}
