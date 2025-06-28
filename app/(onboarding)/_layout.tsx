import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Platform } from 'react-native';
import React from 'react';

export default function OnboardingLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide headers for all screens
        contentStyle: {
          backgroundColor: colors.background, // Use theme background
        },
        // Animation settings (iOS only)
        animation: Platform.OS === 'ios' ? 'default' : 'fade',
      }}
    >
      <Stack.Screen name="onboarding1" />
      <Stack.Screen name="onboarding2" />
    </Stack>
  );
}