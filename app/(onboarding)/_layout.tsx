import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { Platform, Pressable } from 'react-native';
import React from 'react';
import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OnboardingLayout() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.background, // Use theme background
        },
        // Animation settings (iOS only)
        animation: Platform.OS === 'ios' ? 'default' : 'fade',
      }}>
      <Stack.Screen name="onboarding1" options={{ headerShown: false }}/>
      <Stack.Screen name="onboarding2"  
        options={{ 
        headerBackTitleVisible: false,
        headerTitle: '',
        headerTransparent: true,

        headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                <Ionicons name="chevron-back" size={24} color={"#292D32"} />
            </Pressable>
            )
        }}/>  
      <Stack.Screen name="onboarding3"  
        options={{ 
        headerBackTitleVisible: false,
        headerTitle: '',
        headerTransparent: true,

        headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                <Ionicons name="chevron-back" size={24} color={"#292D32"}/>
            </Pressable>
            )
        }}/>  
    </Stack>
  );
}