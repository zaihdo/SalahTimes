import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const loadDatabase = async () => {
    const dbName = "salah_times.db";
    const dbAsset = require('../../assets/databases/salaah_times.db');
    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if (!fileInfo.exists){
        await FileSystem.makeDirectoryAsync(
            `${FileSystem.documentDirectory}SQLite`, {intermediates: true}
        );
        await FileSystem.downloadAsync(dbUri, dbFilePath);
    }
};

export default function IqamahScreen() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadDatabase()
    .then(() => setDbLoaded(true)).
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
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/Iqamah.tsx" />
    </View>
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
