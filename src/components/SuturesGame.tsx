import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Alert, AlertDescription } from "./ui/alert"
import { Check, X, ArrowLeft, Trophy, RefreshCcw } from 'lucide-react';
import { AnatomyImageComponent } from './ImageAssets';

interface Suture {
  id: string;
  name: string;
  description: string;
  imageId: string;
  funFact?: string;
  location?: string;
}

const sutures: Suture[] = [
  {
    id: 'coronal',
    name: 'Coronal Suture',
    description: 'Joins the frontal bone with the parietal bones',
    imageId: 'coronal',
    funFact: 'This suture got its name because it\'s located where a crown would sit on your head!',
    location: 'Runs across the top of your skull from ear to ear'
  },
  {
    id: 'sagittal',
    name: 'Sagittal Suture',
    description: 'Joins the two parietal bones along the midline of the skull',
    imageId: 'sagittal',
    funFact: 'Named after the Latin word "sagitta" meaning arrow, as it runs straight like an arrow!',
    location: 'Runs along the top of your skull from front to back'
  },
  {
    id: 'lambdoid',
    name: 'Lambdoid Suture',
    description: 'Joins the occipital bone with the parietal bones',
    imageId: 'lambdoid',
    funFact: 'Named after the Greek letter lambda (λ) because it looks similar in shape!',
    location: 'At the back of your skull, forming a λ shape'
  }
];

interface SuturesGameProps {
  onScoreUpdate: (score: number) => void;
}

export const SuturesGame: React.FC<SuturesGameProps> = ({ onScoreUpdate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const progress = ((currentQuestion + 1) / sutures.length) * 100;

  const checkAnswer = (sutureId: string) => {
    const correct = sutureId === sutures[currentQuestion].id;
    setSelectedAnswer(sutureId);
    setIsCorrect(correct);
    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      onScoreUpdate(newScore);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < sutures.length - 1) {
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

  const currentSuture = showReview ? sutures[reviewIndex] : sutures[currentQuestion];

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
            <span className="text-lg font-medium">Final Score: {score} / {sutures.length}</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Review Mode - {currentSuture.name}</CardTitle>
            <CardDescription>Let's review what we've learned!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnatomyImageComponent
              imageId={currentSuture.imageId}
              className="mb-6"
            />

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Description:</h3>
                <p>{currentSuture.description}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Location:</h3>
                <p>{currentSuture.location}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Fun Fact:</h3>
                <p>{currentSuture.funFact}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setReviewIndex((prev) => Math.max(0, prev - 1))}
                disabled={reviewIndex === 0}
              >
                Previous Suture
              </Button>
              <Button
                variant="outline"
                onClick={() => setReviewIndex((prev) => Math.min(sutures.length - 1, prev + 1))}
                disabled={reviewIndex === sutures.length - 1}
              >
                Next Suture
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
        imageId={currentSuture.imageId}
        className="mb-6"
      />

      <Card>
        <CardHeader>
          <CardTitle>Question {currentQuestion + 1} of {sutures.length}</CardTitle>
          <CardDescription>
            Identify the suture with the following description:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">{currentSuture.description}</p>

          <div className="grid grid-cols-1 gap-3">
            {sutures.map((suture) => (
              <Button
                key={suture.id}
                onClick={() => !selectedAnswer && checkAnswer(suture.id)}
                variant={
                  selectedAnswer
                    ? suture.id === currentSuture.id
                      ? "default"
                      : suture.id === selectedAnswer
                      ? "destructive"
                      : "outline"
                    : "outline"
                }
                disabled={selectedAnswer !== null}
                className="justify-start"
              >
                <span className="mr-2">
                  {selectedAnswer && suture.id === currentSuture.id && <Check className="w-4 h-4" />}
                  {selectedAnswer && suture.id === selectedAnswer && suture.id !== currentSuture.id && (
                    <X className="w-4 h-4" />
                  )}
                </span>
                {suture.name}
              </Button>
            ))}
          </div>

          {selectedAnswer && (
            <div className="mt-6">
              <Alert variant={isCorrect ? "default" : "destructive"}>
                <AlertDescription>
                  {isCorrect ? "Correct! " : "Incorrect. "}
                  {currentSuture.funFact}
                </AlertDescription>
              </Alert>

              {currentQuestion < sutures.length - 1 && (
                <Button onClick={nextQuestion} className="w-full mt-4">
                  Next Question
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
