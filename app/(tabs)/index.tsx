// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import SalaahScreen from '../Salaah';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [savedCity, setSavedCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavedCity = async () => {
      try {
        const cityData = await AsyncStorage.getItem('@selectedCity');
        console.log('Raw city data from AsyncStorage:', cityData);
        
        if (cityData) {
          const parsed = JSON.parse(cityData);
          console.log('Parsed city data:', parsed);
          
          // Extract the city name from the object
          const cityName = parsed.name || parsed;
          console.log('City name to set:', cityName);
          
          setSavedCity(cityName);
        } else {
          console.log('No saved city found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to load saved city:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedCity();
  }, []);

  // Log when savedCity actually updates
  useEffect(() => {
    console.log('savedCity state updated:', savedCity);
  }, [savedCity]);

  if (isLoading) {
    return null;
  }

  console.log('Rendering SalaahScreen with city:', savedCity);
  return <SalaahScreen Name={savedCity || 'Gaborone'} />;
}