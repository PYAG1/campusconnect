import React, { useState } from 'react';
import { Button, Text, Image, ScrollView, TouchableOpacity, StyleSheet, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import { sizes } from '@/constants/sizes&fonts';
import { AddCircle, DocumentUpload } from 'iconsax-react-native';
import { Formik } from 'formik';
import TextInputComponent from '@/components/textinput';
import DatePickerComponent from '@/components/datepicker';
import TextAreaComponent from '@/components/textArea';

export default function Create() {
    const [selectedImages, setSelectedImages] = useState<any>([]);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            selectionLimit: 0,  // 0 means no limit
        });

        if (!result.canceled) {
            const newImages = result.assets.map(asset => asset.uri);
            setSelectedImages([...selectedImages, ...newImages]);
        } else {
            alert('You did not select any image.');
        }
    };

    const removeImage = (uri:any) => {
        setSelectedImages(selectedImages.filter(image => image !== uri));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create Event</Text>
            <ScrollView style={{height:"100%"}} showsVerticalScrollIndicator={false}>
            <View>
            <ScrollView horizontal={true} style={styles.scrollView}>
                {selectedImages.length > 0 ? (
                    selectedImages.map((imageUri, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image source={{ uri: imageUri }} style={styles.image} />
                            <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(imageUri)}>
                                <Text style={styles.removeButtonText}>X</Text>
                            </TouchableOpacity>
                            {
                                index === 0 && (
                                    <TouchableOpacity onPress={pickImageAsync} style={{position:"absolute",bottom:5,right:5,borderRadius:50,backgroundColor:Colors.light.button,padding:8,flexDirection:"row",justifyContent:"center"}}>
                                    <AddCircle size="22" color="white"/>
                             
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    ))
                ) : (
                    <View style={styles.noImageContainer}>
                        <Text style={styles.noImageText}>No image selected</Text>
                        <TouchableOpacity onPress={pickImageAsync} style={{position:"absolute",bottom:5,right:5,borderRadius:50,backgroundColor:Colors.light.button,padding:8,flexDirection:"row",justifyContent:"center"}}>
        <AddCircle size="22" color="white"/>
 
        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
     
        </View>
        <Formik
        initialValues={{
      eventName:"",
      description:"",
      date:"",
      time:"",
      location:"",
      
        }}
        onSubmit={async (values) => {
          console.log(values);
          // router.push("/home");
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
          <View style={{ flexDirection: 'column', gap: 12, width: '100%',marginTop:sizes.marginSM,paddingVertical:sizes.marginSM }}>
            <TextInputComponent
         placeholder='Event name'
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'eventName'}
              errors={errors}
              touched={touched}
            />
           <TextAreaComponent
 label={"Description"}
         placeholder='Enter description'
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'description'}
              errors={errors}
              touched={touched}
            />
            <TextInputComponent
 label={"Location"}
         placeholder='Location'
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'location'}
              errors={errors}
              touched={touched}
            />
     <DatePickerComponent
                  values={values}
                  label={"Date"}
                  id={"date"}
                  handleChange={handleChange}
                  touched={touched}
                  Datemode={"date"}
                  errors={errors}
                />

<DatePickerComponent
                  values={values}
                  label={"Time"}
                  id={"time"}
                  handleChange={handleChange}
                  touched={touched}
                  Datemode={"time"}
                  errors={errors}
                />


       
   
                <Pressable style={{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:Colors.light.button,paddingVertical:sizes.marginSM,borderRadius:10}}>
            <Text style={{color:"white"}}> Submit</Text>
          </Pressable>

          </View>
 
        )}
      </Formik>
      </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: sizes.screenWidth,
     
        paddingHorizontal: sizes.marginSM,
        paddingVertical: sizes.marginSM ,
        backgroundColor: Colors.light.background,
    },
    title: {
        fontSize: sizes.fontSize[5] + 5,
    },
    scrollView: {
        marginVertical: sizes.marginSM,
        maxHeight: 220,  // Adjust the max height as needed
    },
    imageContainer: {
        position: 'relative',
        marginRight: sizes.marginSM,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,      backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: 'white',
        fontSize: 12,
    },
    noImageContainer: {
        width: 200,
        height: 200,
        backgroundColor: '#ededed',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position:"relative"
    },
    noImageText: {
        color: 'black',
    },
});
