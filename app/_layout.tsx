import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { UserContextProvider } from "@/config/usercontext";
import { View,Text,StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Colors } from "@/constants/Colors";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
      customSuccessToast: ({ text1}) => (
      <BlurView intensity={50} style={styles.toastContainer}>
      <View style={styles.toastContent}>
        <Text style={styles.toastText}>{text1}</Text>
       
      </View>
    </BlurView>
    ),
    customErrorToast: ({ text1}) => (
      <BlurView intensity={50} style={styles.toastErrorContainer}>
      <View style={styles.toastContent}>
        <Text style={styles.toastErrorText}>{text1}</Text>
       
      </View>
    </BlurView>
    )


    
  };
  return (
    <>
    <UserContextProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
  
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="signup" />
    
          <Stack.Screen name="editEvent/index" />
  
          <Stack.Screen
            options={{
              presentation: "modal",
            }}
            name="profile/index"
          />
          <Stack.Screen
            name="eventDetails/index"
          />
        </Stack>
      </ThemeProvider>
    </UserContextProvider>
    <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    height: 60,
    width: '90%',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 15, // updated margin
    backgroundColor: "rgba(232, 232, 232, 0.4)",
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderLeftColor: 'rgb(34 197 94);', // green right border
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    overflow: 'hidden',
  },
  toastErrorContainer: {
    height: 60,
    width: '90%',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 15, // updated margin
    backgroundColor: "rgba(232, 232, 232, 0.4)",
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderLeftColor: 'rgb(239 68 68)', // green right border
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    overflow: 'hidden',
  },
  toastContent: {
    flex: 1,
    justifyContent: 'center',
  },
  toastText: {
    color: "#2e2f2f", // updated to black text
    fontSize: 16,
    fontWeight: 'bold',
  },  toastErrorText: {
    color: "rgb(239 68 68)", // updated to black text
    fontSize: 16,
    fontWeight: 'bold',
  },
  uuidText: {
    color: '#333', // updated to a darker text
    fontSize: 14,
  },
});
