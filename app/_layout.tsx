import React from 'react';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import * as SystemUI from 'expo-system-ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export { ErrorBoundary } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch((error) => {
  if (__DEV__) console.warn('Splash screen error:', error);
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'PlusJakartaSans-Regular': require('../assets/fonts/PlusJakartaSans.ttf'),
    'PlusJakartaSans-Italic': require('../assets/fonts/PlusJakartaSans-Italic.ttf'),
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),    
  });

  // Initialize app resources
  useEffect(() => {
    async function prepareApp() {
      try {
        // Wait for fonts to load first
        if (!fontsLoaded && !fontsError) {
          return;
        }

        // Set splash screen background color
        await SystemUI.setBackgroundColorAsync(
          Colors[colorScheme ?? 'light'].primary[colorScheme === 'dark' ? 'dark' : 'light']
        );
        
        // Keep splash screen visible for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setAppReady(true);
        
        // Small delay before hiding to ensure UI is ready
        await new Promise(resolve => setTimeout(resolve, 100));
        await SplashScreen.hideAsync();
      } catch (error) {
        if (__DEV__) {
          console.error('[RootLayout] Initialization error:', error);
        }
        // Still set app ready and hide splash even on error
        setAppReady(true);
        try {
          await SplashScreen.hideAsync();
        } catch (hideError) {
          if (__DEV__) {
            console.error('[RootLayout] Error hiding splash:', hideError);
          }
        }
      }
    }

    prepareApp();
  }, [fontsLoaded, fontsError, colorScheme]);

  if (!appReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  // Check onboarding status
  useEffect(() => {
    async function checkOnboarding() {
      try {
        const value = await AsyncStorage.getItem('@viewedOnboarding');
        setOnboarded(!!value);
      } catch (error) {
        if (__DEV__) {
          console.error('[RootLayout] Onboarding check error:', error);
        }
        setOnboarded(false); // Fallback to showing onboarding
      }
    }

    checkOnboarding();
  }, []);

  if (onboarded === null) {
    return null;
  }

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  
  return (
      <ThemeProvider value={theme}>
        <SQLiteProvider 
          databaseName="prayerTimes.db"
          useSuspense
          assetSource={{ assetId: require("../assets/databases/prayerTimes.db") }}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="(onboarding)" 
              options={{ 
                headerShown: false,
              }} 
            />
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false,
              }} 
            />
          </Stack>
        </SQLiteProvider>
      </ThemeProvider>
  );
}