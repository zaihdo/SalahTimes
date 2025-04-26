import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import Suspense from '@/components/Suspense';
import { DataHandler } from '@/services/DataHandler';
import { useColorScheme } from '@/components/useColorScheme';
import Accordion from '@/components/Accordion';
import data, { Category } from '@/assets/data/about';
import { View, ScrollView, StyleSheet, Text, SafeAreaView } from 'react-native';
import Colors from '@/constants/Colors';
import { useScreenSize } from '@/hooks/useScreenSize';

export default function AboutScreen() {
  const [cities, setCities] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  const db = useSQLiteContext();
  const { isSmall, isLarge } = useScreenSize();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const cityNames = await DataHandler.cityQuery(db);
      setCities(cityNames);
    });
  }, [db]);

  // Responsive padding
  const containerPadding = isSmall ? 12 : isLarge ? 24 : 16;
  const headerFontSize = isSmall ? 22 : isLarge ? 32 : 26;

  return (
    <React.Suspense fallback={<Suspense />}>
      <SafeAreaView style={[
        styles.safeArea, 
        { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : '#fff' }
      ]}>
        <View style={[
          styles.container, 
          { 
            padding: containerPadding,
            backgroundColor: colorScheme === 'dark' ? Colors.dark.background : '#fff'
          }
        ]}>

        <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((value, index) => {
          return <Accordion value={value} key={index} type={value.type} />;
        })}
        </ScrollView>
        </View>
      </SafeAreaView>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  headerText: {
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 20,
  }
});
