import React, { useState } from 'react';
import { X, Clock, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import { calculateDelayTimes, calculateReverbSettings } from '../utils/audioCalculator';

interface DelayCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBpm?: number;
}

export const DelayCalculatorModal: React.FC<DelayCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialBpm = 120
}) => {
  const [bpm, setBpm] = useState<number>(initialBpm);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const delayRows = calculateDelayTimes(bpm);
  const reverbSettings = calculateReverbSettings(bpm);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#14171d] border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#181b22]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ff7700]/20 flex items-center justify-center text-[#ff7700] border border-[#ff7700]/30">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Calculadora de Delay & Reverb (BPM → ms)
              </h2>
              <p className="text-xs text-slate-400">Sincronize perfeitamente tempos de delay, eco e pré-delays de reverb com a pulsação da música.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BPM Input Bar */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#181b22] border border-white/5 rounded-xl">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Andamento da Música (BPM)</span>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="40"
                  max="260"
                  value={bpm}
                  onChange={(e) => setBpm(Math.max(20, Math.min(300, parseInt(e.target.value) || 120)))}
                  className="w-28 bg-[#0e1014] border border-white/15 rounded-xl px-3 py-2 text-xl font-bold font-mono text-[#ff7700] focus:outline-none focus:border-[#ff7700]"
                />
                <div className="flex gap-1.5">
                  {[95, 104, 120, 140, 160].map((presetBpm) => (
                    <button
                      key={presetBpm}
                      onClick={() => setBpm(presetBpm)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border font-mono transition-colors ${
                        bpm === presetBpm
                          ? 'bg-[#ff7700] text-white border-[#ff7700]'
                          : 'bg-[#121418] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {presetBpm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block mb-1">Semínima (1/4 Note)</span>
              <span className="text-lg font-mono font-bold text-white">
                {Math.round(60000 / bpm)} ms
              </span>
            </div>
          </div>

          {/* Delay Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <span>Tempos de Delay (Fruity Delay 3 / Echo)</span>
              <span className="text-[10px] text-slate-500 font-normal">Clique no valor para copiar</span>
            </h3>

            <div className="border border-white/10 rounded-xl overflow-hidden bg-[#101216]">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#181b22] text-slate-400 font-semibold border-b border-white/5">
                  <tr>
                    <th className="py-3 px-4">Figura Musical</th>
                    <th className="py-3 px-4">Fração</th>
                    <th className="py-3 px-4">Normal</th>
                    <th className="py-3 px-4">Pontuada (Dotted 1.5x)</th>
                    <th className="py-3 px-4">Tercina (Triplet)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {delayRows.map((row) => (
                    <tr key={row.fraction} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-white">{row.name}</td>
                      <td className="py-3 px-4 text-[#ff7700] font-bold">{row.fraction}</td>
                      
                      {/* Normal */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => copyToClipboard(`${row.normalMs}`, `n-${row.fraction}`)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#181b22] hover:bg-white/10 text-slate-200 transition-colors group"
                        >
                          <span>{row.normalMs} ms</span>
                          {copiedKey === `n-${row.fraction}` ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-500 group-hover:text-slate-300 opacity-0 group-hover:opacity-100" />
                          )}
                        </button>
                      </td>

                      {/* Dotted */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => copyToClipboard(`${row.dottedMs}`, `d-${row.fraction}`)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#181b22] hover:bg-white/10 text-amber-300 transition-colors group"
                        >
                          <span>{row.dottedMs} ms</span>
                          {copiedKey === `d-${row.fraction}` ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-500 group-hover:text-slate-300 opacity-0 group-hover:opacity-100" />
                          )}
                        </button>
                      </td>

                      {/* Triplet */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => copyToClipboard(`${row.tripletMs}`, `t-${row.fraction}`)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#181b22] hover:bg-white/10 text-cyan-300 transition-colors group"
                        >
                          <span>{row.tripletMs} ms</span>
                          {copiedKey === `t-${row.fraction}` ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-500 group-hover:text-slate-300 opacity-0 group-hover:opacity-100" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reverb Presets by BPM */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Configurações Ideais de Reverb (Fruity Reeverb 2)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-[#181b22] border border-white/5 rounded-xl">
                <span className="text-xs text-slate-400 block mb-1">Pre-Delay Apertado (Tight)</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{reverbSettings.preDelayTightMs} ms</span>
                <p className="text-[11px] text-slate-400 mt-2">Excelente para vocais rápidos e caixas de bateria (mantém o ataque colado na frente).</p>
              </div>

              <div className="p-4 bg-[#181b22] border border-white/5 rounded-xl">
                <span className="text-xs text-slate-400 block mb-1">Pre-Delay Espacial (Wide)</span>
                <span className="text-xl font-bold font-mono text-cyan-400">{reverbSettings.preDelayWideMs} ms</span>
                <p className="text-[11px] text-slate-400 mt-2">Separa o som direto do efeito, permitindo inteligibilidade lírica antes do reverb entrar.</p>
              </div>

              <div className="p-4 bg-[#181b22] border border-white/5 rounded-xl">
                <span className="text-xs text-slate-400 block mb-1">Decay Musical (1 compasso)</span>
                <span className="text-xl font-bold font-mono text-[#ff7700]">{reverbSettings.decayMediumSec} s</span>
                <p className="text-[11px] text-slate-400 mt-2">O reverb dissipa exatamente no início do próximo compasso, evitando lama sonora.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#121418] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff7700]" />
            <span>Fórmula: Tempo em ms = 60.000 / BPM</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
