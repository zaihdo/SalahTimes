import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet, Animated } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useColorScheme } from '../../hooks/useColorScheme';
import { DataHandler } from '../../services/DataHandler';
import { Ionicons } from '@expo/vector-icons';

export default function FinishOnboarding() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const [selectedCityIndex, setSelectedCityIndex] = useState<number | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  const db = useSQLiteContext();
  const tickAnimations = useRef<Animated.Value[]>([]);

  function capitalize(str: string): string {
    if (!str) return '';
    return str
      .split(' ')
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ');
  }

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const cityNames = await DataHandler.cityQuery(db);
      // Capitalize each city name before setting state
      const capitalizedCities = cityNames.map((city: any) => ({
        ...city,
        City: capitalize(city.City),
      }));
      setCities(capitalizedCities);
      tickAnimations.current = capitalizedCities.map(() => new Animated.Value(0));
    });
  }, [db]);

  useEffect(() => {
    if (
      selectedCityIndex !== null &&
      tickAnimations.current[selectedCityIndex]
    ) {
      Animated.timing(tickAnimations.current[selectedCityIndex], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    tickAnimations.current.forEach((anim, idx) => {
      if (idx !== selectedCityIndex) {
        anim.setValue(0);
      }
    });
  }, [selectedCityIndex]);

  const handlePress = async () => {
    router.push('/(onboarding)/onboarding3');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40}}>
      <View style={{maxWidth: '90%'}}>
        <View style={{marginTop: 10}}>
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10, color: '#102540' }}>Select Your City</Text>
          <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 20, color: '#8D8D8D' }}>
            Choose your city in Botswana to view nearby mosques and get accurate prayer times.
          </Text>
        </View>
        <ScrollView style={{marginBottom: 10}}>
          {cities.map((city, index) => {
            const isSelected = selectedCityIndex === index;
            return (
              <View key={index} style={{flexDirection: 'column', justifyContent: 'space-between', marginBottom: 8}}>
                <Pressable
                  onPress={() => setSelectedCityIndex(index)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFEFE',
                    padding: 10,
                    borderRadius: 10,
                    width: '100%',
                    borderColor: isSelected ? '#102540' : '#E5E5E5',
                    borderWidth: 1,
                  }}
                >
                  <Ionicons
                    name="location-sharp"
                    size={20}
                    color="#102540"
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'left',
                      color: '#102540',
                      fontSize: 16,
                      fontWeight: '500',
                    }}
                  >
                    {city.City}
                  </Text>
                  <Animated.View
                    style={{
                      marginLeft: 10,
                      opacity: tickAnimations.current[index] || 0,
                      transform: [
                        {
                          scale: tickAnimations.current[index]
                            ? tickAnimations.current[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                              })
                            : 1,
                        },
                      ],
                    }}
                  >
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="green"
                      />
                    )}
                  </Animated.View>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
        <Pressable
          style={({ pressed }) => [
            styles.wrapperCustom,
            { opacity: pressed ? 0.5 : 1 }
          ]}
          onPress={handlePress}
        >
          <Text style={{
            color: '#102540',
            fontSize: 18,
            fontWeight: '500',
            textAlign: 'center',
          }}>
            Save and Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperCustom: {
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffc801',
    marginTop: 10,
  },
});