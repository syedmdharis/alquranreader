
import React from 'react';
import { Surah } from '../types';

interface NavigationProps {
  surahs: Surah[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onSurahChange: (surahNum: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  surahs, 
  currentPage, 
  onPageChange, 
  onSurahChange,
  isOpen,
  onClose
}) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 bg-emerald-900 text-white">
            <h2 className="text-xl font-bold">Quran Navigator</h2>
            <p className="text-xs text-emerald-200 mt-1">Medina 15-Line Mushaf</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <section>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Go to Page</h3>
              <div className="px-2">
                <input 
                  type="number"
                  min="1"
                  max="604"
                  placeholder="Page (1-604)..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = parseInt((e.target as HTMLInputElement).value);
                      if (val >= 1 && val <= 604) {
                        onPageChange(val);
                        onClose();
                      }
                    }
                  }}
                />
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Surahs</h3>
              <div className="space-y-1">
                {surahs.map((surah) => (
                  <button
                    key={surah.number}
                    onClick={() => {
                      onSurahChange(surah.number);
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between hover:bg-emerald-50 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] w-6 h-6 flex items-center justify-center bg-slate-100 group-hover:bg-emerald-100 group-hover:text-emerald-700 rounded-full text-slate-500 font-mono font-bold transition-colors">
                        {surah.number}
                      </span>
                      <span className="text-slate-700 font-medium group-hover:text-emerald-900">{surah.englishName}</span>
                    </div>
                    <span className="arabic-font text-xl text-slate-400 group-hover:text-emerald-600">{surah.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
