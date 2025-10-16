import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useColorScheme } from '../../hooks/useColorScheme';
import { DataHandler } from '../../services/DataHandler';
import { Ionicons } from '@expo/vector-icons';

export default function FinishOnboarding() {

    const [selectedMadhabIndex, setSelectedMadhabIndex] = useState<number | null>(null);

    const madhabs = [
        { id: 1, name: 'Hanafi' },
        { id: 2, name: "Shafi'ee" },
    ];  

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40}}>
        <View style={{maxWidth: '90%'}}>
            <View style={{marginTop: 10}}>
                <Text style={{ fontSize: 20, fontWeight: 'semibold', marginBottom: 10, color: '#102540' }}>Select Your Madhab</Text>
                <Text style={{ fontSize: 16, fontWeight: 'regular', marginBottom: 20, color: '#8D8D8D', minHeight: 24 }} numberOfLines={2} >This is used to determine the prayer times for Asr. It can be changed later in Settings.</Text>
            </View>
            <ScrollView>
          {madhabs.map((madhab, index) => {
            const isSelected = selectedMadhabIndex === index;
            return (
              <View key={index} style={{flexDirection: 'column', justifyContent: 'space-between', marginBottom: 8}}>
                <Pressable
                  onPress={() => setSelectedMadhabIndex(index)}
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
                  <Text style={{
                    textAlign: 'left',
                    color: isSelected ? '#FFFEFE' : '#102540',
                    fontSize: 16,
                    fontWeight: 'medium'
                  }}>
                    {madhab.name}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
            {/* <View style={{width: '100%', justifyContent: 'center'}}> */}
                  <Pressable
                    style={({ pressed }) => [
                        styles.wrapperCustom,
                        { opacity: pressed ? 0.5 : 1 }
                        ]}
                    onPress={completeOnboarding}
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
              {/* </View> */}
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