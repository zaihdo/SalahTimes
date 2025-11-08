import { FlatList, View } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { IqamahTime } from '../types/dbTypes';
import { Text } from '../components/Themed';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import React from 'react';
import fonts from '../constants/Fonts';

interface ListProps {
  iqamahs: IqamahTime[];
  masjid: string
}

export default function List({iqamahs, masjid}: ListProps) {
  const colorScheme = useColorScheme();
  const formatColumnName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2');
  };

  // flatten entries, filter Dhuhr/DhuhrSunday according to current day,
  // and limit to 5 items so the list always shows 5 iqamah times
  const isSunday = new Date().getDay() === 0; // 0 === Sunday

  const rawEntries = iqamahs.flatMap(iqamah => Object.entries(iqamah));

  const filteredEntries = rawEntries.filter(([key]) => {
    const normalized = formatColumnName(key).toLowerCase();
    if (isSunday) {
      // on Sunday, prefer 'dhuhr-sunday' and remove plain 'dhuhr'
      if (normalized === 'dhuhr') return false;
      return true;
    } else {
      // non-Sunday, remove 'dhuhr-sunday' and keep plain 'dhuhr'
      if (normalized === 'dhuhr-sunday') return false;
      return true;
    }
  });

  // preserve order, but ensure only 5 items are shown
  const data = filteredEntries.slice(0, 5);

  const renderItem = ({ item }: { item: [string, string] }) => (
    <ListItem prayer={formatColumnName(item[0])} time={item[1]}></ListItem>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text
            style={[
              { color: Colors[colorScheme ?? 'light'].text?.secondary?.[colorScheme === 'dark' ? 'dark' : 'light'], fontWeight: '700' },
              fonts.heading
            ]}
            numberOfLines={1}
          >
            Iqamah Times
          </Text>
        </View>
      }
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
    },
    headerContainer: {
      alignSelf: 'stretch',
      paddingHorizontal: 8,
      paddingVertical: 12,
    }
  });