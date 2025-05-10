import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

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
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].text[colorScheme === 'dark' ? 'dark' : 'light'],
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'],
          borderTopWidth: 0,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cities',
          tabBarIcon: ({ focused }) => <TabBarIcon name="city" color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected[colorScheme === 'dark' ? 'dark' : 'light'] : Colors[colorScheme ?? 'light'].tabIconDefault[colorScheme === 'dark' ? 'dark' : 'light']} />,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'], 
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? 'light'].tint[colorScheme === 'dark' ? 'dark' : 'light'], 
          },
          headerTintColor: Colors[colorScheme ?? 'light'].text[colorScheme === 'dark' ? 'dark' : 'light'],
        }}
      />
      <Tabs.Screen
        name="masjids"
        options={{
          title: 'Masjids',
          tabBarIcon: ({ focused }) => <TabBarIcon name="mosque" color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected[colorScheme === 'dark' ? 'dark' : 'light'] : Colors[colorScheme ?? 'light'].tabIconDefault[colorScheme === 'dark' ? 'dark' : 'light']} />,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'], 
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? 'light'].tint[colorScheme === 'dark' ? 'dark' : 'light'], 
          },
          headerTintColor: Colors[colorScheme ?? 'light'].text[colorScheme === 'dark' ? 'dark' : 'light'], 
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ focused }) => <TabBarIcon name="info" color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected[colorScheme === 'dark' ? 'dark' : 'light'] : Colors[colorScheme ?? 'light'].tabIconDefault[colorScheme === 'dark' ? 'dark' : 'light']} />,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'], // Change this to your desired color
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? 'light'].tint[colorScheme === 'dark' ? 'dark' : 'light'], // Change this to your desired color
          },
          headerTintColor: Colors[colorScheme ?? 'light'].text[colorScheme === 'dark' ? 'dark' : 'light'] // Change this to your desired color
        
        }}
      />
    </Tabs>
  );
}