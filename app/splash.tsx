import { View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { SplashScreen, useRouter } from 'expo-router';
import { loadDatabase } from '@/services/dbService';

export default function splash() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    loadDatabase()
    .then(() => {
      setDbLoaded(true);
      SplashScreen.hideAsync();
      router.replace('/(tabs)');
    }
    ).
    catch((e: any) => console.error(e));
  }, []);

  return (
    <View></View>
  )
}
