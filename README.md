<div align="center">

# 🔮 PERSONA FUSION HUB 🔮

### *"I am thou, thou art I"*

🃏 *Bem-vindo(a) à Velvet Room* 🃏

![Status](https://img.shields.io/badge/STATUS-ONLINE-00f7ff?style=for-the-badge&labelColor=0a0a0a)
![P5R](https://img.shields.io/badge/PERSONA_5-ROYAL-ff0000?style=for-the-badge&labelColor=0a0a0a)
![P3R](https://img.shields.io/badge/PERSONA_3-RELOAD-1ce0e0?style=for-the-badge&labelColor=0a0a0a)
![License](https://img.shields.io/badge/LICENSE-MIT-gold?style=for-the-badge&labelColor=0a0a0a)

</div>

---

## 📖 I. Visão Geral do Projeto

> *"O poder de despertar reside em todos nós..."*

O **Persona Fusion Hub** é uma aplicação web interativa criada para auxiliar jogadores da aclamada franquia de RPG **Persona** — com foco nas edições **Persona 3 Reload** e **Persona 5 Royal**.

No universo do jogo, a mecânica central para fortalecer sua equipe é o **sacrifício e fusão de Personas** na Velvet Room. Esse processo segue uma matriz matemática complexa que cruza **Arcanas (Classes)** e **Níveis de Combate** — calcular isso de cabeça, ou por tentativa e erro, consome horas preciosas de gameplay.

Este projeto automatiza todo esse cálculo através de **algoritmos combinatórios**, entregando uma interface imersiva, limpa e veloz para simular resultados, descobrir receitas inversas e analisar dados detalhados antes mesmo de ligar o console.

---

## 🎯 II. Escopo da Aplicação

O ecossistema foi desenhado para entregar dados precisos sem excesso de cliques, operando inteiramente através de **calculadoras interativas** e **modais**.

### ✨ Principais Funcionalidades

| Ícone | Funcionalidade | Descrição |
|:---:|---|---|
| ⚔️ | **Guilhotina / Fusão de Díades** | Cálculo direto: simula a fusão de dois ingredientes selecionados e exibe a Persona resultante |
| 🔍 | **Busca de Registros** | Cálculo reverso via algoritmo de força bruta `O(N²)` — varre o compêndio e lista todas as combinações possíveis para gerar uma Persona Alvo (incluindo receitas avançadas e upgrades DLC/Picaro) |
| 📊 | **Fichas de Status Detalhadas** | Modais dinâmicos com Traits, Afinidades Elementais (Fraquezas, Repel, Imunidades) e Atributos Físicos/Mágicos (ST, MA, EN, AG, LU) |
| 🎮 | **Persona Guess** *(Minigame P3R)* | Modo bônus inspirado no Wordle, gerando desafios diários — adivinhe a Persona pelas dicas |
| 🎓 | **Tutorial Onboarding** | Modais interativos de passo a passo na primeira visita, persistidos via `localStorage` |

### 📌 Limites do Escopo

**✅ Incluído:**
- Cálculo de Arcanas e Níveis
- Fusões Especiais (ex: Alice, Shiva)
- Upgrades de DLC (Picaro)
- Tratamento de Demônios do Tesouro
- Atributos Base e Fraquezas Elementais

**❌ Não Incluído:**
- Herança dinâmica de Skills (movimentos de combate específicos)
- Localização de mapas e drops de itens

---

## 🛠️ III. Tecnologias e Dependências

> *Construído sobre os alicerces do Web Development clássico — performance, manipulação direta do DOM e zero overhead.*

### 🖥️ Frontend (Interface e Lógica de Cliente)

```
HTML5    → Semântica e estrutura
CSS3     → Glassmorphism (P3R) + Phantom Dark Mode (P5R)
           Animações Keyframe, CSS Grid/Flexbox, clip-path
Vanilla JS (ES6+) → Fetch API, Promises, Algoritmos de Matriz,
                     manipulação direta do DOM sem libs de terceiros
```

### ⚙️ Backend (API Externa e Dados)

```
Node.js & Express.js → APIs REST independentes (Endpoints JSON)
Render                → Hospedagem em nuvem gratuita
```

> ⚛️ **Nota da Equipe:** Com o objetivo de expandir os estudos em diferentes arquiteturas web, outros membros do grupo realizaram um **porte para React**, recriando a mesma lógica combinatória através de Componentes Funcionais, Hooks e Estados Reativos.

---

## 🚀 IV. Como Executar e Testar

### 🌐 Acesso Online *(Recomendado)*

A aplicação está hospedada via **GitHub Pages**. Teste todas as calculadoras e o minigame direto pelo navegador:

<div align="center">

### 👉 **[Acessar Persona Fusion Hub](https://matheuspagaime17.github.io/Persona-Fusion-Calculator/)** 👈

</div>

### 💻 Rodando Localmente *(Self-Host)*

Como a versão Vanilla consome APIs externas, **não é necessário** ambiente Node local ou processos de build.

**1.** Clone este repositório:
```bash
git clone https://github.com/MatheusPagaime17/Persona-Fusion-Calculator.git
```

**2.** Abra o diretório no VS Code (ou editor de preferência).

**3.** Execute um servidor local:
- Recomendado: extensão **Live Server** no VS Code → clique direito em `index.html` → *Open with Live Server*
- Alternativa: `http-server` via terminal, ou qualquer Apache/Nginx base

---

## 📡 V. Integração com API *(Engenharia de Rede)*

A aplicação **não utiliza arquivos `.json` estáticos locais** — depende de REST APIs públicas que estruturam o compêndio dos jogos.

### 🔗 Endpoints Consumidos

| Jogo | Endpoint |
|---|---|
| **P5R** | `https://mpppersona5-api.onrender.com/personas/` |
| **P3R** | `https://persona-compendium.onrender.com/personas/` |

### 🛡️ Arquitetura de Resiliência Implementada

- **🔓 No-Auth** — APIs read-only (`GET` livre), sem necessidade de API Keys
- **🔥 Warm-Up System** — Hospedada no tier free do Render, a API tende a "dormir" (*Cold Start*). O frontend dispara um ping autônomo e assíncrono na inicialização para acordar o servidor silenciosamente
- **⏱️ Retry com Backoff Exponencial** — Requisições protegidas: se a API não responder, o sistema aguarda `4s → 8s → 16s`, alertando o usuário via barra dinâmica de loading (timeout de 25s por tentativa)
- **💾 Cache Inteligente (Offline First)** — Após o primeiro sucesso, os dados são salvos no `localStorage` com validade de **24 horas**. Nas visitas seguintes, a aplicação abre em **0.01s**

---

## 📂 VI. Estrutura de Pastas

> Para preservar as identidades visuais distintas de cada jogo, o projeto é compartimentado de forma modular:

```
📦 persona-fusion-hub
 ┣ 📜 index.html                # Portal Principal de Seleção
 ┣ 📜 global.css                # Variáveis CSS Globais e Resets
 ┃
 ┣ 📂 p5r                       # Módulo: Persona 5 Royal
 ┃ ┣ 📜 index.html              # UI (Guilhotina, Reversa, Modais)
 ┃ ┣ 📜 style.css               # Tema (Phantom Thief Dark Mode)
 ┃ ┗ 📜 script.js               # Algoritmo de Fusão, DOM e API Fetch
 ┃
 ┗ 📂 p3r                       # Módulo: Persona 3 Reload
   ┣ 📜 index.html              # UI das Calculadoras P3R
   ┣ 📜 p3r-guess.html          # Minigame (Persona Guess)
   ┣ 📜 style.css           # Tema (Velvet Room Aqua Glassmorphism)
   ┣ 📜 script.js           # Algoritmos Base e Controle de UI
   ┗ 📂 img-personas            # Repositório estático de avatares das Personas
```

---

## ✨ VII. Agradecimentos Especiais

> 🙏 Um profundo agradecimento a **luylish**, criador e mantenedor da **Persona Compendium API** (Persona 3 Reload).

O trabalho excepcional em catalogar descrições, stats minuciosos e propriedades.

**Todo o nosso reconhecimento!** 🎩

---

<div align="center">

### 🌙 *"A verdadeira força nasce do vínculo entre os corações."* 🌙

**Made with 💙 by Matheus Pagaime**

</div>
