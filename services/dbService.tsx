// // import * as SQLite from 'expo-sqlite/legacy';

// // const openDatabase = async (): Promise<SQLite.WebSQLDatabase> => {
// //     try {
// //         const db = SQLite.openDatabase('./assets/databases/salaah_times.db');
// //         return db;
// //     } catch (error) {
// //         console.error('Error opening database:', error);
// //         throw error;
// //     }
// // }

// // interface PrayerTimes {
// //     FAJR: string;
// //     SUNRISE: string;
// //     ZAWWAL: string;
// //     'ASR-SHAFIEE': string;
// //     'ASR-HANAFI': string;
// //     SUNSET: string;
// //     MAGHRIB: string;
// //     ISHA: string;
// // }

// // interface QueryResult {
// //     rows: {
// //         _array: PrayerTimes[];
// //     };
// // }

// // export const getPrayerTimesForToday = async (): Promise<PrayerTimes[]> => {
// //     try {
// //         const db = await openDatabase();
// //         const result = await new Promise<QueryResult>((resolve, reject) => {
// //             db.transaction((tx: { executeSql: (arg0: string, arg1: string[], arg2: (_: any, result: any) => void, arg3: (_: any, error: any) => boolean) => void; }) => {
// //                 tx.executeSql(
// //                     'SELECT FAJR, SUNRISE, ZAWWAL, "ASR-SHAFIEE", "ASR-HANAFI", SUNSET, MAGHRIB, ISHA FROM salaah_times WHERE CITY = ? AND DATE = ?',
// //                     ['BOBONONG', '1-Jan'],
// //                     (_: any, result: QueryResult) => {
// //                         resolve(result as QueryResult);
// //                     },
// //                     (_: any, error: any) => {
// //                         reject(error);
// //                         return true; // Indicates that the error was handled
// //                     }
// //                 );
// //             });
// //         });

// //         console.log(result.rows._array);
// //         return result.rows._array;
// //     } catch (error) {
// //         console.error('Error fetching prayer times:', error);
// //         throw error;
// //     }
// // }
// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';

// export const loadDatabase = async () => {
//     const dbName = "salaah_times.db";
//     const dbAsset = require("../assets/databases/salaah_times.db");
//     const dbUri = Asset.fromModule(dbAsset).uri;
//     const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

//     const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

//     if (!fileInfo.exists){
//         await FileSystem.makeDirectoryAsync(
//             `${FileSystem.documentDirectory}SQLite`,
//             {intermediates: true}
//         );
//         await FileSystem.downloadAsync(dbUri, dbFilePath)
//         .then (({uri}) => {
//             console.log('File donwloading to:', dbUri )
//         })
//         .catch (error => {
//             console.error("Error downloading file:", error)
//         });
//     }

// }