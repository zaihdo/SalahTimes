import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { Text, View } from '@/components/Themed';
import List from '@/components/List';
import Suspense from '@/components/Suspense';
import { IqamahTime } from '@/types/dbTypes';
import { DataHandler } from '@/services/DataHandler';
import { useLocalSearchParams } from 'expo-router';
import { Utilities } from '@/util/Utilities';

interface IqamahProps {
  Name: string;
}

export default function IqamahScreen(Masjid: IqamahProps) {
  const [iqamahs, setIqamahs] = useState<IqamahTime[]>([]);
  const {query} = useLocalSearchParams<{query: string}>(); 
  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      console.log(query);
      const results = await DataHandler.iqamahQuery(db, query);
      setIqamahs(results);
      
    });
  }, [db])
  return (
    <React.Suspense
    fallback={
      <Suspense></Suspense>
    }
    >
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <EditScreenInfo path="app/modal.tsx" />
     {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />   */}
     <Text style={styles.title} lightColor='rgba(16, 37, 64, 0.8)'>{Utilities.getFormattedDate(new Date())}</Text>
      <List iqamahs={iqamahs} masjid={query.toLowerCase()}></List>
    </View>
  </React.Suspense>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#222',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingTop: 2,
    // margin: 10
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


// interface IqamahProps {
//   Name: string;
// }

// export default function IqamahScreen(Masjid: IqamahProps) {
//   const [iqamahs, setIqamahs] = useState<IqamahTime[]>([]);
//   const {query} = useLocalSearchParams<{query: string}>(); 
//   const db = useSQLiteContext();

//   useEffect(() => {
//     db.withTransactionAsync(async () => {
//       console.log(query);
//       const results = await DataHandler.iqamahQuery(db, query);
//       setIqamahs(results);
      
//     });
//   }, [db])

//   return (
    // <React.Suspense
    //   fallback={
    //     <Suspense></Suspense>
    //   }
    // >
    //   <View style={styles.container}>
    //     <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //     <List iqamahs={iqamahs} masjid={query.toLowerCase()}></List>
    //   </View>
    // </React.Suspense>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
