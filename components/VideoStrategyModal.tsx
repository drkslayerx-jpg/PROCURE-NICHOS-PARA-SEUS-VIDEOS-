import React, { useState, useEffect } from 'react';
import { NicheResult, VideoIdea, Region } from '../types';
import { generateVideoStrategy } from '../services/geminiService';
import { Loader2, Zap, AlertCircle, TrendingUp, X, Youtube } from './Icons';

interface VideoStrategyModalProps {
  niche: NicheResult | null;
  region: Region;
  onClose: () => void;
}

export const VideoStrategyModal: React.FC<VideoStrategyModalProps> = ({ niche, region, onClose }) => {
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (niche) {
      setLoading(true);
      setError(null);
      generateVideoStrategy(niche.name, region)
        .then(setIdeas)
        .catch((err) => setError("Falha ao gerar estratégias. Tente novamente."))
        .finally(() => setLoading(false));
    } else {
      setIdeas([]);
    }
  }, [niche, region]);

  if (!niche) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn">
      <div className="bg-black w-full max-w-4xl max-h-[90vh] rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Decorative Grid within Modal */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none"></div>

        {/* Header */}
        <div className="relative p-6 md:p-8 border-b border-neutral-800 bg-neutral-900/20 flex justify-between items-start z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-red-950/30 text-red-500 border border-red-900/30">
                Confidencial
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-neutral-800 text-neutral-400 border border-neutral-700">
                {region}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white leading-tight">
              {niche.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="group p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 text-neutral-500 hover:text-white transition-all border border-neutral-800 hover:border-neutral-700"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-y-auto p-6 md:p-8 space-y-8 z-10 custom-scrollbar">
          
          {/* Analysis Section */}
          <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 md:p-6">
            <h3 className="text-neutral-400 font-semibold mb-3 flex items-center text-sm uppercase tracking-wider">
              <TrendingUp size={16} className="mr-2" />
              Análise de Viralização
            </h3>
            <p className="text-neutral-200 text-lg leading-relaxed">{niche.reasonForVirality}</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/10">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full"></div>
                <Loader2 size={48} className="relative animate-spin text-red-600 mb-6" />
              </div>
              <p className="text-neutral-500 font-mono text-sm animate-pulse">Acessando dados secretos...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-10 text-red-400 bg-red-950/10 rounded-2xl border border-red-900/50">
              <AlertCircle size={48} className="mb-4 opacity-50" />
              <p>{error}</p>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Youtube size={24} className="text-red-600" />
                3 Roteiros Dark
              </h3>
              
              <div className="space-y-6">
                {ideas.map((idea, idx) => (
                  <div key={idx} className="group bg-neutral-900/40 rounded-2xl p-6 md:p-8 border border-neutral-800 hover:border-neutral-600 transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div className="hidden md:flex bg-neutral-900 text-neutral-500 font-mono font-bold w-10 h-10 rounded-xl items-center justify-center border border-neutral-800 group-hover:text-white transition-colors">
                        0{idx + 1}
                      </div>
                      
                      <div className="flex-1 space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="md:hidden text-xs font-mono font-bold text-neutral-500">#{idx + 1}</span>
                            <span className="text-[10px] font-bold uppercase text-red-500 tracking-wider bg-red-950/30 px-2 py-0.5 rounded border border-red-900/20">Título</span>
                          </div>
                          <h4 className="text-xl md:text-2xl font-bold text-neutral-100 group-hover:text-white transition-colors">
                            {idea.title}
                          </h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-black/50 p-4 rounded-xl border border-neutral-800">
                            <span className="text-xs font-bold uppercase text-blue-400 tracking-wider flex items-center gap-1.5 mb-2">
                              <Zap size={14} className="fill-blue-400/20" /> Hook (0-15s)
                            </span>
                            <p className="text-neutral-300 text-sm leading-relaxed italic border-l-2 border-blue-900 pl-3">
                              "{idea.hook}"
                            </p>
                          </div>
                          <div className="bg-black/50 p-4 rounded-xl border border-neutral-800">
                            <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider mb-2 block">
                              Conceito da Capa
                            </span>
                            <p className="text-neutral-300 text-sm leading-relaxed">
                              {idea.thumbnailConcept}
                            </p>
                          </div>
                        </div>

                        <div>
                           <span className="text-[10px] font-bold uppercase text-neutral-600 tracking-wider mb-3 block">
                              Estrutura
                            </span>
                            <div className="flex flex-col gap-2">
                              {idea.outline.map((point, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                                  <div className="min-w-[4px] h-[4px] mt-2 rounded-full bg-neutral-700" />
                                  <span>{point}</span>
                                </div>
                              ))}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};