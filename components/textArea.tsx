import { Colors } from "@/constants/Colors";
import { sizes } from "@/constants/sizes&fonts";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Eye, EyeSlash } from "iconsax-react-native";
import { StyleSheet } from "react-native";

export default function TextAreaComponent({
  label,
  values,
  handleChange,
  handleBlur,
  id,
  errors,
  touched,
  placeholder,
  type = "text",
}: {
  placeholder?: string;
  label?: any;
  values: any;
  handleChange: any;
  handleBlur: any;
  id: string;
  errors?: any;
  touched?: any;
  type?: "password" | "text";
}) {

  const [show, setShow] = React.useState(false);
  return (
    <View style={{ flexDirection: "column", gap: 12, width: "100%", position: "relative" }}>
      {label && (
        <Text style={{ fontSize: sizes.fontSize[3], color: Colors.light.text }}>
          {label}
        </Text>
      )}
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: errors[id] ? "#F44336" : "transparent",
          fontSize: 16,
          borderRadius: 8,
          color: Colors.light.text,
          paddingVertical: 11,
          paddingHorizontal: 16,
          backgroundColor: Colors.light.tint2,
          minHeight: 100, // Adjust the height to make it look like a textarea
          textAlignVertical: "top", // Align text to the top for multiline input
        }}
        multiline
        secureTextEntry={type == "password" && !show}
        placeholder={placeholder}
        value={values[id]}
        onChangeText={handleChange(id)}
        onBlur={handleBlur(id)}
      />
      {type == "password" && (
        <Pressable
          style={[{
            position: "absolute",
            right: sizes.marginSM / 2,
            top: 16,
            height: "60%",
            alignItems: "center",
            justifyContent: "center",
          }]}
          onPress={() => {
            setShow(!show);
          }}
        >
          {show ? (
            <Eye size={24} color={Colors.light.button} />
          ) : (
            <EyeSlash size={24} color={Colors.light.button} />
          )}
        </Pressable>
      )}
      {errors[id] && touched[id] && (
        <Text style={{ color: "#f5564a", marginTop: 5 }}>{errors[id]}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  focusRing: {
    borderWidth: 2,
    borderColor: "blue",
  },
});
