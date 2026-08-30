import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Square, Volume2, Upload, Activity, Radio, Sparkles, X } from 'lucide-react';

interface AudioAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type GeneratorSignalType = 'none' | 'pinkNoise' | 'sine1000' | 'sine100' | 'sub45' | 'vocalSweep';

export const AudioAnalyzerModal: React.FC<AudioAnalyzerModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSourceType, setAudioSourceType] = useState<'file' | 'generator'>('generator');
  const [generatorType, setGeneratorType] = useState<GeneratorSignalType>('sine1000');
  const [volume, setVolume] = useState(0.5);
  const [fileName, setFileName] = useState<string | null>(null);
  const [meterPeak, setMeterPeak] = useState(-60);
  const [meterRms, setMeterRms] = useState(-60);
  const [displayMode, setDisplayMode] = useState<'spectrum' | 'oscilloscope'>('spectrum');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize Web Audio Context
  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      return;
    }

    const initAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
        analyserRef.current.smoothingTimeConstant = 0.85;

        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.gain.value = volume;

        gainNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioCtxRef.current.destination);
      }
    };

    initAudio();

    return () => {
      stopAudio();
    };
  }, [isOpen]);

  // Volume slider update
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.05);
    }
  }, [volume]);

  // Canvas visualizer loop
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      if (!analyserRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      const analyser = analyserRef.current;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#0f1115';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (displayMode === 'spectrum') {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        // Calculate peak/rms
        let sum = 0;
        let maxVal = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i] * dataArray[i];
          if (dataArray[i] > maxVal) maxVal = dataArray[i];
        }
        const rms = Math.sqrt(sum / bufferLength);
        const peakDb = maxVal === 0 ? -60 : Math.round((maxVal / 255) * 60 - 60);
        const rmsDb = rms === 0 ? -60 : Math.round((rms / 255) * 60 - 60);
        setMeterPeak(peakDb);
        setMeterRms(rmsDb);

        // Draw Spectrum Bars with Smooth Gradient
        const barWidth = (width / 80);
        let x = 0;

        for (let i = 0; i < 80; i++) {
          // Logarithmic bin mapping to give more space to low/mids
          const binIndex = Math.floor(Math.pow(i / 80, 2) * (bufferLength / 2));
          const barHeight = (dataArray[binIndex] / 255) * (height - 20);

          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#10b981');
          gradient.addColorStop(0.6, '#06b6d4');
          gradient.addColorStop(0.85, '#f59e0b');
          gradient.addColorStop(1, '#ff7700');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth - 1.5, barHeight);

          x += barWidth;
        }

        // Draw frequency labels at bottom
        ctx.fillStyle = '#64748b';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText('30Hz', 10, height - 5);
        ctx.fillText('100Hz', width * 0.15, height - 5);
        ctx.fillText('500Hz', width * 0.35, height - 5);
        ctx.fillText('1kHz', width * 0.52, height - 5);
        ctx.fillText('5kHz', width * 0.75, height - 5);
        ctx.fillText('16kHz', width - 35, height - 5);

      } else {
        // Oscilloscope Mode (Time Domain)
        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ff7700';
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isOpen, displayMode]);

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        if ('stop' in sourceNodeRef.current && typeof (sourceNodeRef.current as AudioScheduledSourceNode).stop === 'function') {
          (sourceNodeRef.current as AudioScheduledSourceNode).stop();
        }
        sourceNodeRef.current.disconnect();
      } catch {
        // ignore already stopped
      }
      sourceNodeRef.current = null;
    }

    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }

    setIsPlaying(false);
  };

  const playGenerator = (type: GeneratorSignalType) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    stopAudio();

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;

    if (type === 'pinkNoise') {
      // Generate Pink Noise buffer locally
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;
      noiseNode.connect(gainNodeRef.current);
      noiseNode.start();
      sourceNodeRef.current = noiseNode;

    } else if (type === 'vocalSweep') {
      // Sine wave sweeping through vocal range (100Hz to 6kHz)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(6000, ctx.currentTime + 3);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 6);
      osc.connect(gainNodeRef.current);
      osc.start();
      sourceNodeRef.current = osc;

    } else {
      // Standard test sine wave
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      if (type === 'sine1000') osc.frequency.value = 1000;
      else if (type === 'sine100') osc.frequency.value = 100;
      else if (type === 'sub45') osc.frequency.value = 45;

      osc.connect(gainNodeRef.current);
      osc.start();
      sourceNodeRef.current = osc;
    }

    setIsPlaying(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    stopAudio();
    setFileName(file.name);
    setAudioSourceType('file');

    if (!audioCtxRef.current || !gainNodeRef.current) return;
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const audioUrl = URL.createObjectURL(file);
    const audio = new Audio(audioUrl);
    audio.crossOrigin = 'anonymous';
    audioElementRef.current = audio;

    const source = audioCtxRef.current.createMediaElementSource(audio);
    source.connect(gainNodeRef.current);
    sourceNodeRef.current = source;

    audio.play();
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      if (audioSourceType === 'generator') {
        playGenerator(generatorType);
      } else if (audioElementRef.current) {
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        audioElementRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div id="audio-analyzer-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#14171d] border border-white/10 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#181b22]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ff7700]/20 flex items-center justify-center text-[#ff7700] border border-[#ff7700]/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Analisador de Áudio & Gerador de Sinal Offline
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Web Audio API Local
                </span>
              </h2>
              <p className="text-xs text-slate-400">Teste o espectro de frequências, ruído rosa e carregue suas próprias faixas sem internet.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visualizer Stage */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="relative rounded-xl border border-white/10 bg-[#0e1014] p-2 overflow-hidden shadow-inner">
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-[#181b20]/90 px-3 py-1.5 rounded-lg border border-white/10">
              <button
                onClick={() => setDisplayMode('spectrum')}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-all ${
                  displayMode === 'spectrum' ? 'bg-[#ff7700] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Espectro FFT
              </button>
              <button
                onClick={() => setDisplayMode('oscilloscope')}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-all ${
                  displayMode === 'oscilloscope' ? 'bg-[#ff7700] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Osciloscópio
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={780}
              height={260}
              className="w-full h-56 md:h-64 rounded-lg block"
            />
          </div>

          {/* Meters & Telemetry */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-[#181b22] border border-white/5 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-1">Peak Level</span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold font-mono text-emerald-400">{meterPeak} dBFS</span>
                <span className="text-[10px] text-slate-500">Max</span>
              </div>
              <div className="h-1.5 bg-black/40 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-75"
                  style={{ width: `${Math.max(0, Math.min(100, ((meterPeak + 60) / 60) * 100))}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-[#181b22] border border-white/5 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-1">RMS Power</span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold font-mono text-cyan-400">{meterRms} dB</span>
                <span className="text-[10px] text-slate-500">Média</span>
              </div>
              <div className="h-1.5 bg-black/40 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-75"
                  style={{ width: `${Math.max(0, Math.min(100, ((meterRms + 60) / 60) * 100))}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-[#181b22] border border-white/5 rounded-xl">
              <span className="text-[11px] text-slate-400 block mb-1">Status do Áudio</span>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                <span className="text-sm font-semibold text-white font-mono">
                  {isPlaying ? 'Reproduzindo' : 'Pausado'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block truncate">
                {audioSourceType === 'file' ? (fileName || 'Arquivo Local') : generatorType}
              </span>
            </div>

            <div className="p-3 bg-[#181b22] border border-white/5 rounded-xl">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>Volume Geral</span>
                <span className="font-mono text-white">{Math.round(volume * 100)}%</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-black/50 rounded-lg accent-[#ff7700] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Controls: Audio File vs Tone Generator */}
          <div className="p-4 bg-[#181b22] border border-white/5 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAudioSourceType('generator')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    audioSourceType === 'generator'
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 text-[#ff7700]" />
                  Gerador de Sinais de Estúdio
                </button>
                <button
                  onClick={() => setAudioSourceType('file')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    audioSourceType === 'file'
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  Carregar Áudio Local (WAV/MP3)
                </button>
              </div>

              {/* Master Play/Stop */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlayback}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                    isPlaying
                      ? 'bg-amber-500 hover:bg-amber-600 text-black'
                      : 'bg-[#ff7700] hover:bg-[#ff881a] text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pausar Áudio' : 'Reproduzir Sinal'}
                </button>
                {isPlaying && (
                  <button
                    onClick={stopAudio}
                    className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-colors"
                  >
                    <Square className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Generator Selection */}
            {audioSourceType === 'generator' ? (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'pinkNoise', name: 'Ruído Rosa (Pink Noise)', tip: 'Calibração de balance de mixagem' },
                  { id: 'sine1000', name: 'Tom 1 kHz', tip: 'Calibração padrão 0VU / dBu' },
                  { id: 'sine100', name: 'Tom 100 Hz', tip: 'Teste de corpo de graves' },
                  { id: 'sub45', name: 'Sub 45 Hz', tip: 'Teste de 808 e subwoofers' },
                  { id: 'vocalSweep', name: 'Varredura Vocal', tip: 'Sweep 100Hz - 6kHz' }
                ].map((sig) => (
                  <button
                    key={sig.id}
                    onClick={() => {
                      setGeneratorType(sig.id as GeneratorSignalType);
                      if (isPlaying) playGenerator(sig.id as GeneratorSignalType);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      generatorType === sig.id
                        ? 'bg-[#ff7700]/15 border-[#ff7700]/50 text-white'
                        : 'bg-[#121418] border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold block">{sig.name}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{sig.tip}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 border border-dashed border-white/10 rounded-xl bg-[#121418]">
                <label className="cursor-pointer px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors border border-white/10">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  Selecionar Faixa do Computador
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <div className="text-xs text-slate-400 truncate">
                  {fileName ? (
                    <span className="text-emerald-400 font-medium font-mono">Carregado: {fileName}</span>
                  ) : (
                    'Nenhum arquivo carregado. O arquivo é processado 100% no seu navegador sem enviar nada para a internet.'
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#121418] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff7700]" />
            <span>Processamento local via Web Audio API. Zero consumo de internet.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg transition-colors"
          >
            Fechar Analisador
          </button>
        </div>
      </div>
    </div>
  );
};
