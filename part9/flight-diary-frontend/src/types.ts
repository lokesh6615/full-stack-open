export interface Diary {
  id: number;
  date: string;
  visibility: string;
  weather: string;
  comment?: string;
}

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type NewDiaryEntry = Omit<Diary, 'id'>;

export type NonSensitiveDiaryEntry = Omit<Diary, 'comment'>;
