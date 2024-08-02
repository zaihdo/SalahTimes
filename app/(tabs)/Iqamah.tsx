import React, { useEffect, useState } from 'react';
import { SQLiteProvider } from 'expo-sqlite/next';
import { ActivityIndicator, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { loadDatabase } from '@/services/dbService';
import List from '@/components/List';
import Suspense from '@/components/Suspense';

export default function IqamahScreen() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadDatabase()
    .then(() => {
      setDbLoaded(true);
    }
    ).
    catch((e: any) => console.error(e));
  }, []);

  if(!dbLoaded) 
    return(
      <View>
        <ActivityIndicator size={"large"}/>
        <Text>Loading...</Text>
      </View>
    ) 
  return (
    <React.Suspense
      fallback={
        <Suspense></Suspense>
      }
    >
      <SQLiteProvider databaseName='prayerTimes.db' assetSource={{assetId: require('../../assets/databases/prayerTimes.db')}} useSuspense>
      <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="app/(tabs)/Iqamah.tsx" /> */}
      <List></List>
    </View>
      </SQLiteProvider>
    </React.Suspense>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
