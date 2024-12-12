import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Brain, Skull, Microscope } from 'lucide-react'
import { NeurocraniumGame } from './components/NeurocraniumGame'

interface GameState {
  currentSection: 'menu' | 'neurocranium' | 'sutures' | 'viscerocranium';
  score: number;
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentSection: 'menu',
    score: 0
  });

  const sections = [
    {
      title: 'Neurocranium',
      description: 'Learn about the 8 bones that form the cranial cavity',
      icon: <Brain className="h-8 w-8" />,
      id: 'neurocranium'
    },
    {
      title: 'Sutures',
      description: 'Study the connections between cranial bones',
      icon: <Skull className="h-8 w-8" />,
      id: 'sutures'
    },
    {
      title: 'Viscerocranium',
      description: 'Explore the facial skeleton and its functions',
      icon: <Microscope className="h-8 w-8" />,
      id: 'viscerocranium'
    }
  ];

  const handleScoreUpdate = (newScore: number) => {
    setGameState(prev => ({ ...prev, score: newScore }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Cranium Anatomy Learning Game</h1>

        {gameState.currentSection === 'menu' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections.map((section) => (
              <Card key={section.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => setGameState(prev => ({ ...prev, currentSection: section.id as GameState['currentSection'] }))}
                  >
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {gameState.currentSection !== 'menu' && (
          <Card className="p-6">
            <CardHeader>
              <CardTitle>{sections.find(s => s.id === gameState.currentSection)?.title}</CardTitle>
              <Button
                variant="outline"
                onClick={() => setGameState(prev => ({ ...prev, currentSection: 'menu' }))}
                className="mt-4"
              >
                Back to Menu
              </Button>
            </CardHeader>
            <CardContent>
              {gameState.currentSection === 'neurocranium' && (
                <NeurocraniumGame onScoreUpdate={handleScoreUpdate} />
              )}
              {gameState.currentSection === 'sutures' && (
                <p>Content for Sutures will be added in the next iteration.</p>
              )}
              {gameState.currentSection === 'viscerocranium' && (
                <p>Content for Viscerocranium will be added in the next iteration.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App
