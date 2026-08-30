import React, { useState } from 'react';
import { mixDoctorAlertsData } from '../data/mixDoctorData';
import { Stethoscope, AlertTriangle, AlertCircle, Info, CheckCircle2, Search, Sliders, Activity } from 'lucide-react';
import { MixDoctorAlert, NavigationTab } from '../types';

interface MixDoctorViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenAnalyzer: () => void;
}

export const MixDoctorView: React.FC<MixDoctorViewProps> = ({ onNavigate, onOpenAnalyzer }) => {
  const [selectedAlertId, setSelectedAlertId] = useState<string>(mixDoctorAlertsData[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'critical' | 'warning' | 'info'>('ALL');

  const filteredAlerts = mixDoctorAlertsData.filter((alert) => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSeverity = severityFilter === 'ALL' || alert.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const currentAlert = mixDoctorAlertsData.find(a => a.id === selectedAlertId) || mixDoctorAlertsData[0];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold">
              <Stethoscope className="w-3.5 h-3.5" />
              SISTEMA INTELIGENTE DE DIAGNÓSTICO E ALERTAS DE MIX
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Mix Doctor
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              Identifique e corrija problemas técnicos graves como mascaramento de frequências, conflito de fase no subgrave, sibilância e perda de dinâmica.
            </p>
          </div>

          <button
            onClick={onOpenAnalyzer}
            className="px-4 py-2.5 rounded-lg bg-[#0B0E11] hover:bg-[#1E2329] border border-red-500/30 hover:border-red-500/60 text-white text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-red-400" />
            <span>Abrir Analisador FFT</span>
          </button>
        </div>
      </div>

      {/* Main Diagnostic Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Alert Selector */}
        <div className="space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar sintomas (ex: graves, embolado, sibilância)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#15191E] border border-[#2A2F36] rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
            />
          </div>

          {/* Severity Filter */}
          <div className="flex gap-1 p-1 bg-[#15191E] border border-[#2A2F36] rounded-lg text-xs">
            {[
              { id: 'ALL', label: 'Todos' },
              { id: 'critical', label: 'Críticos' },
              { id: 'warning', label: 'Avisos' },
              { id: 'info', label: 'Informativos' }
            ].map((sev) => (
              <button
                key={sev.id}
                onClick={() => setSeverityFilter(sev.id as typeof severityFilter)}
                className={`flex-1 py-1.5 rounded-md font-bold text-[11px] transition-all cursor-pointer ${
                  severityFilter === sev.id
                    ? 'bg-[#0B0E11] text-white border border-[#2A2F36] shadow-sm'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {sev.label}
              </button>
            ))}
          </div>

          {/* Alert List */}
          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
            {filteredAlerts.map((alert) => {
              const isSelected = alert.id === selectedAlertId;
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-red-500/10 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.15)]'
                      : 'bg-[#15191E] border-[#2A2F36] text-gray-300 hover:border-red-500/40 hover:bg-[#1A1F26]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      {alert.severity === 'critical' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      ) : alert.severity === 'warning' ? (
                        <AlertCircle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      ) : (
                        <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      )}
                      <span className="truncate">{alert.title}</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 block mt-1">
                    Faixa: {alert.freqRange}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Diagnosis & Solution Protocol */}
        <div className="lg:col-span-2 rounded-xl bg-[#15191E] border border-[#2A2F36] p-6 md:p-7 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2F36] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  currentAlert.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  currentAlert.severity === 'warning' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                  'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}>
                  SEVERIDADE: {currentAlert.severity.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  Região: {currentAlert.freqRange}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1.5">
                {currentAlert.title}
              </h2>
            </div>
          </div>

          {/* Symptoms List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
              Sintomas Identificados na Escuta
            </h3>
            <div className="space-y-1.5">
              {currentAlert.symptoms.map((symptom, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-xs text-gray-300 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Diagnosis */}
          <div className="p-4 rounded-lg bg-[#0B0E11] border border-[#2A2F36] space-y-1 text-xs">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Diagnóstico Físico & Acústico
            </span>
            <p className="text-gray-200 leading-relaxed font-medium">
              {currentAlert.diagnosis}
            </p>
          </div>

          {/* Solution Steps */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Protocolo de Correção no FL Studio</span>
            </h3>
            <div className="space-y-2">
              {currentAlert.solutionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#0B0E11] border border-[#2A2F36] text-xs text-gray-200 leading-relaxed flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended FL Studio Preset */}
          <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/30 text-xs space-y-1">
            <span className="font-bold text-orange-400 uppercase text-[10px] tracking-wider block">
              Ferramenta Recomendada no FL Studio
            </span>
            <p className="text-white font-mono text-xs">
              {currentAlert.flPluginRecommended}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

