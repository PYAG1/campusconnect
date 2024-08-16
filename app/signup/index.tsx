import { sizes } from '@/constants/sizes&fonts';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { Formik } from 'formik';
import TextInputComponent from '@/components/textinput';
import { ActivityIndicator, Checkbox } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, UserRef } from '@/config/firebase';
import { addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const signUp = async (email:string,name:string,password:string,isStudent:boolean,student_Id?:string)=>{
    
  setLoading(true)
  try {
  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential?.user;

    if (user) {
      await AsyncStorage.setItem("CamEmail", email);
      await addDoc(UserRef, {
        id:Math.random()*10000000,
        email,
        name,
        isStudent,
        studentId: student_Id || "",
        createdAt: new Date().toISOString()
      });
      console.log('User registered successfully');
      router.push("/(tabs)");
    }
  } catch (error) {
    const err = error as Error;

    console.error( err.message);
  } finally {
    setLoading(false);
  }
  }
  return (
    <SafeAreaView style={{ width: sizes.screenWidth, flex: 1, paddingHorizontal: sizes.marginSM, paddingVertical: sizes.marginSM * 3,backgroundColor:Colors.light.background }}>
      <View style={{ borderRadius: 50, backgroundColor: Colors.light.tint, width: 60, height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Fontisto name="email" size={30} color="white" />
      </View>
      <Text style={{ fontSize: sizes.fontSize[5] + 2, marginTop: sizes.marginSM }}>Continue with Email</Text>

      <Formik
        initialValues={{
          email: '',
          name:"",
          password: '',
          isStudent: false,
          student_Id: '',
        }}
        onSubmit={async (values, { resetForm }) => {
     signUp(values.email,values.name,values.password,values.isStudent,values.student_Id)
    resetForm()
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
          <View style={{ flexDirection: 'column', gap: 12, width: '100%',marginTop:sizes.marginSM }}>
            <TextInputComponent
              label={'Email'}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'email'}
              errors={errors}
              touched={touched}
            />
                     <TextInputComponent
              label={'Name'}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'name'}
              errors={errors}
              touched={touched}
            />
            <TextInputComponent
              label={'Password'}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'password'}
              errors={errors}
              touched={touched}
              type="password"
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
    
       color={Colors.light.button}
                status={values.isStudent ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFieldValue('isStudent', !values.isStudent);
                  setIsStudent(!isStudent);
                }}
                
              />
              <Text>Are you a student?</Text>
            </View>

            {isStudent && (
              <TextInputComponent
                label={'Index Number'}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                id={'indexNumber'}
                errors={errors}
                touched={touched}
              />
            )}

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Pressable onPress={() => router.push('/signin')}>
                <Text style={{ fontSize: sizes.fontSize[2], textDecorationLine:"underline" }}>
                  I have an account
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={{
                width: '100%',
                borderWidth: 1,
                borderRadius: 15,
                paddingVertical: 11,
                paddingHorizontal: 16,
                backgroundColor: Colors.light.button,
                marginTop: sizes.marginSM + 5,
                alignItems: 'center', // Center items horizontally
              }}
              onPress={() => handleSubmit()}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (
                  <ActivityIndicator animating={true} color={"white"} />
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: sizes.fontSize[5] + 5,
                      fontWeight: '600',
                      color: 'white',
                    }}
                  >
                  {
                    loading ? "loading" : "Sign Up"
                  }
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
