import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import Suspense from '@/components/Suspense';
import { DataHandler } from '@/services/DataHandler';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import Accordion from '@/components/Accordion';
import data from '@/assets/data/about-data';
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
        { 
          backgroundColor: Colors[colorScheme ?? 'light'].background[colorScheme === 'dark' ? 'dark' : 'light']
        }
      ]}>
        <View style={[
          styles.container, 
          { 
            padding: containerPadding,
          }
        ]}>
          <ScrollView showsVerticalScrollIndicator={false} style={[
            styles.scrollContent
          ]}>
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