import React from 'react';
import { NicheResult } from '../types';
import { TrendingUp, Users, DollarSign, Youtube, ChevronRight } from './Icons';

interface NicheCardProps {
  niche: NicheResult;
  onSelect: (niche: NicheResult) => void;
  index: number;
}

export const NicheCard: React.FC<NicheCardProps> = ({ niche, onSelect, index }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500 bg-emerald-500/5 border-emerald-500/20';
    if (score >= 50) return 'text-amber-500 bg-amber-500/5 border-amber-500/20';
    return 'text-rose-500 bg-rose-500/5 border-rose-500/20';
  };

  const getCompetitionColor = (level: string) => {
    if (level === 'Baixa') return 'text-emerald-400 border-emerald-900 bg-emerald-950/30';
    if (level === 'Média') return 'text-amber-400 border-amber-900 bg-amber-950/30';
    return 'text-rose-400 border-rose-900 bg-rose-950/30';
  };

  return (
    <div 
      className="group relative flex flex-col h-full animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Dark Glow Effect behind card */}
      <div className="absolute -inset-0.5 bg-gradient-to-b from-neutral-800 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative h-full flex flex-col bg-black border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-neutral-700 hover:translate-y-[-2px]">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-5 gap-4">
          <h3 className="text-xl font-bold text-neutral-200 leading-tight group-hover:text-white transition-colors">
            {niche.name}
          </h3>
          <div className={`shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-xl border ${getScoreColor(niche.trendScore)}`}>
            <span className="text-xs font-bold">{niche.trendScore}</span>
            <TrendingUp size={12} strokeWidth={3} />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${getCompetitionColor(niche.competitionLevel)}`}>
            Comp: {niche.competitionLevel}
          </span>
           <span className="px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border border-neutral-800 bg-neutral-900 text-neutral-500">
            {niche.searchSources && niche.searchSources.length > 0 ? 'Dados Reais' : 'AI Analysis'}
          </span>
        </div>

        <p className="text-neutral-400 text-sm mb-6 line-clamp-3 leading-relaxed border-t border-neutral-900 pt-4">
          {niche.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
          <div className="bg-neutral-900/50 p-3 rounded-lg border border-neutral-800">
            <div className="flex items-center text-neutral-500 mb-1">
              <Users size={14} className="mr-1.5" />
              <span className="text-xs uppercase font-semibold tracking-wider">Público</span>
            </div>
            <div className="text-xs text-neutral-300 font-medium truncate" title={niche.targetAudience}>
              {niche.targetAudience}
            </div>
          </div>
          
          <div className="bg-neutral-900/50 p-3 rounded-lg border border-neutral-800">
            <div className="flex items-center text-neutral-500 mb-1">
              <DollarSign size={14} className="mr-1.5" />
              <span className="text-xs uppercase font-semibold tracking-wider">Lucro</span>
            </div>
            <div className="text-xs text-neutral-300 font-medium truncate" title={niche.monetizationPotential}>
              {niche.monetizationPotential}
            </div>
          </div>
        </div>

        <button
          onClick={() => onSelect(niche)}
          className="w-full group/btn relative py-3.5 px-4 bg-white text-black font-bold rounded-xl flex items-center justify-center transition-all hover:bg-neutral-200 active:scale-[0.98] overflow-hidden"
        >
          <Youtube size={18} className="mr-2 text-red-600" />
          Ver Estratégia Dark
          <ChevronRight size={16} className="ml-1 opacity-50 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};