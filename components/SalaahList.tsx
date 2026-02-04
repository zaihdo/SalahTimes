import { FlatList } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { SalaahTime } from '../types/dbTypes';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

interface ListProps {
  salaahs: SalaahTime[];
  city: string
}

export default function List({salaahs, city}: ListProps) {
  const formatColumnName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2');
  };

  // Determine current prayer based on time
  const getCurrentPrayer = (prayerTimes: [string, string][]) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Convert prayer times to minutes
    const timesInMinutes = prayerTimes.map(([name, time]) => {
      const [hours, minutes] = time.split(':').map(Number);
      return {
        name,
        minutes: hours * 60 + minutes,
      };
    });

    // Find the next prayer time that hasn't occurred yet
    for (let i = 0; i < timesInMinutes.length; i++) {
      if (currentMinutes < timesInMinutes[i].minutes) {
        // Current time is before this prayer, so we're in the previous prayer period
        return i > 0 ? timesInMinutes[i - 1].name : timesInMinutes[timesInMinutes.length - 1].name;
      }
    }

    // If we're past all prayer times, we're in the last prayer period
    return timesInMinutes[timesInMinutes.length - 1]?.name;
  };

  const [userMadhab, setUserMadhab] = useState<string | null>(null);

  const loadMadhab = async () => {
    try {
      const stored = await AsyncStorage.getItem('@selectedMadhab');
      if (__DEV__) {
        console.log('Retrieved madhab from storage:', stored);
      }
      setUserMadhab(stored);
    } catch {
      setUserMadhab(null);
    }
  };

  // Load on mount and reload when parent screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadMadhab();
    }, [])
  );

  // flatten DB objects to [key, value] pairs
  const raw = salaahs.flatMap((salaah) => Object.entries(salaah));

  // filter Asr variants according to saved preference
  const data = raw.filter(([key]) => {
    // keys from DB are expected to be "AsrShafiee" and "AsrHanafee" (exact)
    if (userMadhab === 'AsrShafiee') {
      return key !== 'AsrHanafee';
    }
    if (userMadhab === 'AsrHanafee') {
      return key !== 'AsrShafiee';
    }
    return true;
  });

  const currentPrayer = getCurrentPrayer(data);

  const renderItem = ({ item }: { item: [string, string] }) => {
    const isCurrent = item[0] === currentPrayer;
    return (
      <ListItem 
        prayer={formatColumnName(item[0])} 
        time={item[1]} 
        isCurrent={isCurrent}
      />
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item[0]}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
    listContainer: {
      padding: 0,
      margin: 10
    },
    header: {
      textAlign: 'center',
      padding: 15
    }
  });

