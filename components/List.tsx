import { FlatList } from 'react-native';
import ListItem from './ListItem';
import { StyleSheet } from 'react-native';
import { IqamahTime } from '@/types/dbTypes';
import React from 'react';
interface ListProps {
  iqamahs: IqamahTime[];
}

export default function List({iqamahs}: ListProps) {

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
