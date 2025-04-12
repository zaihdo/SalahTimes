import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import Suspense from '@/components/Suspense';
import { DataHandler } from '@/services/DataHandler';
import { useColorScheme } from '@/components/useColorScheme';
import Accordion from '@/components/Accordion';
import data, { Category } from '@/assets/data/about';
import { View, ScrollView, StyleSheet } from 'react-native';

export default function CityScreen() {
  const [cities, setCities] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const cityNames = await DataHandler.cityQuery(db);
      setCities(cityNames);
    });
  }, [db]);

return (
  <React.Suspense fallback={<Suspense />}>
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((value: any, index: any) => {
          return <Accordion value={value} key={index} />
        })}
      </ScrollView>
  
    </View>
    
  </React.Suspense>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  masjidContainer: {
    flexDirection: 'row',
    borderColor: '#efefef',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: 'transparent',
  },
  flatListContainer: {
    borderRadius: 15,
    borderStyle: 'solid',
    padding: 8,
    paddingHorizontal: 16
  },
  cityText: {
    fontSize: 16,
    textAlign: 'left',
    textTransform: 'capitalize',
    fontWeight: '500'
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});