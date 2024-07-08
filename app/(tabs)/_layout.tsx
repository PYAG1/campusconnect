import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Add, Discover, Home, Save2 } from 'iconsax-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
 
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }} >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
          focused ? (<Home size="32" color={Colors.light.button} variant="Bold"/>):(<Home size="32" color={Colors.light.button} variant="Outline"/>)
          ),
        }}
      />
              <Tabs.Screen
        name="create"
        options={{
          title: 'Create Event',
          tabBarIcon: ({ color, focused }) => (
       focused ? (<Add size="32" color={Colors.light.button} variant="Bold"/>) :(<Add size="32" color={Colors.light.button} variant="Outline"/>)
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
       focused ? (<Discover size="32" color={Colors.light.button} variant="Bold"/>) : (<Discover size="32" color={Colors.light.button} variant="Outline"/>)
          ),
        }}
      />
          <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved Events',
          tabBarIcon: ({ color, focused }) => (
       focused ? (<Save2 size="32" color={Colors.light.button} variant="Bold"/>) :(<Save2 size="32" color={Colors.light.button} variant="Outline"/>)
          ),
        }}
      />
    </Tabs>
  );
}

