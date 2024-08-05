import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { IqamahTime, Masjid } from '@/types/dbTypes';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite/next';

export class DataHandler {
  static async loadDatabase() {
    const dbName = 'salahAndIqamahTimes.db';
    const dbAsset = require('../assets/databases/prayerTimes.db');
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

static async iqamahQuery(db: SQLiteDatabase, masjid: string): Promise<IqamahTime[]> {
  const date = this.formatDateQuery();
  return db.getAllSync<IqamahTime>(
    `SELECT Fajr, Dhuhr, DhuhrSunday, Asr, Maghrib, Isha FROM Iqamahs WHERE Date = ? AND Masjid = ?`,
    [date, masjid]
  );
}

static async masjidQuery(db: SQLiteDatabase): Promise<any[]> {
  const result =  db.getAllAsync<any>(
    `SELECT DISTINCT Masjid FROM Iqamahs`
  );
  console.log(result);
  return result;
}

static formatDateQuery() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', {month: 'short'});
    return `${day}-${month}`;
  }
}