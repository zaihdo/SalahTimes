import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { IqamahTime } from '@/types/dbTypes';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function List() {
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

  const formatColumnName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2');
  };

  const data = iqamahs.flatMap(iqamah => Object.entries(iqamah));

  const renderItem = ({ item }: { item: [string, string] }) => (
    <ListItem prayer={formatColumnName(item[0])} time={item[1]}></ListItem>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item[0]}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
    listContainer: {
      padding: 5,
      margin: 15
    }
  });
