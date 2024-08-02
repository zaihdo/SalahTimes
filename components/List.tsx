import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { format, parse } from 'date-fns';
import { IqamahTime } from '@/types/dbTypes';
import { useSQLiteContext } from 'expo-sqlite/next';

const prayerTimesData = {
    "Fajr": "04:30 AM",
    "Sunrise": "06:00 AM",
    "Dhuhr": "01:00 PM",
    "Asr Shafiee": "03:30 PM",
    "Asr Hanafee": "05:00 PM",
    "Maghrib": "08:30 PM",
    "Esha": "10:00 PM",
    "Sunset": "08:30 PM"
  };

export default function List() {
  const [iqamahs, setIqamahs] = useState<IqamahTime[]>([]);

  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      // getData();
      iqamahQuery();
      
    });
  }, [db])
  
  async function getData() {
    const result = await db.getAllAsync(`SELECT * FROM Iqamahs WHERE `);
    console.log(result, "huh");
  }

  function formatDateQuery() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', {month: 'short'});
    return `${day}-${month}`;
  }

  async function iqamahQuery() {
    const date = formatDateQuery();
    const masjid = "FRANCISTOWN MASJID";
    const results: IqamahTime[] = db.getAllSync(`SELECT Fajr, Dhuhr, DhuhrSunday, Asr, Maghrib, Isha FROM Iqamahs WHERE Date = ? AND Masjid = ?`, [date, masjid]);
    setIqamahs(results);
    results.forEach(row => {
      console.log(`Fajr: ${row.Fajr}`);
      console.log(`Dhuhr: ${row.Dhuhr}`);
    });
  }
  const currentDate = new Date();
  const data = Object.entries(prayerTimesData).map(([prayer, time]) => {
    const dateTime = parse(time, 'hh:mm a', currentDate);
    return { prayer, time, dateTime };
  });

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.prayer}
      renderItem={({ item }) => (
        <ListItem prayer={item.prayer} time={format(item.dateTime, 'hh:mm a')} />
      )}
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
