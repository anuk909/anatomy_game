import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Check, X, ArrowLeft, Trophy, RefreshCcw } from 'lucide-react';
import { AnatomyImageComponent } from './ImageAssets';

interface Bone {
  id: string;
  name: string;
  description: string;
  imageId: string;
  funFact?: string;
  location?: string;
}

const bones: Bone[] = [
  {
    id: 'frontal',
    name: 'Frontal Bone',
    description: 'Forms the forehead and the anterior portion of the cranial roof',
    imageId: 'skull-lateral',
    funFact: 'The frontal bone protects the frontal lobes of your brain, which are responsible for personality and decision-making!',
    location: 'Located at the front of the skull, forming your forehead'
  },
  {
    id: 'parietal',
    name: 'Parietal Bone (×2)',
    description: 'Forms the superior and lateral walls of the cranium',
    imageId: 'skull-lateral',
    funFact: 'The parietal bones are like the roof of your skull house, protecting the parts of your brain that process touch and spatial awareness!',
    location: 'Found on the top and sides of your skull'
  },
  {
    id: 'occipital',
    name: 'Occipital Bone',
    description: 'Forms the posterior and inferior portions of the cranium, contains the foramen magnum',
    imageId: 'skull-base',
    funFact: 'The foramen magnum in the occipital bone is like a gateway where your brain connects to your spinal cord!',
    location: 'At the back and base of your skull'
  },
  {
    id: 'temporal',
    name: 'Temporal Bone (×2)',
    description: 'Houses the organs of hearing and contains the styloid process',
    imageId: 'skull-lateral',
    funFact: 'Your temporal bones are like your skull\'s headphone jacks - they contain your inner ear structures!',
    location: 'On the sides of your head, near your ears'
  },
  {
    id: 'sphenoid',
    name: 'Sphenoid Bone',
    description: 'Forms part of the anterior cranial fossa and contains the sella turcica',
    imageId: 'skull-base',
    funFact: 'The sphenoid looks like a butterfly and has a special seat (sella turcica) for your pituitary gland!',
    location: 'Deep in the middle of your skull'
  },
  {
    id: 'ethmoid',
    name: 'Ethmoid Bone',
    description: 'Located between the orbital cavities, forms part of the nasal cavity roof',
    imageId: 'skull-lateral',
    funFact: 'The ethmoid is like a sieve with many small holes, helping with your sense of smell!',
    location: 'Between your eyes, behind your nose'
  }
];

interface NeurocraniumGameProps {
  onScoreUpdate: (score: number) => void;
}

export const NeurocraniumGame: React.FC<NeurocraniumGameProps> = ({ onScoreUpdate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const progress = ((currentQuestion + 1) / bones.length) * 100;

  const checkAnswer = (boneId: string) => {
    const correct = boneId === bones[currentQuestion].id;
    setSelectedAnswer(boneId);
    setIsCorrect(correct);
    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      onScoreUpdate(newScore);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < bones.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowReview(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setShowReview(false);
    setReviewIndex(0);
  };

  const currentBone = showReview ? bones[reviewIndex] : bones[currentQuestion];

  if (showReview) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setShowReview(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quiz
          </Button>
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-lg font-medium">Final Score: {score} / {bones.length}</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Review Mode - {currentBone.name}</CardTitle>
            <CardDescription>Let's review what we've learned!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnatomyImageComponent
              imageId={currentBone.imageId}
              className="mb-6"
            />

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Description:</h3>
                <p>{currentBone.description}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Location:</h3>
                <p>{currentBone.location}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Fun Fact:</h3>
                <p>{currentBone.funFact}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setReviewIndex((prev) => Math.max(0, prev - 1))}
                disabled={reviewIndex === 0}
              >
                Previous Bone
              </Button>
              <Button
                variant="outline"
                onClick={() => setReviewIndex((prev) => Math.min(bones.length - 1, prev + 1))}
                disabled={reviewIndex === bones.length - 1}
              >
                Next Bone
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button onClick={restartGame} className="w-full">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Start New Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Progress value={progress} className="w-full" />

      <AnatomyImageComponent
        imageId={currentBone.imageId}
        className="mb-6"
      />

      <Card>
        <CardHeader>
          <CardTitle>Question {currentQuestion + 1} of {bones.length}</CardTitle>
          <CardDescription>
            Identify the bone with the following description:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">{currentBone.description}</p>

          <div className="grid grid-cols-1 gap-3">
            {bones.map((bone) => (
              <Button
                key={bone.id}
                onClick={() => !selectedAnswer && checkAnswer(bone.id)}
                variant={
                  selectedAnswer
                    ? bone.id === currentBone.id
                      ? "default"
                      : bone.id === selectedAnswer
                      ? "destructive"
                      : "outline"
                    : "outline"
                }
                disabled={selectedAnswer !== null}
                className="justify-start"
              >
                <span className="mr-2">
                  {selectedAnswer && bone.id === currentBone.id && <Check className="w-4 h-4" />}
                  {selectedAnswer && bone.id === selectedAnswer && bone.id !== currentBone.id && (
                    <X className="w-4 h-4" />
                  )}
                </span>
                {bone.name}
              </Button>
            ))}
          </div>

          {selectedAnswer && (
            <div className="mt-4 space-y-4">
              {isCorrect ? (
                <Alert className="bg-green-50">
                  <Check className="w-4 h-4" />
                  <AlertDescription>
                    <p>Correct! Well done!</p>
                    <p className="mt-2">{currentBone.funFact}</p>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <X className="w-4 h-4" />
                  <AlertDescription>
                    <p>Incorrect. The correct answer is {currentBone.name}.</p>
                    <p className="mt-2">Hint: {currentBone.location}</p>
                  </AlertDescription>
                </Alert>
              )}
              <Button
                onClick={nextQuestion}
                className="w-full"
              >
                {currentQuestion < bones.length - 1 ? 'Next Question' : 'View Review'}
              </Button>
            </div>
          )}

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Current Score: {score} / {bones.length}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
