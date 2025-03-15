import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>['name'];
  color: string;
}) {
  return <FontAwesome6 size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].secondary,
          borderTopWidth: 0,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cities',
          tabBarIcon: ({ color }) => <TabBarIcon name="city" color={color} />,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].secondary, // Change this to your desired color
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? 'light'].tabIconSelected, // Change this to your desired color
          },
          headerTintColor: Colors[colorScheme ?? 'light'].text, // Change this to your desired color
        }}
      />
      <Tabs.Screen
        name="masjids"
        options={{
          title: 'Masjids',
          tabBarIcon: ({ color }) => <TabBarIcon name="mosque" color={color} />,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].secondary, // Change this to your desired color
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? 'light'].tabIconSelected, // Change this to your desired color
          },
          headerTintColor: Colors[colorScheme ?? 'light'].text, // Change this to your desired color
        }}
      />
      {/* <Tabs.Screen
        name="Qiblah"
        options={{
          title: 'Qiblah',
          tabBarIcon: ({ color }) => <TabBarIcon name="kaaba" color={color} />,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].secondary, // Change this to your desired color
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? 'light'].tabIconSelected, // Change this to your desired color
          },
          headerTintColor: Colors[colorScheme ?? 'light'].text // Change this to your desired color
        
        }}
      /> */}
    </Tabs>
  );
}
