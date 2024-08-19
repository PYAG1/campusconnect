import { Colors } from '@/constants/Colors';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, Text } from 'react-native';

const GooglePlacesInput = ({
  label,
  setFieldValue,
  id,
  errors,
  touched,
  values,
}: {
  label?: string;
  setFieldValue: any;
  id: string;
  errors: any;
  touched: any;
  values: any;
}) => {
  return (
    <View style={{ flexDirection: 'column', gap: 12, width: '100%' }}>
      {label && (
        <Text style={{ fontSize: 16, color: Colors.light.text }}>
          {label}
        </Text>
      )}
      <GooglePlacesAutocomplete
        placeholder="Search Location"
        onPress={(data, details = null) => {
          setFieldValue(id, data.description);
        }}
        query={{
          key: `${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`,
          language: 'en',
        }}
        textInputProps={{
          value: values[id], // Directly use Formik's value
          onChangeText: (text) => {
            setFieldValue(id, text); // Directly update Formik's state
          },
          style: {
            borderWidth: 1,
            borderColor: errors[id] && touched[id] ? "#F44336" : "transparent",
            fontSize: 16,
            borderRadius: 8,
            color: Colors.light.text,
            paddingVertical: 11,
            paddingHorizontal: 16,
            backgroundColor: Colors.light.tint2,
            width:"100%"
          },
        }}
      />
      {errors[id] && touched[id] && (
        <Text style={{ color: "#f5564a", marginTop: 5 }}>{errors[id]}</Text>
      )}
    </View>
  );
};

export default GooglePlacesInput;
