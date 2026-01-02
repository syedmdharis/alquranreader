
import React, { useState, useEffect } from 'react';
import { MUSHAF_IMAGE_SOURCES } from '../services/quranApi';

interface PageViewProps {
  pageNumber: number;
}

const PageView: React.FC<PageViewProps> = ({ pageNumber }) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  useEffect(() => {
    setSourceIndex(0);
    setImageLoaded(false);
    setHasFailedAll(false);
  }, [pageNumber]);

  const handleImageError = () => {
    if (sourceIndex < MUSHAF_IMAGE_SOURCES.length - 1) {
      setSourceIndex(prev => prev + 1);
      setImageLoaded(false);
    } else {
      setHasFailedAll(true);
    }
  };

  const currentUrl = MUSHAF_IMAGE_SOURCES[sourceIndex](pageNumber);

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-4 px-2">
      <div className="relative max-w-2xl w-full bg-[#fdfcf5] shadow-[0_25px_60px_rgba(0,0,0,0.18)] rounded-sm border-[14px] border-[#e2dec9] overflow-hidden aspect-[1/1.55]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10 pointer-events-none z-20"></div>

        {!imageLoaded && !hasFailedAll && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fdfcf5] z-30">
            <div className="w-12 h-12 border-4 border-emerald-50 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Loading Page {pageNumber}...</p>
          </div>
        )}

        {hasFailedAll && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-40 p-10 text-center">
            <div className="text-4xl mb-4">📖❌</div>
            <h3 className="text-slate-800 font-bold">Image Load Failed</h3>
            <p className="text-xs text-slate-500 mt-2">Check your internet connection or firewall.</p>
            <button 
                onClick={() => {setSourceIndex(0); setHasFailedAll(false);}}
                className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg"
            >
                Retry
            </button>
          </div>
        )}

        <img 
          src={currentUrl} 
          alt={`Mushaf Page ${pageNumber}`}
          className={`w-full h-full object-contain relative z-10 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold shadow-md">
            {pageNumber}
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.5em]">Standard 15-Line Medina Edition</p>
      </div>
    </div>
  );
};

export default PageView;
