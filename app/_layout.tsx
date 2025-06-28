import React from 'react';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import * as SystemUI from 'expo-system-ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { DataHandler } from '@/services/DataHandler';
import Suspense from '@/components/Suspense';
import Colors from '@/constants/Colors';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Initialize app resources
  useEffect(() => {
    async function prepareApp() {
      try {
        // Set splash screen background color
        await SystemUI.setBackgroundColorAsync(
          Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light']
        );

        // Load database and fonts in parallel
        await Promise.all([
          DataHandler.loadDatabase(),
          fontsLoaded,
        ]);

        // Artificial delay for better UX (optional)
        // await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, [fontsLoaded, colorScheme]);

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
        console.error('Onboarding check error:', error);
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
           {onboarded ? (
          <Stack >
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false 
              }} 
            />
          </Stack>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(onboarding)" />
          </Stack>
        )}
        </SQLiteProvider>
      </ThemeProvider>
  );
}