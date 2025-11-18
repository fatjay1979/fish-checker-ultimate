# 🐟 Fish Checker Ultimate

> AI-powered WordPress Data Validator with Perplexity & OpenAI Integration

Ein professionelles Tool zur wissenschaftlichen Validierung von Fischdaten in WordPress Custom Post Types mit künstlicher Intelligenz.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Inhaltsverzeichnis

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Konfiguration](#-konfiguration)
- [Verwendung](#-verwendung)
- [Docker](#-docker)
- [API Endpoints](#-api-endpoints)
- [Entwicklung](#-entwicklung)

## ✨ Features

### 🎯 Dashboard
- **Übersichtliche Statistiken** - Alle wichtigen Infos auf einen Blick
- **Quick Stats** - WordPress, AI Engine, Model, Status
- **Feature Cards** - Schneller Zugriff auf alle Funktionen
- **Setup-Warnungen** - Klare Hinweise bei fehlender Konfiguration

### 🔌 WordPress Integration
- **REST API** - Nahtlose Integration mit WordPress
- **Custom Post Types** - Unterstützung für alle CPTs
- **Custom Fields** - ACF & Meta-Daten Unterstützung
- **Live Testing** - Teste WordPress-Verbindung in Echtzeit

### 🤖 AI-Powered Analysis
- **Dual Engine Support** - OpenAI GPT-4o & Perplexity Sonar
- **Deep Research** - Wissenschaftliche Faktenprüfung
- **Smart Suggestions** - Intelligente Korrekturvorschläge
- **JSON Response** - Strukturierte Analyse-Ergebnisse

### 📊 Batch Processing
- **Multi-Select** - Mehrere Posts gleichzeitig auswählen
- **Progress Tracking** - Echtzeit-Fortschrittsanzeige
- **Bulk Analysis** - Effiziente Massenverarbeitung
- **Error Handling** - Robuste Fehlerbehandlung

### 🎨 Smart Review System
- **Accept/Reject** - Intuitive Entscheidungsfindung
- **Inline Editing** - Direkte Bearbeitung von Vorschlägen
- **Visual Feedback** - Farbcodierte Status-Anzeigen
- **Meta Key Display** - Klare Feldzuordnung

### 🧪 API Testing
- **WordPress Test** - Verbindung validieren
- **OpenAI Test** - API Key prüfen
- **Perplexity Test** - Sonar API validieren
- **Live Results** - Sofortiges Feedback

## 🛠 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- Shadcn/ui Components
- Lucide Icons

**State Management:**
- Zustand (mit Persist Middleware)

**AI/API:**
- OpenAI SDK 4.28
- Perplexity API
- WordPress REST API

**Development:**
- ESLint
- PostCSS
- Autoprefixer

**Deployment:**
- Docker
- Docker Compose
- Multi-stage Builds

## 📸 Screenshots

### Dashboard
```
┌─────────────────────────────────────────────────┐
│  🏠 Dashboard                                    │
│                                                  │
│  Quick Stats:                                   │
│  ✓ WordPress: Verbunden                         │
│  ✓ AI Engine: Perplexity                        │
│  ✓ Status: Ready                                │
│                                                  │
│  Features:                                       │
│  ▢ WordPress Integration      ▢ AI Analysis    │
│  ▢ Batch Processing           ▢ Review System  │
└─────────────────────────────────────────────────┘
```

### Settings mit API Tests
```
┌─────────────────────────────────────────────────┐
│  ⚙️ Settings                                     │
│                                                  │
│  WordPress Connection          [Test] ✓         │
│  ├─ URL: https://site.com                       │
│  ├─ User: admin                                 │
│  └─ CPT: tierfische                             │
│                                                  │
│  AI Engine                                       │
│  ├─ Perplexity               [Test] ✓           │
│  └─ OpenAI                   [Test] ✓           │
└─────────────────────────────────────────────────┘
```

## 🚀 Installation

### Voraussetzungen
- Node.js 20+
- npm oder yarn
- Docker & Docker Compose (optional)
- WordPress Website mit REST API
- OpenAI oder Perplexity API Key

### Methode 1: Lokal (Entwicklung)

```bash
# Repository klonen
git clone https://github.com/fatjay1979/fish-checker-ultimate.git
cd fish-checker-ultimate

# Dependencies installieren
npm install

# Environment-Variablen konfigurieren (optional)
cp .env.example .env

# Development Server starten
npm run dev
```

Öffne http://localhost:3300

### Methode 2: Docker (Produktion)

```bash
# Repository klonen
git clone https://github.com/fatjay1979/fish-checker-ultimate.git
cd fish-checker-ultimate

# Docker Image bauen und starten
docker-compose up -d

# Logs anzeigen
docker-compose logs -f
```

Öffne http://localhost:3300

## ⚙️ Konfiguration

### 1. WordPress Setup

1. Gehe zu `/settings`
2. Trage deine WordPress-Daten ein:
   - **URL**: `https://deine-site.com`
   - **Username**: WordPress Admin User
   - **App Password**: [WordPress App Password generieren](https://wordpress.org/support/article/application-passwords/)
   - **CPT Slug**: z.B. `tierfische`, `products`, etc.

3. Klicke auf **"Verbindung testen"**

### 2. AI Engine Konfiguration

**OpenAI:**
1. API Key von [OpenAI Platform](https://platform.openai.com/api-keys) holen
2. In Settings unter "OpenAI API Key" eintragen
3. Model wählen: `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`
4. Testen klicken

**Perplexity (Empfohlen):**
1. API Key von [Perplexity](https://www.perplexity.ai/) holen
2. In Settings unter "Perplexity API Key" eintragen
3. Model wählen: `sonar-reasoning`, `sonar`, `sonar-pro`
4. Testen klicken

### 3. System Prompt Anpassung

Der System Prompt steuert, wie die AI deine Daten analysiert:

```
Du bist ein strenger wissenschaftlicher Ichthyologe (Fischexperte).
Deine Aufgabe: Deep Research Faktencheck.
INPUT DATEN: Du erhältst ein JSON mit "CustomFields".
AUFGABE: Analysiere jeden Wert auf wissenschaftliche Korrektheit.
WICHTIG: Wenn du einen Fehler findest, gib zwingend den exakten Key zurück.
FORMAT BEIBEHALTEN: 22-24 °C bleibt 22-24 °C, nicht "bis" schreiben.
Antworte NUR im JSON Format.
```

Passe diesen Prompt an deine Daten an!

## 📖 Verwendung

### Single Post Analysis

1. Gehe zu **Posts** (`/posts`)
2. Wähle einen Post aus der Liste
3. Klicke auf **"Analysieren"**
4. Warte auf AI-Analyse
5. Review die Vorschläge:
   - ✅ **Accept** - Änderung übernehmen
   - ❌ **Reject** - Ablehnen
   - ✏️ **Edit** - Manuell bearbeiten
6. Klicke **"An WP senden"** zum Speichern

### Batch Analysis

1. Gehe zu **Batch** (`/batch`)
2. Wähle mehrere Posts aus (Checkboxen)
3. Oder klicke **"Alle"** für alle Posts
4. Klicke **"Batch-Analyse starten"**
5. Beobachte den Fortschritt
6. Siehe Ergebnisse in Echtzeit

### Search & Filter

In der **Posts**-Übersicht:
- Nutze die Suchleiste
- Suche nach Titel, ID, oder Inhalt
- Echtzeit-Filterung

## 🐳 Docker

### Docker Commands

```bash
# Container starten
docker-compose up -d

# Container stoppen
docker-compose down

# Logs anzeigen
docker-compose logs -f

# Container neustarten
docker-compose restart

# Image neu bauen (nach Code-Änderungen)
docker-compose build --no-cache
docker-compose up -d

# Container Status prüfen
docker ps
```

### Docker Configuration

**Port:** 3300 (konfigurierbar in `docker-compose.yml`)

**Environment Variables:**
```yaml
environment:
  - NODE_ENV=production
  - PORT=3300
```

**Volumes:**
```yaml
volumes:
  - ./.env:/app/.env:ro  # Optional für API Keys
```

## 🔧 API Endpoints

### WordPress REST API

```
GET  /wp-json/wp/v2/{cpt_slug}          # Posts abrufen
GET  /wp-json/wp/v2/{cpt_slug}/{id}     # Single Post
POST /wp-json/wp/v2/{cpt_slug}/{id}     # Post aktualisieren
```

### Server Actions

```typescript
// AI Analysis
runAnalysis(data, options)

// API Testing
testWordPressConnection(url, user, password, cptSlug)
testOpenAIConnection(apiKey)
testPerplexityConnection(apiKey)

// WordPress Operations
fetchPosts(settings)
fetchSinglePost(id, settings)
updatePostInWordPress(id, changes, settings)
```

## 👨‍💻 Entwicklung

### Development Setup

```bash
# Dependencies installieren
npm install

# Dev Server starten (Port 3300)
npm run dev

# TypeScript Check
npm run build

# Linting
npm run lint
```

### Project Structure

```
fish-checker-ultimate/
├── app/                    # Next.js App Router
│   ├── actions/           # Server Actions
│   │   ├── analyze.ts     # AI Analysis
│   │   └── test-api.ts    # API Tests
│   ├── batch/             # Batch Analysis Page
│   ├── check/[id]/        # Single Post Analysis
│   ├── dashboard/         # Dashboard Page
│   ├── posts/             # Posts Overview
│   ├── settings/          # Settings Page
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Home (Redirect)
│   └── globals.css        # Global Styles
├── components/            # React Components
│   ├── ui/               # Shadcn/ui Components
│   ├── Navigation.tsx    # Main Navigation
│   └── ReviewCard.tsx    # Review Component
├── lib/                   # Utilities
│   ├── store.ts          # Zustand Store
│   ├── utils.ts          # Helper Functions
│   └── wordpress.ts      # WP API Client
├── public/               # Static Assets
├── Dockerfile            # Docker Config
├── docker-compose.yml    # Docker Compose
├── next.config.js        # Next.js Config
├── tailwind.config.ts    # Tailwind Config
├── tsconfig.json         # TypeScript Config
└── package.json          # Dependencies
```

### Key Files

**Store (`lib/store.ts`):**
```typescript
- wpUrl, wpUser, wpAppPassword
- cptSlug, taxonomySlug
- openaiApiKey, perplexityApiKey
- activeEngine, activeModel
- systemPrompt
```

**Actions (`app/actions/analyze.ts`):**
```typescript
runAnalysis(data, options)
  - Verbindet mit AI Engine
  - Sendet Daten + System Prompt
  - Erhält strukturiertes JSON
  - Return: { success, data, meta }
```

## 🤝 Contributing

Contributions sind willkommen!

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📝 License

Dieses Projekt ist unter der MIT License lizenziert.

## 🙏 Acknowledgments

- **Next.js** - React Framework
- **OpenAI** - GPT Models
- **Perplexity** - Sonar Models
- **Shadcn/ui** - UI Components
- **Zustand** - State Management
- **Tailwind CSS** - Styling

## 📧 Support

Bei Fragen oder Problemen:
- GitHub Issues: [Create Issue](https://github.com/fatjay1979/fish-checker-ultimate/issues)
- GitHub Discussions: [Start Discussion](https://github.com/fatjay1979/fish-checker-ultimate/discussions)

## 🚀 Roadmap

- [ ] Multi-Language Support (EN, DE)
- [ ] Advanced Filtering & Sorting
- [ ] Export Reports (PDF, CSV)
- [ ] Scheduled Batch Analysis
- [ ] Email Notifications
- [ ] Analytics Dashboard
- [ ] Custom Field Mapping
- [ ] API Rate Limiting
- [ ] Webhook Support
- [ ] Plugin für WordPress

---

**Built with ❤️ using Claude Code**

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>