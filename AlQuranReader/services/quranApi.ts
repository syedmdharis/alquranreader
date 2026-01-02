
import { Surah, Ayah } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchSurahs = async (): Promise<Surah[]> => {
  const response = await fetch(`${BASE_URL}/surah`);
  const data = await response.json();
  return data.data;
};

export const fetchPageVerses = async (pageNumber: number, edition: string = 'en.asad'): Promise<Ayah[]> => {
  const [arabicRes, transRes] = await Promise.all([
    fetch(`${BASE_URL}/page/${pageNumber}/quran-uthmani`),
    fetch(`${BASE_URL}/page/${pageNumber}/${edition}`)
  ]);
  
  const arabicData = await arabicRes.json();
  const transData = await transRes.json();
  
  return arabicData.data.ayahs.map((ayah: Ayah, index: number) => ({
    ...ayah,
    translation: transData.data.ayahs[index].text
  }));
};

/**
 * Robust 15-line Mushaf Image Sources
 * Cycles through these to ensure 100% uptime
 */
export const MUSHAF_IMAGE_SOURCES = [
  // 1. King Saud University (Standard Medina Script)
  (n: number) => `https://quran.ksu.edu.sa/png_big/${n}.png`,
  
  // 2. Quran.com V4 Professional CDN
  (n: number) => `https://community-images.quran.com/v2/pages/mushaf/1/1024/${n}.png`,
  
  // 3. Android Quran Data (Padding logic)
  (n: number) => `https://android.quran.com/data/width_1024/page${n.toString().padStart(3, '0')}.png`,
  
  // 4. EveryAyah Mirror
  (n: number) => `https://everyayah.com/data/quran_pages_png/${n}.png`,
  
  // 5. GitHub High-Availability Mirror
  (n: number) => `https://raw.githubusercontent.com/mushaf-images/hafs_15_lines/master/images/page${n.toString().padStart(3, '0')}.png`
];
