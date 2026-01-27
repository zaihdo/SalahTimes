import React, { useEffect, useState } from 'react';
import SalaahScreen from '../Salaah';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function Index() {
  const [savedCity, setSavedCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadSavedCity = async () => {
    try {
      const cityData = await AsyncStorage.getItem('@selectedCity');
      
      if (cityData) {
        const parsed = JSON.parse(cityData);
        // Extract the city name from the object
        const cityName = parsed.name || parsed;
        setSavedCity(cityName);
      } else {
        // Set default city to Gaborone if none is saved
        const defaultCity = 'GABORONE';
        await AsyncStorage.setItem('@selectedCity', JSON.stringify(defaultCity));
        setSavedCity(defaultCity);
      }
    } catch (error) {
      // Even on error, set default
      setSavedCity('GABORONE');
    } finally {
      setIsLoading(false);
    }
  };

  // Load on mount and reload when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadSavedCity();
    }, [])
  );

  if (isLoading) {
    return null;
  }
  return <SalaahScreen Name={savedCity || 'Gaborone'} />;
}