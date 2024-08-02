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
    masjid: string;
    date: string;
    fajr: string;
    dhuhr: string;
    'dhuhr-sunday': string;
    asr: string;
    maghrib: string;
    isha: string;
}