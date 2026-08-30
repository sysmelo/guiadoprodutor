import React from 'react';
import { Settings, WifiOff, HardDrive, Keyboard, ShieldCheck, RefreshCw, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';
import { defaultDemoProjects } from '../utils/audioCalculator';

interface SettingsOfflineViewProps {
  onResetData: () => void;
}

export const SettingsOfflineView: React.FC<SettingsOfflineViewProps> = ({ onResetData }) => {
  const flShortcuts = [
    { key: 'F9', action: 'Abrir / Fechar Mixer' },
    { key: 'F5', action: 'Abrir / Fechar Playlist' },
    { key: 'F6', action: 'Abrir / Fechar Channel Rack' },
    { key: 'Ctrl + R (Cmd + R)', action: 'Exportar Áudio WAV direto' },
    { key: 'Ctrl + Shift + R', action: 'Exportar Áudio MP3' },
    { key: 'Ctrl + L', action: 'Roteia canal selecionado para o Mixer' },
    { key: 'Alt + S', action: 'Strumizer no Piano Roll' },
    { key: 'S', action: 'Ferramenta Slip na Playlist' },
    { key: 'C', action: 'Ferramenta Cut (Corte de áudio / fatiar)' },
    { key: 'Mute / Solo (Right-click)', action: 'Isola canal no Mixer' }
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            ARQUITETURA OFFLINE NO NAVEGADOR
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Configurações & Modo Offline
          </h1>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
            O MELO MIX & MASTER ASSISTANT funciona 100% sem internet, APIs ou servidores, armazenando tudo localmente no seu computador.
          </p>
        </div>
      </div>

      {/* Offline Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[#15191E] border border-[#2A2F36] space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <WifiOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Zero Conexão com Internet</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Nenhum dado, áudio ou projeto é enviado para servidores externos. Você pode usar a aplicação no estúdio mesmo sem sinal de internet.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#15191E] border border-[#2A2F36] space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
            <HardDrive className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">LocalStorage Persistente</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Seus projetos, notas, checklists de mix e parâmetros ficam gravados de forma segura no cache local do seu navegador.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#15191E] border border-[#2A2F36] space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Web Audio API</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            O gerador de sinais, ruído rosa e analisador de frequências operam usando os recursos nativos da placa de som do seu computador.
          </p>
        </div>
      </div>

      {/* FL Studio Hotkeys Reference Table */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-white font-extrabold text-base">
          <Keyboard className="w-5 h-5 text-cyan-400" />
          <span>Atalhos Essenciais do FL Studio para Mixagem Rápida</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {flShortcuts.map((sc, idx) => (
            <div key={idx} className="p-3 bg-[#0B0E11] rounded-lg border border-[#2A2F36] space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-[#15191E] px-2 py-0.5 rounded inline-block border border-[#2A2F36]">
                {sc.key}
              </span>
              <span className="text-[11px] text-gray-300 block font-medium mt-1">
                {sc.action}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Philosophy & Golden Rules */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-white font-extrabold text-base">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>Princípios Imutáveis de Engenharia de Áudio</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#0B0E11] rounded-lg border border-[#2A2F36] space-y-1.5">
            <span className="text-xs font-bold text-cyan-400 block">1. O ouvido toma a decisão final</span>
            <p className="text-gray-400 leading-relaxed">
              Plugins e números na tela são guias visuais. Se soa bem nos monitores e fones, está bem.
            </p>
          </div>

          <div className="p-4 bg-[#0B0E11] rounded-lg border border-[#2A2F36] space-y-1.5">
            <span className="text-xs font-bold text-orange-400 block">2. Menos é mais</span>
            <p className="text-gray-400 leading-relaxed">
              Não empilhe 10 plugins em um canal se 2 resolvem. Cada plugin adiciona processamento e possível rotação de fase.
            </p>
          </div>

          <div className="p-4 bg-[#0B0E11] rounded-lg border border-[#2A2F36] space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 block">3. Volume não é qualidade</span>
            <p className="text-gray-400 leading-relaxed">
              Sempre compare o sinal antes e depois do plugin com volume igualado (A/B Matching) para não se enganar.
            </p>
          </div>
        </div>
      </div>

      {/* Storage Reset Danger Zone */}
      <div className="rounded-xl bg-[#15191E] border border-red-500/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Restaurar Padrões de Fábrica do Sistema</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Redefine os projetos e checklists para as demonstrações originais de estúdio.
          </p>
        </div>

        <button
          onClick={onResetData}
          className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Restaurar Demonstrações</span>
        </button>
      </div>
    </div>
  );
};

