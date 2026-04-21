import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function Index() {
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkOnboarding() {
      try {
        const value = await AsyncStorage.getItem('@viewedOnboarding');
        setOnboarded(!!value);
      } catch (error) {
        setOnboarded(false);
      }
    }
    checkOnboarding();
  }, []);

  if (onboarded === null) {
    return null;
  }

  if (onboarded) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(onboarding)/onboarding1" />;
}
