import { sizes } from "@/constants/sizes&fonts";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Formik } from "formik";
import TextInputComponent from "@/components/textinput";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "@/config/usercontext";

export default function Index() {
  const [loading, setLoading] = useState(false);
const {fetchData}= useUserContext()

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential?.user;

      if (user) {
        await AsyncStorage.setItem("CamEmail", email);
        await AsyncStorage.setItem("CamName", user.displayName);

        console.log("User signed in successfully");
        fetchData()
        router.push({ pathname: "/(tabs)" });
      }
    } catch (error) {
      const err = error as Error;

      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView
      style={{
        width: sizes.screenWidth,
        flex: 1,
        paddingHorizontal: sizes.marginSM,
        paddingVertical: sizes.marginSM * 3,
      }}
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
        style={{ fontSize: sizes.fontSize[5] + 2, marginTop: sizes.marginSM }}
      >
        Continue with Email
      </Text>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          await signIn(values.email,values.password)
          router.push("/(tabs)/explore");
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
              label={"Password"}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={"password"}
              errors={errors}
              touched={touched}
              type="password"
            />

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Pressable onPress={() => router.push("/signup")}>
                <Text
                  style={{
                    fontSize: sizes.fontSize[2],
                    textDecorationLine: "underline",
                  }}
                >
                  I don't have an account
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
                    Sign in
                  </Text>
                )}
              </View>
            </Pressable>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
