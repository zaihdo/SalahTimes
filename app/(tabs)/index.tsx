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
      if (__DEV__) {
        console.log('Raw city data from AsyncStorage:', cityData);
      }
      
      if (cityData) {
        const parsed = JSON.parse(cityData);
        if (__DEV__) {
          console.log('Parsed city data:', parsed);
        }
        
        // Extract the city name from the object
        const cityName = parsed.name || parsed;
        if (__DEV__) {
          console.log('City name to set:', cityName);
        }
        
        setSavedCity(cityName);
      } else {
        if (__DEV__) {
          console.log('No saved city found in AsyncStorage');
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Failed to load saved city:', error);
      }
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

  // Log when savedCity actually updates
  useEffect(() => {
    if (__DEV__) {
      console.log('savedCity state updated:', savedCity);
    }
  }, [savedCity]);

  if (isLoading) {
    return null;
  }

  if (__DEV__) {
    console.log('Rendering SalaahScreen with city:', savedCity);
  }
  return <SalaahScreen Name={savedCity || 'Gaborone'} />;
}