import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { Text, View } from '@/components/Themed';
import Suspense from '@/components/Suspense';
import { IqamahTime } from '@/types/dbTypes';
import { DataHandler } from '@/services/DataHandler';
import { useLocalSearchParams } from 'expo-router';
import { Utilities } from '@/util/Utilities';
import IqamahList from '@/components/IqamahList';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface IqamahProps {
  Name: string;
}

export default function IqamahScreen(Masjid: IqamahProps) {
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

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light'] }]}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text[colorScheme === 'dark' ? 'dark' : 'light'] }]}>{Utilities.getFormattedDate(new Date())}</Text>
        <IqamahList iqamahs={IqamahTimes} masjid={query.toLowerCase()} />
      </View>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '5%',
  }
});