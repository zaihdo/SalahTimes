import { FlatList, View } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { IqamahTime } from '../types/dbTypes';
import { Text } from '../components/Themed';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import React from 'react';
import { Utilities } from '../util/Utilities';
import fonts from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons'; // added

interface ListProps {
  iqamahs: IqamahTime[];
  masjid: string
}

export default function List({iqamahs, masjid}: ListProps) {
  const colorScheme = useColorScheme();
  const formatColumnName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2');
  };

  const data = iqamahs.flatMap(iqamah => Object.entries(iqamah));

  const renderItem = ({ item }: { item: [string, string] }) => (
    <ListItem prayer={formatColumnName(item[0])} time={item[1]}></ListItem>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text
            style={[
              { color: Colors[colorScheme ?? 'light'].textSecondary[colorScheme === 'dark' ? 'dark' : 'light'], fontWeight: '700' },
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
      scrollEnabled={false}
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