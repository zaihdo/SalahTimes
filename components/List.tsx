import React from 'react'
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { format, parse } from 'date-fns';

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
