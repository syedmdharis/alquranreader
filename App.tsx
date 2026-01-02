
import React, { useState, useEffect } from 'react';
import { Surah, Ayah, ViewMode } from './types';
import { fetchSurahs, fetchPageVerses } from './services/quranApi';
import Navigation from './components/Navigation';
import PageView from './components/PageView';
import VerseView from './components/VerseView';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PAGE);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [pageAyahs, setPageAyahs] = useState<(Ayah & { translation?: string })[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchSurahs().then(setSurahs).catch(console.error);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchPageVerses(currentPage)
      .then(setPageAyahs)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  const handleSurahChange = async (surahNum: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`);
      const data = await res.json();
      setCurrentPage(data.data.ayahs[0].page);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Navigation 
        surahs={surahs}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onSurahChange={handleSurahChange}
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsNavOpen(true)} className="p-2 hover:bg-slate-100 rounded-lg lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-emerald-900 hidden sm:block">Al-Qur'an Al-Kareem</h1>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner scale-90 sm:scale-100">
            <button 
              onClick={() => setViewMode(ViewMode.PAGE)}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${viewMode === ViewMode.PAGE ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'}`}
            >
              MUSHAF
            </button>
            <button 
              onClick={() => setViewMode(ViewMode.VERSE)}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${viewMode === ViewMode.VERSE ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'}`}
            >
              LIST
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} className="p-2 hover:bg-emerald-50 text-emerald-700 disabled:opacity-30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
              </svg>
            </button>
            <span className="text-sm font-bold text-emerald-900 w-8 text-center">{currentPage}</span>
            <button onClick={() => setCurrentPage(p => Math.min(604, p+1))} className="p-2 hover:bg-emerald-50 text-emerald-700 disabled:opacity-30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {viewMode === ViewMode.PAGE ? (
              <PageView pageNumber={currentPage} />
            ) : (
              <VerseView ayahs={pageAyahs} isLoading={isLoading} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
