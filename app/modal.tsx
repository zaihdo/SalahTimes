// import { StatusBar } from 'expo-status-bar';
// import { Platform, StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function ModalScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Modal</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/modal.tsx" />

//       {/* Use a light status bar on iOS to account for the black space above the modal */}
//       <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
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
import React, { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import List from '@/components/List';
import Suspense from '@/components/Suspense';
import { IqamahTime } from '@/types/dbTypes';
import { DataHandler } from '@/services/DataHandler';
import { useLocalSearchParams } from 'expo-router';

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
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <List iqamahs={iqamahs}></List>
    </View>
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
