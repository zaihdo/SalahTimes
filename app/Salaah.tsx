import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { Text, View } from '@/components/Themed';
import Suspense from '@/components/Suspense';
import { SalaahTime } from '@/types/dbTypes';
import { DataHandler } from '@/services/DataHandler';
import { useLocalSearchParams } from 'expo-router';
import { Utilities } from '@/util/Utilities';
import SalaahList from '@/components/SalaahList';
import Colors from '@/constants/Colors';
import fonts from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';

interface SalaahProps {
  Name: string;
}

export default function SalaahScreen(City: SalaahProps) {
  const [salaahTimes, setSalaahTimes] = useState<SalaahTime[]>([]);
  const { query } = useLocalSearchParams<{ query: string }>();
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      console.log(query);
      const results = await DataHandler.salaahQuery(db, query);
      setSalaahTimes(results);
    });
  }, [db]);

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'] }]}>
        <Text style={[styles.date, fonts.title, { color: Colors[colorScheme ?? 'light'].text[colorScheme === 'dark' ? 'dark' : 'light'] }]}>{Utilities.getFormattedDate(new Date())}</Text>
        <SalaahList salaahs={salaahTimes} city={query.toLowerCase()} />
      </View>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  date: {
    textAlign: 'center',
    padding: 10
  }
});