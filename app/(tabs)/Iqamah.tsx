import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import List from '@/components/List';
import Suspense from '@/components/Suspense';
import { IqamahTime } from '@/types/dbTypes';

export default function IqamahScreen() {
  const [iqamahs, setIqamahs] = useState<IqamahTime[]>([]);

  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      iqamahQuery();
      
    });
  }, [db])
  
  function formatDateQuery() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', {month: 'short'});
    return `${day}-${month}`;
  }

  async function iqamahQuery() {
    const date = formatDateQuery();
    const masjid = "FRANCISTOWN MASJID";
    const results = db.getAllSync<IqamahTime>(`SELECT Fajr, Dhuhr, DhuhrSunday, Asr, Maghrib, Isha FROM Iqamahs WHERE Date = ? AND Masjid = ?`, [date, masjid]);
    setIqamahs(results);
  }

  return (
    <React.Suspense
      fallback={
        <Suspense></Suspense>
      }
    >
      <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <List iqamahs={iqamahs}></List>
    </View>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
