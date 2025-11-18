# Fish Checker Ultimate

AI-powered WordPress Fish Data Validator with Perplexity & OpenAI integration.

## Features

- WordPress REST API Integration
- AI-powered data validation (OpenAI GPT-4o & Perplexity Sonar)
- Interactive Review Interface
- Custom Post Type Support
- Docker Support

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3300

### Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Configuration

1. Copy `.env.example` to `.env`
2. Configure your WordPress credentials and API keys
3. Open settings page at http://localhost:3300/settings

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Shadcn/ui
- Zustand (State Management)
- OpenAI & Perplexity APIs

## Port

Default: **3300**