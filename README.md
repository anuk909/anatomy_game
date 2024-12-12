# Cranium Anatomy Learning Game

An interactive web application designed to help medical students learn cranium anatomy through engaging quizzes and visual aids.

## Features

- Interactive quiz system for learning neurocranium bones
- High-quality anatomical images from course materials
- Progress tracking and scoring system
- Review mode for reinforcing learning
- Responsive design for desktop and mobile use

## Quick Start with Docker (Recommended)

The easiest way to run the application is using Docker. This method requires only Docker and Docker Compose to be installed on your system.

1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

2. Clone the repository:
```bash
git clone https://github.com/anuk909/anatomy_game.git
cd anatomy_game
```

3. Start the application:
```bash
docker-compose up
```

The application will be available at `http://localhost:3000`

## Manual Installation (Alternative)

If you prefer to run the application without Docker:

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Steps
1. Clone the repository:
```bash
git clone https://github.com/anuk909/anatomy_game.git
cd anatomy_game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
anatomy_game/
├── public/
│   └── images/       # Anatomical images used in the game
├── src/
│   ├── components/   # React components
│   │   ├── NeurocraniumGame.tsx    # Main game component
│   │   └── ImageAssets.tsx         # Image management
│   └── App.tsx      # Main application component
├── Dockerfile       # Docker configuration
└── docker-compose.yml  # Docker Compose configuration
```

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Docker for containerization

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is private and intended for educational purposes only.
