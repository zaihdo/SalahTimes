import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { Text, View } from '@/components/Themed';
import List from '@/components/List';
import Suspense from '@/components/Suspense';
import { IqamahTime } from '@/types/dbTypes';
import { DataHandler } from '@/services/DataHandler';
import { useLocalSearchParams } from 'expo-router';
import { Utilities } from '@/util/Utilities';

interface IqamahProps {
  Name: string;
}

export default function IqamahScreen(Masjid: IqamahProps) {
  const [iqamahs, setIqamahs] = useState<IqamahTime[]>([]);
  const { query } = useLocalSearchParams<{ query: string }>();
  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      console.log(query);
      const results = await DataHandler.iqamahQuery(db, query);
      setIqamahs(results);
    });
  }, [db]);

  return (
    <React.Suspense fallback={<Suspense />}>
      <View style={styles.container}>
        {/* Date Text at the Top */}
        <Text style={styles.title} lightColor="rgba(16, 37, 64, 0.8)">
          {Utilities.getFormattedDate(new Date())}
        </Text>

        {/* Separator */}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {/* EditScreenInfo Component */}
        {/* <EditScreenInfo path="app/modal.tsx" /> */}

        {/* List Component */}
        <List iqamahs={iqamahs} masjid={query.toLowerCase()} />
      </View>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full available space
    padding: 16, // Add padding to ensure content doesn't touch the edges
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '50%', // Add margin to position the date text at the top
  },
  separator: {
    marginVertical: 16, // Adjust margin for better spacing
    height: 1,
    width: '100%', // Full width separator
  },
});