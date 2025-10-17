import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router'; // Import router
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
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
  
    useEffect(() => {
      db.withTransactionAsync(async () => {
        const cityNames = await DataHandler.cityQuery(db);
        setCities(cityNames);
      });
    }, [db]);

  const handlePress = async () => {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
    router.push('/(onboarding)/onboarding3');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40}}>
        <View style={{maxWidth: '90%'}}>
            <View style={{marginTop: 10}}>
                <Text style={{ fontSize: 20, fontWeight: 'semibold', marginBottom: 10, color: '#102540' }}>Select Your City</Text>
                <Text style={{ fontSize: 16, fontWeight: 'regular', marginBottom: 20, color: '#8D8D8D' }}>Choose your city in Botswana to view nearby mosques and get accurate prayer times..</Text>
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
                    backgroundColor: isSelected ? '#102540' : '#FFFEFE',
                    padding: 10,
                    borderRadius: 10,
                    width: '100%',
                    borderColor: isSelected ? '#102540' : '#E5E5E5',
                    borderWidth: 1,
                  }}
                >
                  <Ionicons name="location-sharp" size={20} color={isSelected ? '#FFFEFE' : '#102540'} style={{marginRight: 10}} />
                  <Text style={{
                    textAlign: 'left',
                    color: isSelected ? '#FFFEFE' : '#102540',
                    fontSize: 16,
                    fontWeight: 'medium'
                  }}>
                    {city.City}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
        
        {/* Pressable with direct navigation */}
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
            fontWeight: 'medium',
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
  },
});