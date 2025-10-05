# Shopping Cart Application

Vue 3 + TypeScript + Pinia + Tailwind CSS v4 + Vitest

## 🚀 Quick Start

### Option 1: Local Development

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:5173)
```

### Option 2: Docker

```bash
docker-compose up        # Start with Docker
# or
npm run docker
```

## 📦 Available Scripts

### Development

```bash
npm run dev              # Start dev server (port 5173)
npm run build            # Build for production
npm run build:dev        # Build with dev environment
npm run build:prod       # Build with prod environment
npm run preview          # Preview production build
```

### Testing

```bash
npm test                 # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:ui          # Open Vitest UI
```

### Code Quality

```bash
npm run type:check       # TypeScript type checking
npm run lint             # Lint and fix code
npm run lint:check       # Check linting only
npm run format           # Format with Prettier
npm run format:check     # Check formatting only
```

### Docker

```bash
npm run docker           # Start with docker-compose
npm run docker:build     # Rebuild and start

# Alternative:
docker-compose up        # Start container (port 8000)
docker-compose up --build # Rebuild and start
docker-compose down      # Stop and remove
```

## 🧪 Testing

31 unit tests covering:

- Pinia store logic
- Cart calculations

## 🔧 Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia
- Tailwind CSS v4
- Zod (validation)
- Vitest
- Docker
