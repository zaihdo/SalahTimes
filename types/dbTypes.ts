export interface SalaahTime {
    id: number;
    city: string;
    date: string;
    fajr: string;
    sunrise: string;
    zawwal: string;
    'asr-shafiee': string;
    'asr-hanafee': string;
    sunset: string;
    maghrib: string;
    isha: string;
}

export interface IqamahTime {
    id: number;
    Masjid: string;
    Date: string;
    Fajr: string;
    Dhuhr: string;
    'Dhuhr-sunday': string;
    Asr: string;
    Maghrib: string;
    Isha: string;
}

export interface Masjid {
    Masjid: string;
}