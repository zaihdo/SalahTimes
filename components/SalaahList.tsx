import { FlatList } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { SalaahTime } from '../types/dbTypes';
import React, { useEffect, useState } from 'react';
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

  // Load on mount
  useEffect(() => {
    loadMadhab();
  }, []);

  // Reload when parent screen comes into focus
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

  const renderItem = ({ item }: { item: [string, string] }) => (
    <ListItem prayer={formatColumnName(item[0])} time={item[1]}></ListItem>
  );

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

