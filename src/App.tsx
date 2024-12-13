import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Brain, Skull, Microscope } from 'lucide-react'
import { NeurocraniumGame } from './components/NeurocraniumGame'
import { LearningMode } from './components/LearningMode'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

interface GameState {
  currentSection: 'menu' | 'neurocranium' | 'sutures' | 'viscerocranium';
  mode: 'learn' | 'quiz';
  score: number;
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentSection: 'menu',
    mode: 'learn',
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
              <div className="flex justify-between items-center">
                <CardTitle>{sections.find(s => s.id === gameState.currentSection)?.title}</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setGameState(prev => ({ ...prev, currentSection: 'menu' }))}
                >
                  Back to Menu
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="learn" onValueChange={(value) => setGameState(prev => ({ ...prev, mode: value as 'learn' | 'quiz' }))}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="learn">Study Mode</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz Mode</TabsTrigger>
                </TabsList>
                <TabsContent value="learn">
                  <LearningMode />
                </TabsContent>
                <TabsContent value="quiz">
                  {gameState.currentSection === 'neurocranium' && (
                    <NeurocraniumGame onScoreUpdate={handleScoreUpdate} />
                  )}
                  {gameState.currentSection === 'sutures' && (
                    <p>Quiz content for Sutures will be added in the next iteration.</p>
                  )}
                  {gameState.currentSection === 'viscerocranium' && (
                    <p>Quiz content for Viscerocranium will be added in the next iteration.</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App
