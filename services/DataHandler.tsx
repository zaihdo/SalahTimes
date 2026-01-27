import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { IqamahTime, SalaahTime } from '../types/dbTypes';
import { SQLiteDatabase } from 'expo-sqlite';

export class DataHandler {
  static async loadDatabase() {
    const dbName = 'prayerTimes.db';
    const dbAsset = require('../assets/databases/prayerTimes.db');

    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.Directory}SQLite/${dbName}`;

    // Always delete and recreate for debugging (remove this in production)
    //await FileSystem.deleteAsync(dbFilePath).catch(() => {});

    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if (!fileInfo.exists){
        await FileSystem.makeDirectoryAsync(
            `${FileSystem.Directory}SQLite`, {intermediates: true}
        );
        await FileSystem.downloadAsync(dbUri, dbFilePath);
    }
};


static async iqamahQuery(db: SQLiteDatabase, masjid: string): Promise<IqamahTime[]> {
  const date = this.formatDateQuery(new Date());
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

static async cityQuery(db: SQLiteDatabase): Promise<any[]> {
  const result =  db.getAllAsync<any>(
    `SELECT DISTINCT City FROM Salahs`
  );
  return result;
}

static async salaahQueryForDate(db: SQLiteDatabase, city: string, dateObj: Date): Promise<SalaahTime[]> {
    const date = this.formatDateQuery(dateObj);
    // console.log('Querying salaah times for', city, 'on', date);
    return db.getAllAsync<SalaahTime>(
      `SELECT Fajr, Sunrise, Zawwal, AsrShafiee, AsrHanafee, Sunset, Maghrib, Isha FROM Salahs WHERE Date = ? AND City = ?`,
      [date, city]
    );
  }

static formatDateQuery(dateObj: Date) {
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', {month: 'short'});
    return `${day}-${month}`;
  }

/**
   * Return the current prayer name for given city/date.
   * Uses today's salaah times for the city and finds which prayer period `now` falls into.
   * 
   * @returns One of: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'Dhuha' | null
   * 
   * Note: 'Dhuha' is a special voluntary prayer period between Sunrise and Zawwal (Dhuhr).
   * It is not part of the five obligatory prayers and is returned separately to allow
   * consumers to handle it distinctly (e.g., display it differently in the UI or exclude it).
   * The five obligatory prayers are determined by their scheduled times in the database.
   */
  static async getCurrentPrayer(db: SQLiteDatabase, city: string, dateObj: Date = new Date()): Promise<string | null> {
    try {
      const rows = await this.salaahQueryForDate(db, city, dateObj);
      if (!Array.isArray(rows) || rows.length === 0) return null;

      const row = rows[0] as any;

      // pick the preferred Asr and Dhuhr columns if present
      const fajr = row.Fajr;
      const sunrise = row.Sunrise;
      const zawwal = row.Zawwal;
      const dhuhr = row.Zawwal ?? row.Dhuhr ?? row.DhuhrSunday;
      const asr = row.AsrShafiee ?? row.AsrHanafee ?? row.Asr;
      const maghrib = row.Maghrib ?? row.Sunset;
      const isha = row.Isha;

      const candidatePrayers: { name: string; timeStr: any }[] = [
        { name: 'Fajr', timeStr: fajr },
        { name: 'Dhuhr', timeStr: dhuhr },
        { name: 'Asr', timeStr: asr },
        { name: 'Maghrib', timeStr: maghrib },
        { name: 'Isha', timeStr: isha },
      ];

      // helper: parse time string like "05:45" or "5:45" or "17:30:00"
      const parseTimeToDate = (base: Date, t: string | number | undefined | null): Date | null => {
        if (!t && t !== 0) return null;
        if (typeof t === 'number') {
          // asset id or numeric unexpected -> skip
          return null;
        }
        const s = String(t).trim();
        // try HH:MM[:SS] 24h
        const m = s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
        if (!m) return null;
        const hh = parseInt(m[1], 10);
        const mm = parseInt(m[2], 10);
        const ss = m[3] ? parseInt(m[3], 10) : 0;
        const d = new Date(base.getFullYear(), base.getMonth(), base.getDate(), hh, mm, ss, 0);
        return d;
      };

      const baseDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0, 0);
      const now = dateObj;

      // Check if current time is between Sunrise and Zawwal (Dhuha time)
      const sunriseDate = parseTimeToDate(baseDate, sunrise);
      const zawwalDate = parseTimeToDate(baseDate, zawwal);
      if (sunriseDate && zawwalDate) {
        const nowTime = now.getTime();
        if (nowTime >= sunriseDate.getTime() && nowTime < zawwalDate.getTime()) {
          return 'Dhuha';
        }
      }

      const entries = candidatePrayers
        .map(p => ({ name: p.name, date: parseTimeToDate(baseDate, p.timeStr) }))
        .filter(e => e.date !== null) as { name: string; date: Date }[];

      if (entries.length === 0) return null;

      // sort ascending by time
      entries.sort((a, b) => a.date.getTime() - b.date.getTime());

      // find first entry with time > now
      const idxNext = entries.findIndex(e => e.date.getTime() > now.getTime());

      if (idxNext === -1) {
        // now is after or equal to last prayer => current is last prayer
        return entries[entries.length - 1].name;
      }

      if (idxNext === 0) {
        // now is before the first prayer (i.e. before Fajr) => treat current as last prayer (previous day's Isha)
        return entries[entries.length - 1].name;
      }

      // otherwise current prayer is previous entry
      return entries[idxNext - 1].name;
    } catch (err) {
      if (__DEV__) {
        console.error('[DataHandler] getCurrentPrayer error', err);
      }
      return null;
    }
  }

  static capitalize(str: string): string {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  static toUpperCase(str: string): string {
    if (!str) return '';
    return str.toUpperCase();
  }

}

