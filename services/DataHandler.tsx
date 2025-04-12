import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { IqamahTime, SalaahTime } from '@/types/dbTypes';
import { SQLiteDatabase } from 'expo-sqlite/next';

export class DataHandler {
  static async loadDatabase() {
    const dbName = 'prayerTimes.db';
    const dbAsset = require('../assets/databases/prayerTimes.db');

    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

    // Always delete and recreate for debugging (remove this in production)
    //await FileSystem.deleteAsync(dbFilePath).catch(() => {});

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
  return result;
}

static async salaahQuery(db: SQLiteDatabase, city: string): Promise<SalaahTime[]> {
  const date = this.formatDateQuery();
  return db.getAllAsync<SalaahTime>(
    `SELECT Fajr, Sunrise, Zawwal, AsrShafiee, AsrHanafee, Sunset, Maghrib, Isha FROM Salahs WHERE Date = ? AND City = ?`,
    [date, city]
  );
}

static async cityQuery(db: SQLiteDatabase): Promise<any[]> {
  const result =  db.getAllAsync<any>(
    `SELECT DISTINCT City FROM Salahs`
  );
  return result;
}

static formatDateQuery() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', {month: 'short'});
    return `${day}-${month}`;
  }
}