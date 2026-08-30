import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { 
  Radio, 
  Mic2, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Sliders, 
  Volume2, 
  Sparkles, 
  Play, 
  Square, 
  Check, 
  RefreshCw,
  SlidersHorizontal,
  Headphones,
  Power
} from 'lucide-react';

interface VirtualRecordingConsoleProps {
  activeProject: Project | null;
  onNavigateToCleaning?: () => void;
}

export interface PreRecordingCheckItem {
  id: string;
  category: 'LATÊNCIA' | 'ENTRADA' | 'GANHO' | 'MONITORAMENTO' | 'HARDWARE';
  label: string;
  hint: string;
  flLocation: string;
  isCompleted: boolean;
}

export const VirtualRecordingConsole: React.FC<VirtualRecordingConsoleProps> = ({
  activeProject,
  onNavigateToCleaning
}) => {
  // Console Hardware Switches State
  const [isArmed, setIsArmed] = useState<boolean>(true);
  const [phantomPower, setPhantomPower] = useState<boolean>(true);
  const [pad20dB, setPad20dB] = useState<boolean>(false);
  const [hpf80Hz, setHpf80Hz] = useState<boolean>(true);
  const [phaseInvert, setPhaseInvert] = useState<boolean>(false);
  const [directMonitorMode, setDirectMonitorMode] = useState<'SOFTWARE_PDC' | 'HARDWARE_DIRECT'>('SOFTWARE_PDC');
  const [preampGainDb, setPreampGainDb] = useState<number>(36); // 0 to 60 dB
  const [reverbSendPercent, setReverbSendPercent] = useState<number>(25); // 0 to 100%

  // Simulation & Audio Level State
  const [signalMode, setSignalMode] = useState<'HOOK' | 'VERSE' | 'SHOUT' | 'NOISE' | 'MIC_LIVE'>('HOOK');
  const [isLiveMicActive, setIsLiveMicActive] = useState<boolean>(false);
  const [currentDbfs, setCurrentDbfs] = useState<number>(-14.5);
  const [peakHoldDbfs, setPeakHoldDbfs] = useState<number>(-12.1);
  const [inputDetected, setInputDetected] = useState<boolean>(true);

  // Web Audio API live mic references
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Interactive Pre-Recording Checklist State (stored in local state or project)
  const [checkItems, setCheckItems] = useState<PreRecordingCheckItem[]>([
    {
      id: 'chk-lat',
      category: 'LATÊNCIA',
      label: 'Driver ASIO & Buffer ≤ 128 samples (≤ 2.7ms)',
      hint: 'No FL Studio > Options (F10) > Audio, use o driver oficial da interface com buffer em 64 ou 128 samples.',
      flLocation: 'F10 > Audio Settings',
      isCompleted: true
    },
    {
      id: 'chk-input',
      category: 'ENTRADA',
      label: 'Entrada Mono (In 1) selecionada no canal REC IN',
      hint: 'Nunca selecione entrada estéreo para 1 microfone. Garante gravação centralizada sem canal mudo.',
      flLocation: 'Mixer (F9) > Insert REC IN > Top Input',
      isCompleted: true
    },
    {
      id: 'chk-gain',
      category: 'GANHO',
      label: 'Pré-Ganho Físico no Sweet Spot (-18 dBFS a -12 dBFS)',
      hint: 'Gire o knob da interface durante o refrão. Média em -16 dBFS e picos máximos em -12 dBFS (LED nunca vermelho).',
      flLocation: 'Knob Gain na Interface Física',
      isCompleted: true
    },
    {
      id: 'chk-master-pdc',
      category: 'MONITORAMENTO',
      label: 'Master Bus 100% LIMPO (Zero Plugins com Latência/PDC)',
      hint: 'Desligue temporariamente limiters pesados (Ozone, Pro-L2 com lookahead) do Master para evitar atraso oculto.',
      flLocation: 'Mixer (F9) > Master Track Slots',
      isCompleted: true
    },
    {
      id: 'chk-beat-headroom',
      category: 'MONITORAMENTO',
      label: 'Headroom do Beat atenuado em -5 dB no Mixer',
      hint: 'Baixe o fader do beat para -5 dB para abrir espaço auditivo para o cantor se ouvir perfeitamente.',
      flLocation: 'Mixer (F9) > Fader do Beat',
      isCompleted: false
    },
    {
      id: 'chk-mic-pop',
      category: 'HARDWARE',
      label: 'Pop Filter alinhado & Distância de 15cm a 20cm',
      hint: 'Filtro anti-pop a 5cm da cápsula; boca do cantor a 10cm do filtro para evitar plosivas ("P" e "B").',
      flLocation: 'Pedestal & Acústica do Estúdio',
      isCompleted: true
    }
  ]);

  const toggleCheckItem = (id: string) => {
    setCheckItems(prev => prev.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
  };

  const completedChecksCount = checkItems.filter(i => i.isCompleted).length;
  const allChecksPassed = completedChecksCount === checkItems.length;
  const isRecordingReady = isArmed && allChecksPassed;

  // Real-time Signal Simulation Engine based on gain knob, pad and mode
  useEffect(() => {
    if (isLiveMicActive) return;

    const interval = setInterval(() => {
      let baseLevel = -18;
      let jitter = (Math.random() - 0.5) * 3;

      if (signalMode === 'VERSE') {
        baseLevel = -22 + jitter;
      } else if (signalMode === 'HOOK') {
        baseLevel = -15 + jitter;
      } else if (signalMode === 'SHOUT') {
        baseLevel = -8 + jitter;
      } else if (signalMode === 'NOISE') {
        baseLevel = -54 + Math.random() * 4;
      }

      // Gain knob compensation (+0 to +60 dB mapped around baseline 36dB)
      const gainOffset = (preampGainDb - 36) * 0.4;
      const padOffset = pad20dB ? -15 : 0;
      let calculated = baseLevel + gainOffset + padOffset;

      if (calculated > 0) calculated = 0; // Ceiling clip
      if (calculated < -60) calculated = -60;

      setCurrentDbfs(calculated);
      setPeakHoldDbfs(prev => Math.max(prev, calculated));
      setInputDetected(calculated > -50);
    }, 120);

    return () => clearInterval(interval);
  }, [signalMode, preampGainDb, pad20dB, isLiveMicActive]);

  // Peak hold decay timer
  useEffect(() => {
    const decayInterval = setInterval(() => {
      setPeakHoldDbfs(prev => Math.max(-48, prev - 0.6));
    }, 400);
    return () => clearInterval(decayInterval);
  }, []);

  // Web Audio Live Microphone Handler
  const startLiveMic = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        micStreamRef.current = stream;
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        setIsLiveMicActive(true);
        setSignalMode('MIC_LIVE');

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateMeter = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          // Map 0-255 to -60 dBFS to 0 dBFS
          const normalized = Math.min(1, avg / 120);
          const computedDb = normalized > 0.01 ? -48 + (normalized * 48) : -60;
          
          setCurrentDbfs(computedDb);
          setPeakHoldDbfs(prev => Math.max(prev, computedDb));
          setInputDetected(computedDb > -45);

          animationFrameRef.current = requestAnimationFrame(updateMeter);
        };

        updateMeter();
      }
    } catch (err) {
      console.warn('Microphone permission denied or not available:', err);
      setIsLiveMicActive(false);
      setSignalMode('HOOK');
    }
  };

  const stopLiveMic = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsLiveMicActive(false);
    setSignalMode('HOOK');
  };

  useEffect(() => {
    return () => {
      stopLiveMic();
    };
  }, []);

  // VU needle angle calculation (-45 deg to +45 deg)
  // -60 dBFS = -45 deg, -18 dBFS = 0 deg (center), 0 dBFS = +45 deg
  const vuAngle = Math.max(-45, Math.min(45, ((currentDbfs + 18) / 18) * 35));

  // Determine Level Status Color
  const getLevelStatus = (db: number) => {
    if (db >= -2) return { text: 'CLIPPING (0 dBFS)', color: 'text-red-400', bg: 'bg-red-500', alert: true };
    if (db >= -10) return { text: 'QUENTE (-10 dBFS)', color: 'text-amber-400', bg: 'bg-amber-500', alert: false };
    if (db >= -18 && db < -10) return { text: 'SWEET SPOT (-18 a -12 dBFS)', color: 'text-emerald-400', bg: 'bg-emerald-500', alert: false };
    if (db >= -30 && db < -18) return { text: 'MODERADO (-24 dBFS)', color: 'text-cyan-400', bg: 'bg-cyan-500', alert: false };
    return { text: 'SINAL BAIXO / RUÍDO', color: 'text-gray-400', bg: 'bg-gray-600', alert: false };
  };

  const levelInfo = getLevelStatus(currentDbfs);

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#14181F] via-[#101419] to-[#0D1014] border-2 border-[#2A313C] p-5 md:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.6)] space-y-6 relative overflow-hidden">
      {/* Console Top Brushed Aluminum Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#242A33] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#090C0F] border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                CONSOLE DE GRAVAÇÃO VIRTUAL
              </span>
              <span className="text-[10px] font-mono text-gray-400">FL STUDIO REC CONSOLE MK-II</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">
              Tracking & Input Monitoring Console
            </h2>
          </div>
        </div>

        {/* Console 3 Core Status Beacons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* BEACON 1: ARM STATUS */}
          <button
            onClick={() => setIsArmed(!isArmed)}
            className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold transition-all cursor-pointer shadow-md ${
              isArmed
                ? 'bg-red-500/20 text-red-300 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.3)] ring-1 ring-red-500/40'
                : 'bg-[#0B0E11] text-gray-400 border-[#2A2F36] hover:text-white'
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${isArmed ? 'bg-red-500 animate-ping' : 'bg-gray-600'}`} />
            <span>{isArmed ? 'ARM: REC ENABLED' : 'ARM: DISARMED'}</span>
          </button>

          {/* BEACON 2: RECORDING READY (GREEN) */}
          <div
            className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold shadow-md transition-all ${
              isRecordingReady
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/40'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/40'
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${isRecordingReady ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]' : 'bg-amber-400 animate-pulse'}`} />
            <span>{isRecordingReady ? 'RECORDING READY (100%)' : `PRÉ-CHECK: ${completedChecksCount}/6`}</span>
          </div>

          {/* BEACON 3: INPUT DETECTED */}
          <div
            className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold shadow-md transition-all ${
              inputDetected
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-[#0B0E11] text-gray-500 border-[#2A2F36]'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${inputDetected ? 'text-cyan-400 animate-bounce' : 'text-gray-600'}`} />
            <span>{inputDetected ? 'INPUT DETECTED (MONO)' : 'SEM SINAL'}</span>
          </div>
        </div>
      </div>

      {/* Main Console Deck: 2 Columns (Channel Strip & Analog VU + Pre-Recording Checklist) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: VIRTUAL CHANNEL STRIP & HARDWARE DECK (5 COLS) */}
        <div className="lg:col-span-5 bg-[#0A0D11] border border-[#222832] rounded-xl p-5 space-y-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-[#1E242E] pb-3">
            <span className="text-xs font-mono font-extrabold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              FL INSERT: [REC IN] - CH 01
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {activeProject ? `${activeProject.bpm} BPM • ${activeProject.key}` : '48kHz / 24-bit'}
            </span>
          </div>

          {/* Analog Vintage VU Meter & Dynamic LED Ladder */}
          <div className="bg-[#12161D] border-2 border-[#1E232B] rounded-xl p-4 space-y-3 relative shadow-[inset_0_3px_10px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>ANALOG VU METER (PEAK + RMS)</span>
              <span className={`font-bold ${levelInfo.color}`}>{currentDbfs.toFixed(1)} dBFS</span>
            </div>

            {/* Simulated Vintage Needle VU Box */}
            <div className="h-24 bg-gradient-to-b from-[#FFFDF0] via-[#F4EED2] to-[#E3D9AF] rounded-lg p-2 relative overflow-hidden shadow-inner flex flex-col justify-between select-none">
              {/* VU Scale Markings */}
              <div className="flex justify-between items-end text-[9px] font-mono font-bold text-gray-700 px-3 z-10">
                <span>-20</span>
                <span>-10</span>
                <span>-7</span>
                <span className="text-emerald-700 font-extrabold">-3</span>
                <span className="text-emerald-800 font-black">0 VU</span>
                <span className="text-red-700 font-extrabold">+1</span>
                <span className="text-red-800 font-black">+3</span>
              </div>

              {/* Arc graphic lines */}
              <div className="absolute inset-x-4 top-5 h-8 border-t-2 border-dashed border-gray-400/60 rounded-full" />
              <div className="absolute right-6 top-5 w-10 h-8 border-t-2 border-red-600 rounded-full" />

              {/* Center Needle Pivot */}
              <div className="relative w-full h-8 flex justify-center items-end">
                <div 
                  className="w-0.5 h-16 bg-red-700 origin-bottom transition-transform duration-75 ease-out shadow-sm rounded-t"
                  style={{ transform: `rotate(${vuAngle}deg)` }}
                />
                <div className="absolute bottom-0 w-4 h-4 bg-gray-800 rounded-full border border-gray-600 z-20 shadow-md" />
              </div>

              <div className="flex items-center justify-between text-[8px] font-mono text-gray-500 px-2 z-10">
                <span>SWEET SPOT: -18dBFS</span>
                <span>PEAK HOLD: {peakHoldDbfs.toFixed(1)} dBFS</span>
              </div>
            </div>

            {/* LED Ladder Bar Meter */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
                <span>-48</span>
                <span>-24</span>
                <span className="text-emerald-400 font-bold">-18</span>
                <span className="text-emerald-400 font-bold">-12</span>
                <span className="text-amber-400">-6</span>
                <span className="text-red-400">CLIP</span>
              </div>
              <div className="h-3 bg-[#080A0D] rounded-full p-0.5 border border-[#242A34] flex gap-0.5 overflow-hidden">
                {[
                  { db: -48, color: 'bg-emerald-600' },
                  { db: -36, color: 'bg-emerald-500' },
                  { db: -24, color: 'bg-emerald-400' },
                  { db: -18, color: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' },
                  { db: -14, color: 'bg-emerald-300 shadow-[0_0_6px_rgba(52,211,153,0.9)]' },
                  { db: -12, color: 'bg-emerald-300' },
                  { db: -8, color: 'bg-amber-400' },
                  { db: -4, color: 'bg-amber-500' },
                  { db: -1, color: 'bg-red-500' },
                  { db: 0, color: 'bg-red-600 animate-pulse' }
                ].map((segment, idx) => {
                  const isActive = currentDbfs >= segment.db;
                  return (
                    <div
                      key={idx}
                      className={`flex-1 h-full rounded-sm transition-opacity duration-75 ${
                        isActive ? `${segment.color} opacity-100` : 'bg-gray-800 opacity-20'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Assessment Label */}
            <div className="p-2 rounded-lg bg-[#0A0D11] border border-[#1E242E] flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Status do Sinal:</span>
              <span className={`font-bold ${levelInfo.color}`}>{levelInfo.text}</span>
            </div>
          </div>

          {/* Hardware Switches (48V, PAD, HPF, Phase) */}
          <div className="grid grid-cols-4 gap-2">
            {/* +48V Phantom Power */}
            <button
              onClick={() => setPhantomPower(!phantomPower)}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                phantomPower
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                  : 'bg-[#0D1015] border-[#1E242E] text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${phantomPower ? 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,1)]' : 'bg-gray-700'}`} />
              <span className="text-[10px] font-mono font-bold">+48V</span>
              <span className="text-[8px] text-gray-400">{phantomPower ? 'ON' : 'OFF'}</span>
            </button>

            {/* PAD -20dB */}
            <button
              onClick={() => setPad20dB(!pad20dB)}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                pad20dB
                  ? 'bg-blue-500/20 border-blue-500/60 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.25)]'
                  : 'bg-[#0D1015] border-[#1E242E] text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${pad20dB ? 'bg-blue-400' : 'bg-gray-700'}`} />
              <span className="text-[10px] font-mono font-bold">PAD</span>
              <span className="text-[8px] text-gray-400">{pad20dB ? '-20dB' : '0dB'}</span>
            </button>

            {/* HPF 80Hz */}
            <button
              onClick={() => setHpf80Hz(!hpf80Hz)}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                hpf80Hz
                  ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                  : 'bg-[#0D1015] border-[#1E242E] text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${hpf80Hz ? 'bg-cyan-400' : 'bg-gray-700'}`} />
              <span className="text-[10px] font-mono font-bold">HPF</span>
              <span className="text-[8px] text-gray-400">{hpf80Hz ? '80Hz' : 'OFF'}</span>
            </button>

            {/* Phase Invert */}
            <button
              onClick={() => setPhaseInvert(!phaseInvert)}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                phaseInvert
                  ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.25)]'
                  : 'bg-[#0D1015] border-[#1E242E] text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${phaseInvert ? 'bg-purple-400' : 'bg-gray-700'}`} />
              <span className="text-[10px] font-mono font-bold">PHASE</span>
              <span className="text-[8px] text-gray-400">{phaseInvert ? 'Ø 180°' : '0°'}</span>
            </button>
          </div>

          {/* Preamp Gain Rotary Slider & Monitor Mode */}
          <div className="space-y-3 bg-[#101419] p-3.5 rounded-xl border border-[#1E242E]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-300 font-bold flex items-center gap-1.5">
                <Power className="w-3.5 h-3.5 text-cyan-400" />
                PREAMP GAIN FÍSICO
              </span>
              <span className="text-cyan-400 font-black">+{preampGainDb} dB</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={preampGainDb}
              onChange={(e) => setPreampGainDb(parseInt(e.target.value))}
              className="w-full h-2 bg-[#080A0D] rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-[#242A34]"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-500">
              <span>0 dB (Line)</span>
              <span>+36 dB (Sweet Spot)</span>
              <span>+60 dB (Max)</span>
            </div>
          </div>

          {/* Signal Test Generator & Live Mic Controls */}
          <div className="space-y-2 pt-1 border-t border-[#1E242E]">
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>TESTAR ENTRADA DE SINAL:</span>
              {isLiveMicActive && <span className="text-emerald-400 font-bold animate-pulse">● MIC FÍSICO ATIVO</span>}
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
              <button
                onClick={() => { stopLiveMic(); setSignalMode('VERSE'); }}
                className={`py-1.5 px-2 rounded border font-bold transition-colors cursor-pointer ${
                  signalMode === 'VERSE' ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-[#0D1015] border-[#222832] text-gray-400 hover:text-white'
                }`}
              >
                Verso (~-22dB)
              </button>
              <button
                onClick={() => { stopLiveMic(); setSignalMode('HOOK'); }}
                className={`py-1.5 px-2 rounded border font-bold transition-colors cursor-pointer ${
                  signalMode === 'HOOK' ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-[#0D1015] border-[#222832] text-gray-400 hover:text-white'
                }`}
              >
                Refrão (-14dB)
              </button>
              <button
                onClick={() => { stopLiveMic(); setSignalMode('SHOUT'); }}
                className={`py-1.5 px-2 rounded border font-bold transition-colors cursor-pointer ${
                  signalMode === 'SHOUT' ? 'bg-amber-500 text-black border-amber-400' : 'bg-[#0D1015] border-[#222832] text-gray-400 hover:text-white'
                }`}
              >
                Grito / Pico (-8dB)
              </button>
            </div>

            <button
              onClick={isLiveMicActive ? stopLiveMic : startLiveMic}
              className={`w-full py-2 rounded-lg border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isLiveMicActive
                  ? 'bg-red-500/20 border-red-500 text-red-300'
                  : 'bg-[#15191E] hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
              }`}
            >
              <Mic2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isLiveMicActive ? 'Desativar Microfone Real' : 'Testar Meu Microfone Real (Navegador)'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: PRE-RECORDING INTERACTIVE CHECKLIST (7 COLS) */}
        <div className="lg:col-span-7 bg-[#0A0D11] border border-[#222832] rounded-xl p-5 space-y-4 shadow-inner flex flex-col justify-between">
          <div className="space-y-1 border-b border-[#1E242E] pb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                CHECKLIST DE PRÉ-GRAVAÇÃO (NÍVEL 1 FL STUDIO)
              </span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                allChecksPassed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {completedChecksCount} de {checkItems.length} Verificados
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Marque os itens à medida que calibrar no seu FL Studio para garantir captura limpa e latência zero (&lt; 3ms).
            </p>
          </div>

          {/* Checklist Item Cards List */}
          <div className="space-y-2.5 flex-1">
            {checkItems.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    item.isCompleted
                      ? 'bg-[#10171D] border-cyan-500/40 text-gray-200 shadow-sm'
                      : 'bg-[#0D1015] border-[#222832] text-gray-400 hover:border-gray-600 hover:bg-[#12151B]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      item.isCompleted
                        ? 'bg-cyan-500 text-black shadow-[0_0_8px_rgba(6,182,212,0.8)] font-bold'
                        : 'border border-gray-600 bg-[#15191E]'
                    }`}
                  >
                    {item.isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-xs font-bold ${item.isCompleted ? 'text-white' : 'text-gray-300'}`}>
                        {item.label}
                      </h4>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#07090C] text-cyan-400 border border-[#1E242E] shrink-0">
                        {item.flLocation}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {item.hint}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checklist Footer Banner with Quick Actions */}
          <div className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${
            allChecksPassed
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-[#12161E] border-[#2A313C] text-gray-300'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                allChecksPassed ? 'bg-emerald-500 text-black shadow-md font-bold' : 'bg-[#1E242E] text-amber-400'
              }`}>
                {allChecksPassed ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-4 h-4" />}
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">
                  {allChecksPassed ? 'Setup 100% Configurado & Aprovado!' : 'Ainda restam etapas de calibração'}
                </h5>
                <p className="text-[11px] text-gray-400">
                  {allChecksPassed ? 'Você está pronto para gravar takes na Playlist sem eco ou latência.' : 'Complete o checklist acima para liberar a gravação perfeita.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setCheckItems(prev => prev.map(i => ({ ...i, isCompleted: true })))}
                className="px-3 py-1.5 rounded-lg bg-[#0B0E11] hover:bg-[#1A2028] text-gray-300 border border-[#2A2F36] text-[11px] font-mono font-bold transition-colors cursor-pointer"
              >
                Marcar Todos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
