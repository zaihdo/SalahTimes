import { FlatList } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { SalaahTime } from '@/types/dbTypes';
import { Text, useThemeColor, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import React from 'react';
import { Utilities } from '@/util/Utilities';

interface ListProps {
  salaahs: SalaahTime[];
  city: string
}

export default function List({salaahs, city}: ListProps) {
  const colorScheme = useColorScheme();
  const formatColumnName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2');
  };

  const data = salaahs.flatMap(salaah => Object.entries(salaah));

  const renderItem = ({ item }: { item: [string, string] }) => (
    <ListItem prayer={formatColumnName(item[0])} time={item[1]}></ListItem>
  );

  return (
    <FlatList
      ListHeaderComponent={<Text style={[{color: Colors[colorScheme ?? 'light'].tint[colorScheme === 'dark' ? 'dark' : 'light']}, styles.header]}>{Utilities.toCapitalCase(city)}</Text>}
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
    },
    header: {
      fontSize: 26,
      textAlign: 'center',
    }
  });