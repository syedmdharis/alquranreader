
import React from 'react';
import { Ayah } from '../types';

interface VerseViewProps {
  ayahs: (Ayah & { translation?: string })[];
  isLoading: boolean;
}

const VerseView: React.FC<VerseViewProps> = ({ ayahs, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
        <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Verses...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      {ayahs.map((ayah) => (
        <div key={ayah.number} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
          <div className="bg-slate-50/50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/50 px-3 py-1 rounded-full uppercase">
               {ayah.surah?.englishName || 'Surah'} {ayah.numberInSurah}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Juz {ayah.juz} • Page {ayah.page}
            </span>
          </div>
          
          <div className="p-8 md:p-10 flex flex-col gap-8">
            <p className="arabic-font text-4xl md:text-5xl text-right text-slate-900 leading-[2.2] md:leading-[2.5]">
              {ayah.text}
              <span className="inline-flex items-center justify-center w-10 h-10 border border-emerald-100 rounded-full text-sm font-sans mr-6 text-emerald-800 bg-emerald-50/30 font-bold">
                {ayah.numberInSurah}
              </span>
            </p>
            
            <div className="pt-8 border-t border-slate-50">
              <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
                {ayah.translation}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerseView;
