# 🚀 Setup Guide - Fish Checker Ultimate

Detaillierte Anleitung zur Installation und Konfiguration von Fish Checker Ultimate.

## 📋 Inhaltsverzeichnis

1. [Systemanforderungen](#systemanforderungen)
2. [Installation](#installation)
3. [WordPress Setup](#wordpress-setup)
4. [API Keys Setup](#api-keys-setup)
5. [Erste Schritte](#erste-schritte)
6. [Troubleshooting](#troubleshooting)

---

## 🖥 Systemanforderungen

### Minimal Requirements

- **Node.js:** 20.0.0 oder höher
- **npm:** 10.0.0 oder höher
- **RAM:** 2GB minimum
- **Disk Space:** 500MB für Dependencies

### Empfohlen

- **Node.js:** 20.11.0 (LTS)
- **npm:** 10.8.0+
- **RAM:** 4GB+
- **Disk Space:** 1GB+

### Optional (für Docker)

- **Docker:** 20.10.0+
- **Docker Compose:** 2.0.0+

### WordPress Requirements

- **WordPress:** 5.9+
- **REST API:** Aktiviert (Standard)
- **Application Passwords:** Verfügbar (WP 5.6+)
- **Custom Post Type:** Registriert

---

## 📥 Installation

### Option 1: Lokale Installation (Entwicklung)

#### Schritt 1: Repository klonen

```bash
git clone https://github.com/fatjay1979/fish-checker-ultimate.git
cd fish-checker-ultimate
```

#### Schritt 2: Dependencies installieren

```bash
npm install
```

Dies installiert alle benötigten Packages:
- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3
- OpenAI SDK
- Zustand
- Shadcn/ui Components
- und mehr...

**Installation dauert:** 2-5 Minuten (je nach Internetverbindung)

#### Schritt 3: Environment Variables (Optional)

```bash
cp .env.example .env
```

Bearbeite `.env` falls gewünscht:

```env
# WordPress Configuration (optional - kann auch in UI gemacht werden)
WP_URL=https://your-site.com
WP_USER=your-username
WP_APP_PASSWORD=your-app-password
CPT_SLUG=tierfische

# AI API Keys (optional - kann auch in UI gemacht werden)
OPENAI_API_KEY=sk-...
PERPLEXITY_API_KEY=pplx-...
```

**Hinweis:** Diese Variablen sind optional! Du kannst alles direkt in der UI konfigurieren.

#### Schritt 4: Development Server starten

```bash
npm run dev
```

**Output:**
```
  ▲ Next.js 14.2.33
  - Local:        http://localhost:3300

 ✓ Starting...
 ✓ Ready in 2.5s
```

**Fertig!** Öffne http://localhost:3300

---

### Option 2: Docker Installation (Produktion)

#### Schritt 1: Repository klonen

```bash
git clone https://github.com/fatjay1979/fish-checker-ultimate.git
cd fish-checker-ultimate
```

#### Schritt 2: Docker Image bauen

```bash
docker-compose build
```

**Build-Zeit:** 5-10 Minuten beim ersten Mal

**Was passiert:**
1. Node.js 20 Alpine Image wird heruntergeladen
2. Dependencies werden installiert
3. TypeScript wird kompiliert
4. Next.js Production Build wird erstellt
5. Optimiertes Image wird erstellt

#### Schritt 3: Container starten

```bash
docker-compose up -d
```

**Output:**
```
Network aigooglecode_fish-checker-network  Created
Container fish-checker-ultimate  Started
```

#### Schritt 4: Logs prüfen

```bash
docker-compose logs -f
```

**Erwarteter Output:**
```
fish-checker-ultimate  |   ▲ Next.js 14.2.33
fish-checker-ultimate  |   - Local: http://localhost:3300
fish-checker-ultimate  |  ✓ Ready in 326ms
```

**Fertig!** Öffne http://localhost:3300

---

## 🔧 WordPress Setup

### Schritt 1: Application Password erstellen

1. Gehe zu deinem WordPress Admin Panel
2. Navigiere zu: **Users → Profile**
3. Scrolle nach unten zu **"Application Passwords"**
4. Gib einen Namen ein: `Fish Checker Ultimate`
5. Klicke **"Add New Application Password"**
6. **Kopiere das generierte Passwort!** (Format: `xxxx xxxx xxxx xxxx`)

**Wichtig:** Das Passwort wird nur einmal angezeigt!

**Alternativ (WordPress < 5.6):**
- Installiere Plugin: [Application Passwords](https://wordpress.org/plugins/application-passwords/)

### Schritt 2: Custom Post Type prüfen

Dein Custom Post Type muss in `show_in_rest` haben:

```php
register_post_type('tierfische', [
    'public' => true,
    'show_in_rest' => true,  // ← Wichtig!
    'rest_base' => 'tierfische',
    // ... weitere Optionen
]);
```

Ohne `show_in_rest` funktioniert die REST API nicht!

### Schritt 3: REST API testen

Teste manuell, ob die REST API funktioniert:

```bash
curl -X GET "https://deine-site.com/wp-json/wp/v2/tierfische?per_page=1"
```

**Erwarteter Output:**
```json
[
  {
    "id": 123,
    "title": { "rendered": "Dein Post Titel" },
    "meta": { ... }
  }
]
```

### Schritt 4: In App konfigurieren

1. Öffne http://localhost:3300/settings
2. Trage ein:
   - **WordPress URL:** `https://deine-site.com`
   - **Username:** Dein WordPress Admin Username
   - **App Password:** Das generierte Password (mit Leerzeichen)
   - **CPT Slug:** z.B. `tierfische`
3. Klicke **"Verbindung testen"**

**Erfolgreiche Verbindung:**
```
✓ Verbindung erfolgreich! 50 Posts gefunden.
```

**Fehler?** Siehe [Troubleshooting](#troubleshooting)

---

## 🤖 API Keys Setup

### Option 1: OpenAI

#### Schritt 1: API Key holen

1. Gehe zu [OpenAI Platform](https://platform.openai.com/api-keys)
2. Login mit deinem Account
3. Klicke **"Create new secret key"**
4. Gib einen Namen ein: `Fish Checker`
5. Kopiere den Key (Format: `sk-proj-...`)

**Kosten:** Pay-as-you-go
- GPT-4o: ~$5 / 1M tokens
- GPT-4o-mini: ~$0.15 / 1M tokens

#### Schritt 2: In App konfigurieren

1. Öffne http://localhost:3300/settings
2. Scrolle zu **"API Keys"**
3. Trage ein unter **"OpenAI API Key"**: `sk-proj-...`
4. Klicke **"Test"**

**Erfolgreicher Test:**
```
✓ OpenAI verbunden! Model: gpt-4o-mini
Response: "API works!"
```

#### Schritt 3: Engine & Model wählen

1. Scrolle zu **"AI Engine Auswahl"**
2. Wähle **"Active Engine"**: `OpenAI`
3. Wähle **"Model"**:
   - `gpt-4o` - Beste Qualität (teuer)
   - `gpt-4o-mini` - Gut & günstig (empfohlen für Tests)
   - `gpt-4-turbo` - Schnell & gut

---

### Option 2: Perplexity (Empfohlen)

#### Schritt 1: API Key holen

1. Gehe zu [Perplexity](https://www.perplexity.ai/)
2. Erstelle einen Account
3. Navigiere zu API Settings
4. Generiere einen neuen API Key
5. Kopiere den Key (Format: `pplx-...`)

**Kosten:**
- Sonar: ~$1 / 1M tokens
- Sonar Reasoning: ~$5 / 1M tokens
- **Vorteil:** Web-Search Integration!

#### Schritt 2: In App konfigurieren

1. Öffne http://localhost:3300/settings
2. Scrolle zu **"API Keys"**
3. Trage ein unter **"Perplexity API Key"**: `pplx-...`
4. Klicke **"Test"**

**Erfolgreicher Test:**
```
✓ Perplexity verbunden! Model: sonar
Response: "API works!"
```

#### Schritt 3: Engine & Model wählen

1. Scrolle zu **"AI Engine Auswahl"**
2. Wähle **"Active Engine"**: `Perplexity (Empfohlen)`
3. Wähle **"Model"**:
   - `sonar-reasoning` - Beste Qualität für Research (empfohlen)
   - `sonar` - Standard, schnell
   - `sonar-pro` - Erweiterte Features

---

## 🎯 Erste Schritte

### 1. Settings komplett ausfüllen

Gehe zu http://localhost:3300/settings und teste:

- ✅ WordPress Connection
- ✅ AI API (OpenAI oder Perplexity)
- ✅ Klicke **"Alle Einstellungen speichern"**

### 2. Dashboard prüfen

Gehe zu http://localhost:3300/dashboard

Du solltest sehen:
- **Quick Stats:** Alle grün ✓
- **Features:** Alle als "Aktiv" markiert
- **Quick Actions:** Buttons funktionieren

### 3. Ersten Post analysieren

1. Gehe zu **Posts** (`/posts`)
2. Suche einen Post in der Liste
3. Klicke **"Analysieren"**
4. Wähle Engine & Model
5. Klicke **"Deep Research"**
6. Warte 10-30 Sekunden
7. Review die Vorschläge
8. Accept/Reject/Edit
9. Klicke **"An WP senden"**

**Fertig!** Der Post wurde in WordPress aktualisiert.

### 4. Batch-Analyse testen

1. Gehe zu **Batch** (`/batch`)
2. Wähle 3-5 Posts aus (Checkbox)
3. Klicke **"Batch-Analyse starten"**
4. Beobachte den Progress Bar
5. Siehe Ergebnisse

---

## 🔧 Troubleshooting

### WordPress Connection Failed

**Problem:** `Error: 401 Unauthorized`

**Lösung:**
1. Prüfe Username & App Password
2. App Password **mit** Leerzeichen eingeben
3. Prüfe ob REST API aktiviert ist
4. Teste manuell: `curl -u username:password https://site.com/wp-json/wp/v2/users/me`

---

**Problem:** `Error: 404 Not Found`

**Lösung:**
1. CPT Slug richtig geschrieben?
2. `show_in_rest` im CPT aktiviert?
3. Permalinks neu speichern: WP Admin → Settings → Permalinks → Save
4. Teste: `curl https://site.com/wp-json/wp/v2/DEIN_CPT_SLUG`

---

**Problem:** `Error: CORS blocked`

**Lösung:**
WordPress muss CORS erlauben. Füge zu `wp-config.php` hinzu:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

---

### AI API Failed

**Problem:** `Error: Invalid API key`

**Lösung:**
1. Key richtig kopiert? (kein Leerzeichen am Ende)
2. OpenAI Key muss mit `sk-` beginnen
3. Perplexity Key muss mit `pplx-` beginnen
4. Account hat Guthaben?

---

**Problem:** `Error: Rate limit exceeded`

**Lösung:**
1. Warte 60 Sekunden
2. Reduziere Batch-Größe
3. Upgrade API Plan

---

### Docker Issues

**Problem:** `Container won't start`

**Lösung:**
```bash
# Logs prüfen
docker-compose logs

# Container neu starten
docker-compose down
docker-compose up -d

# Image neu bauen
docker-compose build --no-cache
docker-compose up -d
```

---

**Problem:** `Port 3300 already in use`

**Lösung 1:** Anderen Port verwenden

Bearbeite `docker-compose.yml`:
```yaml
ports:
  - "3301:3300"  # ← Ändere 3300 zu 3301
```

**Lösung 2:** Prozess auf Port 3300 killen

```bash
# Windows
netstat -ano | findstr :3300
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3300 | xargs kill
```

---

### Build Errors

**Problem:** `npm install failed`

**Lösung:**
```bash
# Cache löschen
npm cache clean --force

# Node modules löschen
rm -rf node_modules package-lock.json

# Neu installieren
npm install
```

---

**Problem:** `TypeScript errors`

**Lösung:**
```bash
# TypeScript Cache löschen
rm -rf .next
rm -rf node_modules/.cache

# Neu bauen
npm run build
```

---

## 🆘 Support

Wenn nichts hilft:

1. **GitHub Issues:** [Create Issue](https://github.com/fatjay1979/fish-checker-ultimate/issues)
2. **Logs sammeln:**
   ```bash
   # App Logs
   docker-compose logs > logs.txt

   # Browser Console
   F12 → Console → Copy all
   ```
3. Issue erstellen mit:
   - Fehlermeldung
   - Logs
   - System Info (OS, Node Version, etc.)
   - Schritte zum Reproduzieren

---

## ✅ Setup Checklist

Verwende diese Checkliste:

- [ ] Node.js 20+ installiert
- [ ] Repository geklont
- [ ] Dependencies installiert (`npm install`)
- [ ] App läuft (`npm run dev` oder Docker)
- [ ] WordPress App Password erstellt
- [ ] WordPress Connection getestet (✓)
- [ ] AI API Key erstellt
- [ ] AI API getestet (✓)
- [ ] Engine & Model ausgewählt
- [ ] Einstellungen gespeichert
- [ ] Dashboard zeigt alles grün
- [ ] Ersten Post analysiert
- [ ] Batch-Analyse getestet

**Alle Checkboxen aktiviert?** Du bist ready! 🚀

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>