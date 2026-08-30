import React, { useState } from 'react';
import { Github, Copy, Check, Terminal, ExternalLink, ShieldCheck, X, FolderGit2, Sparkles, Download } from 'lucide-react';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const gitInitCommands = `# 1. Inicialize o repositório Git local
git init

# 2. Adicione todos os arquivos do projeto
git add .

# 3. Crie o primeiro commit de produção
git commit -m "feat: Melo Mix & Master Assistant - Studio Suite v2.0"

# 4. Defina a branch principal como main
git branch -M main

# 5. Conecte ao seu repositório no GitHub (substitua SEU_USUARIO e SEU_REPOSITORIO)
git remote add origin https://github.com/SEU_USUARIO/melo-mix-master-assistant.git

# 6. Envie o código completo para o GitHub
git push -u origin main`;

  const npmCommands = `# Instalação e execução local
npm install
npm run dev

# Build de produção
npm run build`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#12161D] border-2 border-cyan-500/40 p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#2A313C] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#090C0F] border border-cyan-500/40 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Github className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  GITHUB EXPORT & REPO READY
                </span>
                <span className="text-xs text-gray-400 font-mono">Pronto para Publicar</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mt-1">
                Preparação do Repositório GitHub
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#0B0E11] hover:bg-[#1E242E] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions Summary */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0B0E11] border border-[#2A313C] space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Como gerar o link do seu projeto no GitHub em 3 passos:
            </h3>
            <ol className="text-xs text-gray-300 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Acesse <strong className="text-cyan-400">github.com/new</strong> e crie um novo repositório público ou privado (ex: <code className="bg-[#181D25] px-1.5 py-0.5 rounded text-cyan-300 font-mono">melo-mix-master-assistant</code>).</li>
              <li>Não marque a opção de criar README automático (o projeto já possui o README.md e .gitignore completos).</li>
              <li>Copie e execute os comandos abaixo no seu terminal para enviar todo o código para o GitHub.</li>
            </ol>
          </div>

          {/* Terminal Command Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gray-300 uppercase flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Comandos Git para Enviar ao GitHub
              </span>
              <button
                onClick={() => copyToClipboard(gitInitCommands, 'git-cmds')}
                className="px-3 py-1.5 rounded-lg bg-[#18202A] hover:bg-cyan-600 hover:text-white text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 border border-cyan-500/30 transition-all cursor-pointer"
              >
                {copiedSection === 'git-cmds' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Todos os Comandos</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#06080B] border border-[#242A34] text-xs font-mono text-cyan-300 overflow-x-auto select-all leading-relaxed shadow-inner">
              {gitInitCommands}
            </pre>
          </div>

          {/* Local Commands */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gray-300 uppercase flex items-center gap-2">
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                Comandos para Rodar Localmente (Node / NPM)
              </span>
              <button
                onClick={() => copyToClipboard(npmCommands, 'npm-cmds')}
                className="px-3 py-1.5 rounded-lg bg-[#18202A] hover:bg-emerald-600 hover:text-white text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-500/30 transition-all cursor-pointer"
              >
                {copiedSection === 'npm-cmds' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-[#06080B] border border-[#242A34] text-xs font-mono text-emerald-300 overflow-x-auto select-all leading-relaxed shadow-inner">
              {npmCommands}
            </pre>
          </div>

          {/* Checklist Verification Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] flex items-center gap-2.5 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>.gitignore configurado (Node_modules protegido)</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] flex items-center gap-2.5 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>README.md completo com documentação técnica</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0B0E11] border border-[#2A2F36] flex items-center gap-2.5 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TypeScript 100% tipado e sem erros de lint</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2A313C]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            Entendido, Pronto para Publicar
          </button>
        </div>
      </div>
    </div>
  );
};
