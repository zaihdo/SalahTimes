declare module 'hijri-date' {
    export class HijriDate {
      constructor(date?: Date | string | number);
      getDay(): number;
      getDate(): number;
      getMonth(): number;
      getFullYear(): number;
    }
  }
  