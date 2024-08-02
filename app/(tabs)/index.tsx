import { ActivityIndicator, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import List from '@/components/List';
import { HijriDate } from 'hijri-date';
import React from 'react';
import { SQLiteProvider } from 'expo-sqlite';


// const getFormattedHijriDate = (date: Date) => {
//   const months = [
//     "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-Thani", "Jumada al-awwal", "Jumada al-Thani",
//     "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
//   ];

//   const hijriDate = new HijriDate(date);
//   const day = hijriDate.getDate();
//   const month = months[hijriDate.getMonth()];
//   const year = hijriDate.getFullYear();

//   return `${day} ${month} ${year}`;
// };

const getFormattedDate = (date: Date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const dayName = date.toLocaleDateString('default', {weekday: 'long'});
  const day = date.getDate();
  const month = date.toLocaleString('default', {month: 'long'});

  // Determine the day suffix
  const daySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${dayName} ${day}${daySuffix(day)} ${month}`;
};

export default function SalahScreen() {
  const currentDate = new Date();
  const formattedDate = getFormattedDate(currentDate);

  return (
    <React.Suspense 
      fallback= {
        <View>
          <ActivityIndicator size={'large'}/>
          <Text>Loading...</Text>
        </View>
      }
    >
    {/* <SQLiteProvider useSuspense={true} databaseName='`${dbName}`'> */}

    <View style={styles.container}>
      <View style={styles.currentPrayerContainer}>
        <Text style={styles.currentPrayerText} lightColor='rgba(16, 37, 64, 0.8)'>Maghreb</Text>
        <View style={styles.nextPrayerCountdown}>
        <Text lightColor='rgba(16, 37, 64, 0.5)' >12 minutes until Esha</Text>
        </View>
      </View>
      <View style={styles.listContainer} lightColor='#f6f6f6'>
      <Text style={styles.title} lightColor='rgba(16, 37, 64, 0.8)'>{formattedDate}</Text>
      {/* <List></List> */}
      </View>
    </View>
    {/* </SQLiteProvider> */}
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    // backgroundColor: '#d5b885',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  listContainer: {
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
  },
  currentPrayerContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  currentPrayerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignItems: 'center'
  },
  nextPrayerCountdown: {
    borderRadius: 15,
    // backgroundColor: 'rgba(16, 37, 64, 0.8)',
    padding: 7

  }
});
