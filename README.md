# ✦ David Salviano — Portfolio & Interface Architecture

<div align="center">
  <p align="center">
    <strong>Portfólio de Product Design, Arquitetura de Interfaces e Sistemas Digitais</strong>
  </p>
  <p align="center">
    <a href="https://davidsalvianodesign.com">davidsalvianodesign.com</a>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
    <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/Sanity-v3-F03E2F?style=flat-square&logo=sanity&logoColor=white" alt="Sanity CMS" />
    <img src="https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/i18n-EN%20%7C%20PT--BR-blue?style=flat-square" alt="i18n" />
  </p>
</div>

---

## 📖 Visão Geral

Este projeto é o portfólio oficial de **David Salviano** (Senior Product Designer). Desenvolvido com foco em alta performance visual, microinterações refinadas, arquitetura de componentes escalável e suporte multilíngue nativo com pré-renderização de SEO para indexação completa por motores de busca e crawlers sociais.

### 🌟 Destaques do Projeto

- 🎨 **Design & Microinterações**: Transições fluidas com GSAP, Framer Motion, Anime.js, rolagem inercial com Lenis e cursor contextual reativo.
- 🌐 **Internacionalização Robusta (i18n)**: Roteamento dedicado por idioma (`/en` e `/pt`), sincronização automática com fallback e automação de tradução.
- ⚡ **Headless CMS com Sanity**: Gerenciamento de estudos de caso, blocos dinâmicos e mídias ricas através de schemas modulares no Sanity Studio.
- 🚀 **SEO & Prerender Automatizado**: Pipeline de build customizado que gera arquivos estáticos otimizados com tags OpenGraph, Twitter Cards, Canonical/Hreflang e JSON-LD Schema.org.
- 📬 **API Serverless de Contato**: Envio seguro de mensagens através de Vercel Serverless Functions integradas ao Resend.

---

## 🛠️ Stack Tecnológica

### Core & Framework
- **React 19** — Biblioteca para construção de interfaces reativas
- **Vite 8** — Bundler ultrarrápido com Hot Module Replacement (HMR)
- **React Router DOM 7** — Roteamento declarativo no client-side

### Estilização & UI
- **Tailwind CSS v4** — Framework utilitário de estilização de última geração
- **Lucide React** — Pacote de ícones minimalistas e consistentes
- **Tipografia**: *Geist*, *Geist Mono* e *Libre Baskerville*

### Animações & Experiência do Usuário
- **GSAP (GreenSock)** & **Framer Motion** — Orquestração de animações complexas e transições de página
- **Anime.js** — Animações vetoriais e efeitos interativos
- **Lenis** — Smooth scrolling inercial

### Gestão de Conteúdo (CMS)
- **Sanity.io** (`@sanity/client`, `@sanity/image-url`) — Estrutura de conteúdo modular com schemas tipados para estudos de caso, blocos de mídia e seções institucionais.

### Backend Serverless (Vercel Functions)
- **Resend API** — Disparo de e-mails transacionais e formulário de contato.
- **DeepL API** — Pipeline de automação de tradução de conteúdo.

---

## 📁 Estrutura de Diretórios

```plaintext
david-salviano-portfolio/
├── api/                    # Serverless Functions (Vercel)
│   ├── contact.js          # Endpoint de envio de e-mails via Resend
│   └── translate.js        # Endpoint de tradução automática via DeepL
├── sanity/                 # Sanity Studio (Headless CMS)
│   ├── schemas/            # Schemas de dados (projetos, blocos modulares, páginas)
│   └── sanity.config.js    # Configuração do Studio
├── scripts/                # Scripts utilitários de build e manutenção
│   ├── build-seo-prerender.js   # Pré-renderizador estático para SEO e OpenGraph
│   ├── check-i18n-keys.js       # Validador de paridade de chaves i18n
│   └── test-seo-http.js         # Validador HTTP de tags e rotas
├── src/
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── case/           # Componentes de renderização de Case Studies
│   │   ├── common/         # Elementos compartilhados (botões, cards, overlays)
│   │   ├── home/           # Seções da página inicial (Hero, Grid, Galeria)
│   │   ├── MouseFollower.jsx
│   │   ├── Navbar.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── SEOHead.jsx
│   ├── config/             # Configurações globais
│   ├── context/            # Contextos React (tema, estado global)
│   ├── hooks/              # Custom React Hooks
│   ├── i18n/               # Configuração do i18next e dicionários de tradução
│   ├── pages/              # Páginas da aplicação (Home, Work, CaseStudy, About, Contact)
│   ├── services/           # Clientes de API (Sanity, endpoints internos)
│   ├── utils/              # Funções utilitárias e helpers
│   ├── App.jsx             # Estrutura de rotas e providers
│   ├── main.jsx            # Ponto de entrada React
│   └── index.css           # Estilos globais e tokens de design
├── public/                 # Assets públicos estáticos (ícones, imagens base)
├── vercel.json             # Configuração de rotas, headers de segurança e reescritas
└── vite.config.js          # Configuração do bundler Vite
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js**: versão `18.x` ou superior
- **npm** ou gerenciador de pacotes equivalente

### 1. Clonar e Instalar Dependências

```bash
# Clone o repositório
git clone https://github.com/DaviidSalviano/david-salviano-portfolio.git

# Acesse o diretório
cd david-salviano-portfolio

# Instale as dependências da aplicação principal
npm install

# (Opcional) Instale as dependências do Sanity Studio
cd sanity && npm install && cd ..
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
# Configurações do Sanity CMS
VITE_SANITY_PROJECT_ID=pjq90dr2
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Configurações de Envio de E-mail (Serverless / Produção)
RESEND_API_KEY=sua_chave_resend_aqui
CONTACT_TO_EMAIL=seu_email_de_destino@dominio.com
CONTACT_FROM_EMAIL=seu_email_verificado@dominio.com
```

### 3. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```
O aplicativo estará disponível em `http://localhost:5173`.

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor local de desenvolvimento Vite com HMR |
| `npm run build` | Valida chaves i18n, compila o bundle de produção e executa o pré-renderizador de SEO |
| `npm run preview` | Inicia um servidor local para testar o build de produção (`dist`) |
| `npm run check:i18n` | Verifica se todas as chaves de tradução estão sincronizadas entre `en` e `pt-BR` |
| `npm run test:seo` | Executa testes automatizados para validar meta tags, hreflang e OpenGraph |
| `npm run lint` | Executa a análise estática com ESLint |

---

## 🌍 Estratégia de SEO & Internacionalização

1. **Roteamento Bilíngue**:
   - `/en` — Versão em Inglês
   - `/pt` — Versão em Português (Brasil)
   - Redirecionamento e fallback baseados no idioma do navegador / persistência de preferência.
2. **Build-Time SEO Pre-rendering**:
   - O script `scripts/build-seo-prerender.js` gera páginas HTML estáticas dedicadas para cada rota e idioma, garantindo que web crawlers (Googlebot, LinkedIn Bot, Twitterbot, etc.) recebam metadados corretos de forma síncrona.
3. **Structured Data**:
   - Injeção automática de schemas JSON-LD (`Person`, `CreativeWork`, `WebSite`).

---

## 🛡️ Licença

Este projeto é de propriedade privada de **David Salviano**. Todos os direitos reservados.
