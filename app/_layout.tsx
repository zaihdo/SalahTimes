import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { loadDatabase } from '@/services/dbService';
import { SQLiteProvider } from 'expo-sqlite';
import React from 'react';
import * as SystemUI from 'expo-system-ui';
import Suspense from '@/components/Suspense';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [dbLoaded, setDbLoaded] = useState<boolean>(false);
  const colorScheme = useColorScheme();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const setSplashScreenColor = async () => {

      if (colorScheme === 'dark') {
        await SystemUI.setBackgroundColorAsync(DarkTheme.colors.background);
      };
    }

    setSplashScreenColor();
    loadDatabase()
    .then(() => {
      setDbLoaded(true);
    }
    ).
    catch((e: any) => console.error(e));
    if (dbLoaded && loaded) {
      setTimeout(()=>{
        SplashScreen.hideAsync();
      }, 2000);
    }
  }, [dbLoaded, loaded, colorScheme]);

  if (!loaded || !dbLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    // <React.Suspense
    //   fallback={
    //     <Suspense></Suspense>
    //   }
    // >
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName={'prayerTimes.db'} useSuspense assetSource={{assetId: require("../assets/databases/prayerTimes.db")}}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </SQLiteProvider>
    </ThemeProvider>
    // </React.Suspense>
  );
}
