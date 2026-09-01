import React, { useState } from 'react';
import { audioPluginsData } from '../data/pluginsData';
import { Plug, Search, Sparkles, CheckCircle2, ShieldAlert, Sliders, ExternalLink, Layers } from 'lucide-react';
import { PluginCategory, PluginType } from '../types';

export const PluginsView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'ALL' | PluginType>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | PluginCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | 'Mix' | 'Master' | 'Mix & Master' | 'Bus & Send'>('ALL');

  const filteredPlugins = audioPluginsData.filter((plugin) => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.functions.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          plugin.problemsSolved.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          plugin.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || plugin.type === selectedType;
    const matchesCategory = selectedCategory === 'ALL' || plugin.category === selectedCategory;
    const matchesLevel = selectedLevel === 'ALL' || plugin.level === selectedLevel;

    return matchesSearch && matchesType && matchesCategory && matchesLevel;
  });

  const pluginTypeLabels: { id: 'ALL' | PluginType; label: string; color: string }[] = [
    { id: 'ALL', label: 'Todos os Fabricantes', color: 'border-gray-500 text-gray-300' },
    { id: 'FL Native', label: '🟠 FL Studio Nativo', color: 'border-orange-500/40 text-orange-400' },
    { id: 'Studio One Native', label: '🔵 Studio One Nativo', color: 'border-blue-500/40 text-blue-400' },
    { id: 'Waves Audio', label: '🔷 Waves Audio', color: 'border-indigo-500/40 text-indigo-400' },
    { id: 'FabFilter', label: '🟢 FabFilter', color: 'border-emerald-500/40 text-emerald-400' },
    { id: 'Soundtoys', label: '🔴 Soundtoys', color: 'border-rose-500/40 text-rose-400' },
    { id: 'iZotope', label: '🟣 iZotope', color: 'border-purple-500/40 text-purple-400' },
    { id: 'Slate Digital', label: '🟡 Slate Digital', color: 'border-yellow-500/40 text-yellow-400' },
    { id: 'Universal Audio', label: '⚪ Universal Audio (UAD)', color: 'border-slate-400 text-slate-300' },
    { id: 'Antares & Celemony', label: '🎯 Auto-Tune & Melodyne', color: 'border-cyan-500/40 text-cyan-400' },
    { id: 'Valhalla & Oeksound', label: '✨ Valhalla & Soothe2', color: 'border-teal-500/40 text-teal-400' },
    { id: 'Free External', label: '🎁 Gratuitos (Free)', color: 'border-lime-500/40 text-lime-400' }
  ];

  return (
    <div className="p-3 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-2xl bg-[#15191E] border border-[#2A2F36] p-4 sm:p-6 md:p-8 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              <Plug className="w-3.5 h-3.5" />
              ARSENAL MULTI-DAW & PLUGINS DA INDÚSTRIA
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              Banco de Dados de Efeitos e Plugins
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Guia técnico comparativo completo: efeitos nativos do <strong className="text-orange-400">FL Studio</strong> e <strong className="text-blue-400">Studio One</strong>, além das maiores empresas da indústria musical mundial (<strong className="text-indigo-400">Waves Audio</strong>, <strong className="text-emerald-400">FabFilter</strong>, <strong className="text-rose-400">Soundtoys</strong>, <strong className="text-purple-400">iZotope</strong>, <strong className="text-cyan-400">Antares</strong>, <strong className="text-slate-300">UAD</strong> e <strong className="text-lime-400">Free Plugins</strong>).
            </p>
          </div>

          <div className="p-3 bg-[#0B0E11] border border-[#2A2F36] rounded-xl text-left md:text-right shrink-0">
            <span className="text-[10px] text-gray-500 font-mono block">TOTAL CATALOGADO</span>
            <span className="text-xl font-mono font-extrabold text-cyan-400">{filteredPlugins.length} / {audioPluginsData.length}</span>
            <span className="text-[10px] text-gray-400 block">Plugins com presets</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#15191E] border border-[#2A2F36] space-y-3.5 shadow-lg">
        {/* Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome do plugin (ex: Pro-Q 3, CLA-76, Decapitator, Fruity Limiter, Melodyne)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0E11] border border-[#2A2F36] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Plugin Ecosystem / Brand Selector */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block">
            Fabricante / DAW:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {pluginTypeLabels.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-sm'
                      : `bg-[#0B0E11] ${type.color} hover:text-white hover:border-gray-400`
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-1.5 pt-2 border-t border-[#2A2F36]">
          <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block">
            Tipo de Processamento:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'ALL', label: 'Todas as Funções' },
              { id: 'Equalizador', label: 'Equalizadores' },
              { id: 'Compressor', label: 'Compressores' },
              { id: 'De-Esser', label: 'De-Essers' },
              { id: 'Saturação / Distorção', label: 'Saturação & Distorção' },
              { id: 'Reverb & Espaço', label: 'Reverb & Ambiência' },
              { id: 'Delay', label: 'Delay & Ecos' },
              { id: 'Limiter & Clipper', label: 'Limiter & Clipper' },
              { id: 'Afinação & Correção', label: 'Afinação & Correção' },
              { id: 'Channel Strip', label: 'Channel Strips' },
              { id: 'Stereo & Utility', label: 'Estéreo & Utilitários' },
              { id: 'Analisador & Medição', label: 'Análise & Medição' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500 shadow-sm'
                    : 'bg-[#0B0E11] text-gray-400 hover:text-white border border-[#2A2F36]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
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
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    plugin.type === 'FL Native' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30' :
                    plugin.type === 'Studio One Native' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                    plugin.type === 'Waves Audio' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' :
                    plugin.type === 'FabFilter' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    plugin.type === 'Soundtoys' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                    plugin.type === 'iZotope' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                    plugin.type === 'Slate Digital' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                    plugin.type === 'Universal Audio' ? 'bg-slate-400/10 text-slate-300 border border-slate-400/30' :
                    plugin.type === 'Antares & Celemony' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                    plugin.type === 'Valhalla & Oeksound' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30' :
                    'bg-lime-500/10 text-lime-400 border border-lime-500/30'
                  }`}>
                    {plugin.type}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono ml-2">
                    {plugin.category}
                  </span>
                </div>

                <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-[#0B0E11] text-gray-400 border border-[#2A2F36]">
                  {plugin.level}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-lg font-extrabold text-white leading-tight">
                  {plugin.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {plugin.description}
                </p>
              </div>

              {/* Suggested Parameters */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider block">
                  ⚙️ Parâmetros Recomendados:
                </span>
                <div className="space-y-1 bg-[#0B0E11] p-3 rounded-lg border border-[#2A2F36]">
                  {plugin.suggestedParams.map((param, idx) => (
                    <div key={idx} className="text-[11px] text-gray-200 font-mono flex items-start gap-1.5">
                      <span className="text-cyan-400 shrink-0 font-bold">•</span>
                      <span>{param}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problems Solved */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">
                  🎯 Problemas que Resolve:
                </span>
                <div className="flex flex-wrap gap-1">
                  {plugin.problemsSolved.map((prob, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/5 text-emerald-300 border border-emerald-500/20">
                      {prob}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips & Warnings Footer */}
            <div className="space-y-2 pt-3 border-t border-[#2A2F36]">
              {plugin.tips.length > 0 && (
                <div className="p-2.5 rounded bg-cyan-500/5 border border-cyan-500/20 text-[11px] text-cyan-200 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{plugin.tips[0]}</span>
                </div>
              )}
              {plugin.warnings.length > 0 && (
                <div className="p-2.5 rounded bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
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
