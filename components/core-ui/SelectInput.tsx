import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
export default function SelectComponent({
  label,
  data,
  values,
  handleChange,

  id,
  errors,
  touched,
}: {
  label: any;
  values: any;
  handleChange: any;

  id: string;
  data: Array<any>;
  errors?: any;
  touched?: any;
}) {
  return (
    <View style={{ flexDirection: "column", gap: 12, width: "100%" }}>
      <Text
        style={{
          fontSize: sizes.fontSize[3],
          color: Colors.light.text,
        }}
      >
        {label}
      </Text>
      <SelectList
        setSelected={(val: any) => handleChange(id)(val)}
        data={data}
        save="value"
        // onBlur={() => handleBlur(id)}
        boxStyles={{
          backgroundColor: Colors.light.tint2,
          borderColor: errors[id] && touched[id] ? "#F44336" : "transparent",
        }}
        inputStyles={{ color: Colors.light.text }}
        dropdownStyles={{ backgroundColor: Colors.light.tint2 }}
        dropdownTextStyles={{ color: Colors.light.text }}
        search={false}
        arrowicon={
          <Ionicons name="chevron-down-outline" size={24} color={Colors.light.text} />
        }
        defaultOption={{ key: "", value: values[id] }}
      />
      {touched && touched[id] && errors && errors[id] ? (
        <Text style={{ color: "#f5564a", marginTop: 5 }}>{errors[id]}</Text>
      ) : null}
    </View>
  );
}
