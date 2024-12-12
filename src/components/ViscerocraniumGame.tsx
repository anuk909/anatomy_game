import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Alert, AlertDescription } from "./ui/alert"
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
    id: 'maxilla',
    name: 'Maxilla',
    description: 'Forms the upper jaw and contributes to the formation of the orbit, nasal cavity, and hard palate',
    imageId: 'maxilla',
    funFact: 'The maxilla contains air-filled spaces called maxillary sinuses, which help make your skull lighter!',
    location: 'Forms the upper jaw and central part of the facial skeleton'
  },
  {
    id: 'nasal',
    name: 'Nasal Bones',
    description: 'Form the bridge of the nose and provide attachment for the nasal cartilages',
    imageId: 'nasal',
    funFact: 'These small, paired bones help protect your nasal cavity and give your nose its unique shape!',
    location: 'At the bridge of your nose, between your eyes'
  },
  {
    id: 'zygomatic',
    name: 'Zygomatic Bones',
    description: 'Form the prominence of the cheeks and part of the lateral orbital wall',
    imageId: 'zygomatic',
    funFact: 'Also called cheekbones, these bones help protect your eyes and give your face its characteristic shape!',
    location: 'Form your cheekbones and part of your eye sockets'
  },
  {
    id: 'mandible',
    name: 'Mandible',
    description: 'Forms the lower jaw and is the only movable bone of the skull',
    imageId: 'mandible',
    funFact: 'The mandible is the strongest bone in your face and helps you talk, chew, and make expressions!',
    location: 'Forms your lower jaw'
  }
];

interface ViscerocraniumGameProps {
  onScoreUpdate: (score: number) => void;
}

export const ViscerocraniumGame: React.FC<ViscerocraniumGameProps> = ({ onScoreUpdate }) => {
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
            <div className="mt-6">
              <Alert variant={isCorrect ? "default" : "destructive"}>
                <AlertDescription>
                  {isCorrect ? "Correct! " : "Incorrect. "}
                  {currentBone.funFact}
                </AlertDescription>
              </Alert>

              {currentQuestion < bones.length - 1 && (
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
