import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useColorScheme } from '../../hooks/useColorScheme';
import { DataHandler } from '../../services/DataHandler';
import { IqamahTime } from '../../types/dbTypes';

export default function FinishOnboarding() {
const [IqamahTimes, setIqamahTimes] = useState<IqamahTime[]>([]);
    const { query } = useLocalSearchParams<{ query: string }>();
    const db = useSQLiteContext();
    const colorScheme = useColorScheme();

    useEffect(() => {
    db.withTransactionAsync(async () => {
        console.log(query);
        const results = await DataHandler.iqamahQuery(db, query);
        setIqamahTimes(results);
    });
    }, [db]);
  const completeOnboarding = async () => {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40}}>
        <View style={{borderWidth: 2, borderColor: '#E5E5E5'}}>
            <View style={{marginTop: 20}}>
                <Text style={{ fontSize: 20, fontWeight: 'semibold', marginBottom: 10, color: '#102540' }}>Select Your City</Text>
                <Text style={{ fontSize: 16, fontWeight: 'regular', marginBottom: 20, color: '#8D8D8D' }}>Choose your city in Botswana to view nearby mosques and get accurate prayer times..</Text>
            </View>
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 20}}>
        <View>
          <View style={{flexDirection: 'column', justifyContent: 'space-between', marginBottom: 20}}>
            <Pressable style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 10, width: 100}}>
              <Text style={{textAlign: 'center'}}>Hanafi</Text>
            </Pressable>
            <Pressable style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 10, width: 100}}>
              <Text style={{textAlign: 'center'}}>Shafi'i</Text>
            </Pressable>
            <Pressable style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 10, width: 100}}>
              <Text style={{textAlign: 'center'}}>Maliki</Text>
            </Pressable>
            <Pressable style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 10, width: 100}}>
              <Text style={{textAlign: 'center'}}>Hanbali</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {/* <View style={{width: '100%', justifyContent: 'center'}}> */}
        <Link href="/" asChild onPress={completeOnboarding}>
            <Pressable
                style={{
                backgroundColor: '#ffc801',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 24,
                }}
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
            </Link>
        {/* </View> */}
    </View>
    </SafeAreaView>
  );
}