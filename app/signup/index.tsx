import { sizes } from "@/constants/sizes&fonts";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Formik } from "formik";
import TextInputComponent from "@/components/textinput";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, UserRef } from "@/config/firebase";
import { addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const signUp = async (
    email: string,
    name: string,
    password: string,
    isStudent: boolean,
    student_Id?: string
  ) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential?.user;

      if (user) {
        // Store the name in local storage
        await AsyncStorage.setItem("CamName", name);
        await AsyncStorage.setItem("CamEmail", email);
        // Update the display name
        await updateProfile(user, {
          displayName: name,
        });

        // Add user data to Firestore
        await addDoc(UserRef, {
          id: Math.ceil(Math.random() * 10000000),
          email,
          name,
          isStudent,
          studentId: student_Id || "",
          createdAt: new Date().toISOString(),
        });

        Toast.show({
          type: "customSuccessToast",
          text1: `User registered successfully`,
          position: "top",
          visibilityTime: 3000,
          text1Style: {
            fontSize: sizes.fontSize[5],
          },
        });
        router.push("/(tabs)");
      }
    } catch (error) {
      const err = error as Error;
      Toast.show({
        type: "customErrorToast",
        text1: `${err.message}`,
        position: "top",
        visibilityTime: 3000,
        text1Style: {
          fontSize: sizes.fontSize[5],
        },
      });
    } finally {
      setLoading(false);
    }
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    isStudent: Yup.boolean(),
  });

  return (
    <SafeAreaView
      style={{
        width: sizes.screenWidth,
        flex: 1,
        paddingHorizontal: sizes.marginSM,
        paddingVertical: sizes.marginSM * 3,
        backgroundColor: Colors.light.background,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              borderRadius: 50,
              backgroundColor: Colors.light.tint,
              width: 60,
              height: 60,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fontisto name="email" size={30} color="white" />
          </View>
          <Text
            style={{
              fontSize: sizes.fontSize[5] + 2,
              marginTop: sizes.marginSM,
            }}
          >
            Continue with Email
          </Text>

          <Formik
            initialValues={{
              email: "",
              name: "",
              password: "",
              isStudent: false,
              student_Id: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              await signUp(
                values.email,
                values.name,
                values.password,
                values.isStudent,
                values.student_Id
              );
              resetForm();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              values,
              touched,
              setFieldValue,
            }) => (
              <View
                style={{
                  flexDirection: "column",
                  gap: 12,
                  width: "100%",
                  marginTop: sizes.marginSM,
                }}
              >
                <TextInputComponent
                  label={"Email"}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={"email"}
                  errors={errors}
                  touched={touched}
                />
                <TextInputComponent
                  label={"Username"}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={"name"}
                  errors={errors}
                  touched={touched}
                />
                <TextInputComponent
                  label={"Password"}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={"password"}
                  errors={errors}
                  touched={touched}
                  type="password"
                />

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    color={Colors.light.button}
                    status={values.isStudent ? "checked" : "unchecked"}
                    onPress={() => {
                      setFieldValue("isStudent", !values.isStudent);
                      setIsStudent(!isStudent);
                    }}
                  />
                  <Text>Are you a student?</Text>
                </View>

                {isStudent && (
                  <TextInputComponent
                    label={"Student Id"}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    id={"student_Id"}
                    errors={errors}
                    touched={touched}
                  />
                )}

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Pressable onPress={() => router.push("/signin")}>
                    <Text
                      style={{
                        fontSize: sizes.fontSize[2],
                        textDecorationLine: "underline",
                      }}
                    >
                      I have an account
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderRadius: 15,
                    paddingVertical: 11,
                    paddingHorizontal: 16,
                    backgroundColor: Colors.light.button,
                    marginTop: sizes.marginSM + 5,
                    alignItems: "center", // Center items horizontally
                  }}
                  onPress={() => handleSubmit()}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {loading ? (
                      <ActivityIndicator animating={true} color={"white"} />
                    ) : (
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: sizes.fontSize[5] + 5,
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        {loading ? (  <ActivityIndicator animating={true} color={"white"} />) : "Sign Up"}
                      </Text>
                    )}
                  </View>
                </Pressable>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
