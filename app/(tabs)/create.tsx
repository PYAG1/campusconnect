import SelectComponent from "@/components/core-ui/SelectInput";
import DatePickerComponent from "@/components/datepicker";
import TextAreaComponent from "@/components/textArea";
import TextInputComponent from "@/components/textinput";
import { EventRef, storageBucket } from "@/config/firebase";
import { useUserContext } from "@/config/usercontext";
import { Colors } from "@/constants/Colors";
import { campusEventCategories } from "@/constants/EventData";
import { sizes } from "@/constants/sizes&fonts";
import { ImageObject, MapData } from "@/constants/Types";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Formik } from "formik";
import { AddCircle, Map1 } from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GooglePlacesAutocomplete
} from "react-native-google-places-autocomplete";
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function Create() {
  const { user, fetchData, getYourEvents } = useUserContext();
  useEffect(() => {
    fetchData();
  }, []);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      selectionLimit: 0, // 0 means no limit
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setSelectedImages([...selectedImages, ...newImages]);
    } else {
      alert("You did not select any image.");
    }
  };

  const removeImage = (uri) => {
    setSelectedImages(selectedImages.filter((image) => image !== uri));
  };

  const uploadImages = async () => {
    if (!selectedImages || selectedImages.length === 0) return;

    const uploadPromises = selectedImages.map(async (image) => {
      try {
        const response = await fetch(image);
        const blob = await response.blob();

        const filename = image.substring(image.lastIndexOf("/") + 1);
        const storageRef = ref(storageBucket, `images/${filename}`);
        const path = `images/${filename}`;

        const uploadTask = uploadBytesResumable(storageRef, blob);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done for ${filename}`);
            },
            (error) => {
              console.error("Error uploading image:", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log(`File available at ${downloadURL}`);

              // Return an object containing both the downloadURL and path
              resolve({ downloadURL, path });
            }
          );
        });
      } catch (error) {
        console.error("Error fetching image:", error);
        throw error;
      }
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      console.log("All images uploaded successfully:", downloadURLs);
      // Store downloadURLs in database, etc.
      return downloadURLs;
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const eventSchema = Yup.object().shape({
    eventName: Yup.string().required("Event name is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.object().required("Location is required").nullable(),
    date: Yup.date()
      .required("Date is required")
      .min(new Date(), "Date cannot be in the past"),
    time: Yup.string().required("Time is required"),
    category:Yup.string().required("Category is required"),
  });

  const createEvent = async (data) => {
    if (selectedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }
    setLoading(true);
    try {
      const images = (await uploadImages()) as unknown as ImageObject;
      if (images) {
        await addDoc(EventRef, {
          ...data,
          images: images,
          createdAt: new Date().toISOString(),
          createdBy: user.email,
          isVerified: false,
          hostedBy:user.username,
          savedBy: [],
          eventID: Math.ceil(Math.random() * 1000000000),
        });
        Toast.show({
          type: "customSuccessToast",
          text1: `Event created`,
          position: "top",
          visibilityTime: 3000,
          text1Style: {
            fontSize: sizes.fontSize[5],
          },
        });
      }
      setSelectedImages([]);
 
    } catch (error) {
      Toast.show({
        type: "customErrorToast",
        text1: `Failed to create event`,
        position: "top",
        visibilityTime: 3000,
        text1Style: {
          fontSize: sizes.fontSize[5],
        },
      });
    } finally {
      setLoading(false);
      await getYourEvents();
    }
  };
  const refRBSheet = useRef<any>();
  const [isVisible, setIsVisible] = useState(false);

  //to open bottom tab
  const openBottomSheet = () => {
    setIsVisible(true);
    refRBSheet.current.open();
  };
  //to close bottom tab
  const closeBottomSheet = () => {
    setIsVisible(false);
    refRBSheet.current.close();
  };

  const [location, setLocation] = useState<MapData | undefined>();

  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Event</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10} // Adjust this value as needed
      >
        <ScrollView
          style={{ height: "100%", paddingVertical: sizes.marginSM + 5 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <ScrollView horizontal={true} style={styles.scrollView}>
              {selectedImages.length > 0 ? (
                selectedImages.map((imageUri, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeImage(imageUri)}
                    >
                      <Text style={styles.removeButtonText}>X</Text>
                    </TouchableOpacity>
                    {index === 0 && (
                      <TouchableOpacity
                        onPress={pickImageAsync}
                        style={{
                          position: "absolute",
                          bottom: 5,
                          right: 5,
                          borderRadius: 50,
                          backgroundColor: Colors.light.button,
                          padding: 8,
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <AddCircle size="22" color="white" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))
              ) : (
                <View style={styles.noImageContainer}>
                  <Text style={styles.noImageText}>No image selected</Text>
                  <TouchableOpacity
                    onPress={pickImageAsync}
                    style={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      borderRadius: 50,
                      backgroundColor: Colors.light.button,
                      padding: 8,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <AddCircle size="22" color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
          <Formik
            initialValues={{
              eventName: "",
              description: "",
              date: "",
              time: "",
              category:"",
              location: undefined || {
                description: "",
                MapDetails: undefined,
              },
            }}
            validationSchema={eventSchema}
            onSubmit={async (values, { resetForm }) => {
              if (!location) {
                alert("Please select a location.");
                return;
              }

              values.location = location;
              console.log("new", values);
              await createEvent(values);
              setSelectedImages([]);
              resetForm();
             setLocation(undefined)
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
                  paddingVertical: sizes.marginSM * 1.5,
                }}
              >
                <TextInputComponent
                  placeholder="Event name"
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={"eventName"}
                  errors={errors}
                  touched={touched}
                />
                <TextAreaComponent
                  label={"Description"}
                  placeholder="Enter description"
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  id={"description"}
                  errors={errors}
                  touched={touched}
                />
          <SelectComponent
                  label={"Event Category"}
                  values={values}
                  handleChange={handleChange}
           
                  id={"category"}
                  touched={touched}
                  data={campusEventCategories}
                  errors={errors}
                />

                <View
                  style={{
                    flexDirection: "column",
                    gap: 12,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Text
                    style={{
                      fontSize: sizes.fontSize[3],
                      color: Colors.light.text,
                    }}
                  >
                    Location
                  </Text>
                  <View style={{ position: "relative" }}>
                    <TextInput
                      readOnly
                      placeholder="Select and event"
                      value={location?.description}
                      style={{
                        borderWidth: 1,
                        borderColor:
                          errors["location"] && touched["location"]
                            ? "#F44336"
                            : "transparent",
                        fontSize: 16,
                        borderRadius: 8,
                        color: Colors.light.text,
                        paddingVertical: 11,
                        paddingHorizontal: 16,
                        backgroundColor: Colors.light.tint2,
                        paddingRight: 50,
                      }}
                    />
                    <Pressable
                      onPress={openBottomSheet}
                      style={{
                        position: "absolute",
                        right: 15,
                        top: "50%",
                        transform: [{ translateY: -12.5 }],
                      }}
                    >
                      <Map1 size="25" color={Colors.light.button} />
                    </Pressable>
                  </View>
                </View>

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
                <Pressable
                  onPress={() => handleSubmit()}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.light.button,
                    paddingVertical: sizes.marginSM,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {loading ? (  <ActivityIndicator animating={true} color={"white"} />) : "Submit"}
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        customStyles={{
          container: {
            backgroundColor: "transparent",

            height: sizes.screenHeight - 100,
          },
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: Colors.light.background,
            borderRadius: 30,
            paddingHorizontal: sizes.marginSM,
            paddingVertical: sizes.marginSM + 5,
            flexDirection: "column",
            gap: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: Colors.light.tint2,
                borderRadius: 100,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Map1 size="28" color={Colors.light.blue} variant="Bulk" />
            </View>
            <Pressable onPress={closeBottomSheet}>
              <Ionicons name="close-outline" size={24} color="black" />
            </Pressable>
          </View>
          <View>
            <Text style={{ fontSize: sizes.fontSize[5] + 2, marginBottom: 8 }}>
              Add a location to your event
            </Text>
            <Text style={{ color: Colors.light.tint }}>
              Choose where your location will be hosted
            </Text>
          </View>

          <GooglePlacesAutocomplete
            placeholder="Search Location"
            onPress={(data, details = null) => {
              console.log("data", JSON.stringify(data));
              console.log(
                "details",
                JSON.stringify(details?.geometry?.location)
              );

              setLocation({
                description: data.description,
                MapDetails: details?.geometry?.location,
              });
              closeBottomSheet()
            }}
            query={{
              key: `${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`,
              language: "en",
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
            onFail={(error) => console.error(error)}
            onNotFound={() => console.log("no results")}
          />
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: sizes.screenWidth,
    paddingHorizontal: sizes.marginSM,
    //paddingVertical: sizes.marginSM,
    backgroundColor: Colors.light.background,
    height: "100%",
  },
  title: {
    fontSize: sizes.fontSize[5] + 5,
  },
  scrollView: {
    // marginVertical: sizes.marginSM,

    maxHeight: 220,
  },
  imageContainer: {
    position: "relative",
    marginRight: sizes.marginSM,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 12,
  },
  noImageContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#ededed",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "relative",
  },
  noImageText: {
    color: "black",
  },
});
