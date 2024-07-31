import React from 'react'
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const loadDatabase = async () => {
    const dbName = "salah_times.db";
    const dbAsset = require('../assets/databases/salaah_times.db');
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

export default function dbService() {
  return (
    <div>dbService</div>
  )
}
