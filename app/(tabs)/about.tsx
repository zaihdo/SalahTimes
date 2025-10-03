import React, { useEffect, useState, useRef } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import Suspense from '../../components/Suspense';
import { DataHandler } from '../../services/DataHandler';
import { useColorScheme } from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import Accordion from '../../components/Accordion';
import data from '../../assets/data/about-data';
import { useScreenSize } from '../../hooks/useScreenSize';
import { Dimensions, Platform } from 'react-native';

export default function AboutScreen() {
  const [cities, setCities] = useState<any[]>([]);
  const colorScheme = useColorScheme();
  const db = useSQLiteContext();
  const { isSmall, isLarge } = useScreenSize();
  const scrollViewRef = React.createRef<ScrollView>();
  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    db.withTransactionAsync(async () => {
      const cityNames = await DataHandler.cityQuery(db);
      setCities(cityNames);
    });
  }, [db]);

  const containerPadding = isSmall ? 12 : isLarge ? 24 : 16;

  const handleAccordionPress = (index: number) => {
    // if ((isSmall || isAndroid) && scrollViewRef.current) {
    //   const accordionOffset = index * 200; // Replace with the actual height of the Accordion component
    //   const screenHeight = Dimensions.get('window').height;
    //   scrollViewRef.current?.scrollTo({ x: 0, y: accordionOffset - screenHeight / 2, animated: true });  
    // }
  };

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
          <ScrollView 
            ref={scrollViewRef} 
            showsVerticalScrollIndicator={false} 
            style={[
              styles.scrollContent
            ]}
          >
            {data.map((value, index) => {
              return <Accordion value={value} key={index} type={value.type} onPress={() => handleAccordionPress(index)} />;
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
    paddingBottom: 0,
    paddingTop: 0,
  }
});