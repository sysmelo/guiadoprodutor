import React from 'react';
import { Keyboard, X, Sparkles, Command } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcutGroups = [
    {
      category: 'Navegação Rápida entre Módulos (Global)',
      shortcuts: [
        { keys: ['Ctrl', '1'], label: 'Dashboard Geral' },
        { keys: ['Ctrl', '2'], label: 'Gravação & Tracking de Vocal (NOVO)' },
        { keys: ['Ctrl', '3'], label: 'Mix & Preparação (Checklist)' },
        { keys: ['Ctrl', '4'], label: 'Vocal Cleaning (Correção de Problemas)' },
        { keys: ['Ctrl', '5'], label: 'Master Suite (Cadeia de Master)' },
        { keys: ['Ctrl', '6'], label: 'Guia de Instrumentos & Frequências' },
        { keys: ['Ctrl', '7'], label: 'Estilos Musicais & Gêneros' },
        { keys: ['Ctrl', '8'], label: 'Plugins & Arsenal de Áudio' },
        { keys: ['Ctrl', '9'], label: 'Mix Doctor (Diagnóstico de Erros)' },
        { keys: ['Ctrl', '0'], label: 'Exportação & Entrega' },
        { keys: ['Ctrl', 'P'], label: 'Meus Projetos & Sessões' },
        { keys: ['Ctrl', ','], label: 'Configurações & Modo Offline' }
      ]
    },
    {
      category: 'Ferramentas de Áudio & Modais',
      shortcuts: [
        { keys: ['Ctrl', 'F'], label: 'Abrir / Fechar Analisador FFT em Tempo Real' },
        { keys: ['Ctrl', 'D'], label: 'Abrir / Fechar Calculadora BPM / ms de Reverb' },
        { keys: ['?'], label: 'Abrir este Guia de Atalhos de Teclado' },
        { keys: ['Esc'], label: 'Fechar qualquer Modal ou Janela Aberta' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="bg-[#15191E] border border-[#2A2F36] rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2F36] bg-[#0E1116]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Atalhos Globais do Teclado</h2>
              <p className="text-[11px] text-gray-400">Navegue na velocidade da luz pelo MELO ASSISTANT</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1E2329] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {shortcutGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                {group.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.shortcuts.map((sc, sIdx) => (
                  <div 
                    key={sIdx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-xs"
                  >
                    <span className="text-gray-300 font-medium truncate mr-2">{sc.label}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {sc.keys.map((k, kIdx) => (
                        <kbd 
                          key={kIdx}
                          className="px-2 py-1 rounded bg-[#1E2329] border border-gray-600 text-[10px] font-mono font-bold text-cyan-300 shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#2A2F36] bg-[#0E1116] flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1.5 text-[11px]">
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span>Compatível com Windows (Ctrl) e macOS (Cmd / ⌘)</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
