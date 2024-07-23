import React from 'react'
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';

const prayerTimesData = {
    fajr: "04:30 AM",
    sunrise: "06:00 AM",
    dhuhr: "01:00 PM",
    asr: "05:00 PM",
    maghrib: "08:30 PM",
    isha: "10:00 PM",
    sunset: "08:30 PM"
  };

export default function List() {

    const data = Object.entries(prayerTimesData);
    
  return (
    <FlatList
     data={data}
     keyExtractor={item => item[0]}
     renderItem={({item}) => (
        <ListItem prayer={item[0]} time={item[1]}></ListItem> 
     )}
     contentContainerStyle={styles.listContainer}
     scrollEnabled={false}
    >
    </FlatList>
  )
}

const styles = StyleSheet.create({
    listContainer: {
      padding: 5,
      margin: 15
    }
  });
