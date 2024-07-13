import React, { useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { sizes } from '@/constants/sizes&fonts';
import { Colors } from '@/constants/Colors';

export default function DatePickerComponent({
  label,
  values,
  handleChange,
  handleBlur,
  id,
  errors,
  touched,
  placeholder,
  Datemode
}: {
  placeholder?: string;
  label?: any;
  values: any;
  handleChange: any;
  handleBlur?: any;
  id: string;
  errors: any;
  touched: any;
  Datemode: 'date' | 'time';
}) {
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      handleChange(id)(selectedDate.toISOString());
    }
  };

  const showMode = () => {
    setShow(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB'); // dd-mm-yy format
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false }); // hh-mm-ss format
  };

  return (
    <View style={{ flexDirection: 'column', gap: 12, width: '100%' }}>
      {label && (
        <Text
          style={{
            fontSize: sizes.fontSize[3],
            color: Colors.light.text
          }}
        >
          {label}
        </Text>
      )}
      <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: errors[id] ? '#F44336' : '#ccc',
            fontSize: 16,
            borderRadius: 8,
            color: Colors.light.text,
            paddingVertical: 11,
            paddingHorizontal: 16,
            backgroundColor: Colors.light.tint2,
          }}
          value={
            date
              ? Datemode === 'date'
                ? formatDate(date)
                : formatTime(date)
              : placeholder || 'Not set'
          }
          editable={false}
        />
        <Pressable
          onPress={showMode}
          style={{
            position: 'absolute',
            right: 15,
            justifyContent: 'center',
          }}
        >
          {Datemode === 'date' ? (
            <Fontisto name='date' size={24} color={Colors.light.button} />
          ) : (
            <Ionicons name='time-outline' size={24} color={Colors.light.button} />
          )}
        </Pressable>
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date || new Date()}
          mode={Datemode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
      {errors && touched && touched[id] && errors[id] ? (
        <Text style={{ color: '#f5564a', marginTop: 5 }}>{errors[id]}</Text>
      ) : null}
    </View>
  );
}
