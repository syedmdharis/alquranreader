
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  audio?: string;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  surah?: Surah;
  translation?: string;
}

export interface QuranPageResponse {
  number: number;
  ayahs: Ayah[];
  surahs: { [key: string]: Surah };
}

export enum ViewMode {
  PAGE = 'PAGE',
  VERSE = 'VERSE'
}
