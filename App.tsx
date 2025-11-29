import React, { useState } from 'react';
import { Region, Category, NicheResult } from './types';
import { searchViralNiches } from './services/geminiService';
import { NicheCard } from './components/NicheCard';
import { VideoStrategyModal } from './components/VideoStrategyModal';
import { 
  Search, 
  Globe, 
  TrendingUp, 
  Loader2, 
  ExternalLink,
  Youtube,
  Zap
} from './components/Icons';

function App() {
  const [selectedRegion, setSelectedRegion] = useState<Region>(Region.GLOBAL);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.TRUE_CRIME);
  const [customQuery, setCustomQuery] = useState('');
  
  const [niches, setNiches] = useState<NicheResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedNiche, setSelectedNiche] = useState<NicheResult | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setNiches([]); // Clear previous results

    try {
      const results = await searchViralNiches(selectedCategory, selectedRegion, customQuery);
      setNiches(results);
    } catch (err) {
      setError("Não foi possível buscar os nichos no momento. Verifique sua chave de API ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-red-900/30 selection:text-red-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
        
        {/* Subtle Dark Glows */}
        <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <header className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                <Youtube className="text-white" size={20} />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Dark<span className="text-neutral-500">Hunter</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs font-medium text-neutral-500">
              <span className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/50 border border-neutral-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                System Online
              </span>
            </div>
          </div>
        </header>

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center">
          
          {/* Hero & Search Section */}
          <div className="w-full max-w-4xl text-center mb-16 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-8">
              <Zap size={12} className="text-white fill-white" />
              Intelligence Unit
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Descubra o Lado <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
                Sombrio do Viral
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Ferramenta avançada para criadores de canais dark. Encontre nichos inexplorados e roteiros de alta retenção.
            </p>

            {/* Search Hub */}
            <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/10 p-2 md:p-3 rounded-3xl shadow-2xl shadow-black/50 max-w-3xl mx-auto transform transition-all hover:scale-[1.01]">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                
                <div className="flex-1 flex flex-col md:flex-row gap-2">
                  <div className="relative flex-1 group">
                    <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors" size={18} />
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as Category)}
                      className="w-full h-12 md:h-14 bg-black text-neutral-200 pl-11 pr-8 rounded-2xl border border-neutral-800 focus:border-neutral-600 focus:ring-0 outline-none appearance-none transition-all cursor-pointer hover:bg-neutral-900"
                    >
                      {Object.values(Category).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative md:w-48 group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-white transition-colors" size={18} />
                    <select 
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value as Region)}
                      className="w-full h-12 md:h-14 bg-black text-neutral-200 pl-11 pr-8 rounded-2xl border border-neutral-800 focus:border-neutral-600 focus:ring-0 outline-none appearance-none transition-all cursor-pointer hover:bg-neutral-900"
                    >
                      {Object.values(Region).map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="h-12 md:h-14 px-8 bg-white hover:bg-neutral-200 text-black font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/5 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap active:scale-95"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Search size={20} />
                      <span className="hidden md:inline">Investigar</span>
                      <span className="md:hidden">Buscar</span>
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-2 md:mt-0 relative px-1 pt-2 pb-1">
                 <input 
                    type="text"
                    placeholder="Opcional: Digite um tema específico..."
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    className="w-full bg-transparent text-sm text-neutral-300 placeholder:text-neutral-700 px-4 py-1 outline-none border-none focus:ring-0 text-center md:text-left"
                 />
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="w-full">
            {error && (
              <div className="max-w-xl mx-auto p-4 bg-red-950/20 border border-red-900/30 text-red-400 rounded-2xl mb-12 text-center flex items-center justify-center gap-2 animate-fadeIn">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                {error}
              </div>
            )}

            {niches.length > 0 && (
              <div className="animate-slideUp">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      Resultados
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-mono">
                        {niches.length}
                      </span>
                    </h2>
                    {niches[0].searchSources && niches[0].searchSources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-600">
                        {niches[0].searchSources.slice(0, 3).map((source, idx) => (
                          <a 
                            key={idx} 
                            href={source.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center hover:text-white transition-colors"
                          >
                            <ExternalLink size={10} className="mr-1" />
                            {source.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {niches.map((niche, idx) => (
                    <NicheCard 
                      key={niche.id} 
                      niche={niche} 
                      index={idx} 
                      onSelect={setSelectedNiche} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </main>

        <footer className="w-full py-8 text-center border-t border-white/5 bg-black mt-auto">
          <p className="text-neutral-600 text-xs font-medium uppercase tracking-widest">
            Criado por <span className="text-neutral-300 font-bold ml-1">SERGIO CARDOSO DE SOUSA</span>
          </p>
        </footer>

      </div>

      <VideoStrategyModal 
        niche={selectedNiche} 
        region={selectedRegion}
        onClose={() => setSelectedNiche(null)} 
      />

    </div>
  );
}

export default App;