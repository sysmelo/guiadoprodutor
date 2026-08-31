# MELO MIX & MASTER ASSISTANT 🎧
### Suíte Profissional de Decisões de Áudio, Gravação, Mixagem e Masterização para FL Studio

![License](https://img.shields.io/badge/license-MIT-cyan)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4)
![FL Studio](https://img.shields.io/badge/FL%20Studio-21%2B%20Ready-orange)
![Offline First](https://img.shields.io/badge/Offline-100%25%20Local-emerald)

**MELO MIX & MASTER ASSISTANT** é uma aplicação completa para engenheiros de áudio, produtores musicais e artistas que utilizam o **FL Studio**. Oferece um fluxo de trabalho estruturado em **4 Níveis de Produção**, console virtual de gravação em tempo real, calculadoras acústicas e de delay/reverb, analisador de espectro FFT via Web Audio API e gestão de projetos com controle de prazos e estágios de entrega.

---

## 🌟 Principais Funcionalidades

### 1. Nível 1: Gravação & Tracking Vocal
- **Console Virtual de Gravação**: Monitoração de sinal, medidor VU analógico com agulha e escala Peak/RMS, chaves de hardware (+48V Phantom Power, PAD -20dB, HPF 80Hz, Inversão de Fase Ø 180° e Preamp Gain).
- **Status Beacons**: Indicadores visuais de `ARM: REC ENABLED`, `RECORDING READY (100%)` e `INPUT DETECTED` em tempo real.
- **Checklist Interativo de Pré-Gravação**: Verificação de latência (buffer ≤ 128 samples / ASIO), seleção de entrada Mono (In 1), calibração do Sweet Spot (-18 dBFS a -12 dBFS) e bypass de plugins PDC no Master.
- **Microfone Real no Navegador**: Teste dinâmico de entrada usando Web Audio API (`getUserMedia` e `AnalyserNode`).

### 2. Nível 2: Mix & Preparação
- Organização completa de canais, Gain Staging, limpeza cirúrgica de frequências, tratamento de vozes (Lead, Dobras e Adlibs), buses de instrumentos e compressão paralela.
- Guia para 15 gêneros musicais (Afrobeat, Amapiano, Kizomba, Trap, Drill, R&B, Pop, Gospel, Funk, etc.).

### 3. Nível 3: Master Suite
- Cadeia de masterização inteligente (Linear Phase EQ, Multiband Dynamics, Saturação Harmônica, Stereo Imaging, Clipper e True Peak Limiter).
- Alvos de loudness comercial (LUFS Integrado, True Peak e Dynamic Range).

### 4. Nível 4: Exportação & Entrega
- Perfis de exportação para Streaming (Spotify, Apple Music, YouTube), Master para Shows e DJs, e Stems multitrack.
- Configurações do renderizador do FL Studio (Dithering, 512-point Sinc Resampling e HQ Plugins).

### 5. Gestão de Projetos & Pipeline de Prazos
- Acompanhamento por níveis de processo (`Nível 1: Gravação / Pré-Mix`, `Nível 2: Mixagem`, `Nível 3: Masterização`, `Nível 4: Finalização / Entrega`).
- Controle de data limite de entrega (Deadline), contagem regressiva de dias, alertas de projetos atrasados e prioridade (`Baixa`, `Normal`, `Alta`, `Urgente`).
- Armazenamento 100% offline via LocalStorage com backup e restauração JSON.

### 6. Ferramentas Integradas
- **Analisador FFT em Tempo Real**: Espectro de frequências com Web Audio API e gerador de tons senoidais de calibração.
- **Calculadora de Delay & Reverb por BPM**: Tempos normais, pontuados e tercinas calculados instantaneamente com pre-delay e decay.
- **Mix Doctor**: Diagnósticos inteligentes para corrigir mascaramento, cancelamento de fase e excesso de subgraves.
- **Atalhos Globais**: Navegação rápida pelo teclado (`Ctrl/Cmd + 1-9`, `Ctrl + F`, `Ctrl + D`, `?`).

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **NPM** ou **Yarn**

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/melo-mix-master-assistant.git

# 2. Acesse o diretório
cd melo-mix-master-assistant

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build de Produção

```bash
npm run build
```

---

## 🌐 Como Subir no Netlify (Deploy Instantâneo)

Este projeto já está 100% configurado para o **Netlify** com `netlify.toml`, `public/_redirects` (evita erro 404 em SPA) e `public/_headers` (HTTPS & Cache otimizado).

### Opção 1: Via GitHub (Recomendado)
1. Suba o código para o seu repositório no GitHub.
2. Acesse [Netlify](https://app.netlify.com) e clique em **"Add new site" > "Import an existing project"**.
3. Conecte ao GitHub e selecione este repositório.
4. O Netlify detectará automaticamente as configurações do `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Clique em **"Deploy Site"**.

### Opção 2: Netlify Drop (Arrastar Pasta)
1. Execute `npm run build` na sua máquina.
2. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arraste a pasta gerada **`dist`** direto para a janela do navegador.

---

## 🛠️ Tecnologias Utilizadas


- **React 18** com TypeScript
- **Tailwind CSS v4**
- **Lucide React** (Ícones profissionais)
- **Web Audio API** (Captura de microfone e análise FFT em tempo real)
- **LocalStorage Engine** (Persistência segura offline)

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para mais detalhes.

---

**Desenvolvido para Produtores e Engenheiros do FL Studio** 🎹🔥
