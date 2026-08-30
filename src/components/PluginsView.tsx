import React, { useState } from 'react';
import { audioPluginsData } from '../data/pluginsData';
import { Plug, Search, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PluginCategory, PluginType } from '../types';

export const PluginsView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'ALL' | PluginType>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | PluginCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPlugins = audioPluginsData.filter((plugin) => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.functions.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          plugin.problemsSolved.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'ALL' || plugin.type === selectedType;
    const matchesCategory = selectedCategory === 'ALL' || plugin.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              <Plug className="w-3.5 h-3.5" />
              ARSENAL DE FERRAMENTAS DE ÁUDIO
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Banco de Dados de Plugins
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Guia técnico completo dos plugins nativos do FL Studio, suíte FabFilter e as melhores ferramentas gratuitas da indústria.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-xl bg-[#15191E] border border-[#2A2F36] space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome de plugin, função ou problema resolvido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Plugin Type Filter */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#0B0E11] border border-[#2A2F36] shrink-0">
            {[
              { id: 'ALL', label: 'Todos os Arsenais' },
              { id: 'FL Native', label: 'Nativo FL Studio' },
              { id: 'FabFilter', label: 'FabFilter' },
              { id: 'Free External', label: 'Gratuitos (Free)' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as typeof selectedType)}
                className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  selectedType === type.id
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#2A2F36]">
          {[
            { id: 'ALL', label: 'Todas as Categorias' },
            { id: 'Equalizador', label: 'Equalizadores' },
            { id: 'Compressor', label: 'Compressores' },
            { id: 'De-Esser', label: 'De-Essers' },
            { id: 'Saturação / Distorção', label: 'Saturação' },
            { id: 'Reverb & Espaço', label: 'Reverb' },
            { id: 'Delay', label: 'Delay' },
            { id: 'Limiter & Clipper', label: 'Limiter & Clipper' },
            { id: 'Analisador & Medição', label: 'Analisadores' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
              className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0B0E11] text-cyan-400 border border-cyan-500/50 shadow-sm'
                  : 'bg-[#0B0E11] text-gray-400 hover:text-white border border-[#2A2F36]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlugins.map((plugin) => (
          <div
            key={plugin.id}
            className="rounded-xl bg-[#15191E] border border-[#2A2F36] hover:border-cyan-500/40 p-5 space-y-4 shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                    plugin.type === 'FL Native' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    plugin.type === 'FabFilter' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {plugin.type}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1.5">{plugin.name}</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0E11] border border-[#2A2F36] text-gray-400">
                  {plugin.category}
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                {plugin.description}
              </p>

              {/* Key Functions */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Principais Funções
                </span>
                {plugin.functions.slice(0, 3).map((func, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-300">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    <span>{func}</span>
                  </div>
                ))}
              </div>

              {/* Parameter tips */}
              <div className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-xs space-y-1">
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block">
                  Valores Sugeridos
                </span>
                {plugin.suggestedParams.map((param, idx) => (
                  <p key={idx} className="text-[11px] text-gray-300 font-mono leading-relaxed">
                    • {param}
                  </p>
                ))}
              </div>
            </div>

            {/* Tips & Warnings */}
            <div className="pt-3 border-t border-[#2A2F36] space-y-2">
              {plugin.tips.length > 0 && (
                <div className="text-[11px] text-emerald-300 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                  <span>{plugin.tips[0]}</span>
                </div>
              )}
              {plugin.warnings.length > 0 && (
                <div className="text-[11px] text-amber-300 flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                  <span>{plugin.warnings[0]}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

