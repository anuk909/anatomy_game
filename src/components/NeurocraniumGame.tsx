import React, { useState } from 'react';
import { AnatomyImageComponent } from './ImageAssets';

interface NeurocraniumGameProps {
  onScoreUpdate: (score: number) => void;
}

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
    description: 'Forms the forehead and the anterior portion of the cranial roof. Contains the frontal sinuses and supraorbital margins.',
    imageId: 'frontal',
    funFact: 'The frontal bone protects the frontal lobes of your brain, which are responsible for personality and decision-making!',
    location: 'Located at the front of the skull, forming your forehead and the roof of your eye sockets'
  },
  {
    id: 'parietal',
    name: 'Parietal Bone (×2)',
    description: 'Forms the superior and lateral walls of the cranium. Features temporal lines for muscle attachment.',
    imageId: 'parietal',
    funFact: 'The parietal bones are like the roof of your skull house, protecting the parts of your brain that process touch and spatial awareness!',
    location: 'Found on the top and sides of your skull'
  },
  {
    id: 'occipital',
    name: 'Occipital Bone',
    description: 'Forms the posterior and inferior portions of the cranium, contains the foramen magnum',
    imageId: 'occipital',
    funFact: 'The foramen magnum in the occipital bone is like a gateway where your brain connects to your spinal cord!',
    location: 'At the back and base of your skull'
  },
  {
    id: 'temporal',
    name: 'Temporal Bone (×2)',
    description: 'Houses the organs of hearing and contains the styloid process',
    imageId: 'temporal',
    funFact: 'Your temporal bones are like your skull\'s headphone jacks - they contain your inner ear structures!',
    location: 'On the sides of your head, near your ears'
  },
  {
    id: 'sphenoid',
    name: 'Sphenoid Bone',
    description: 'Forms part of the anterior cranial fossa and contains the sella turcica',
    imageId: 'sphenoid',
    funFact: 'The sphenoid looks like a butterfly and has a special seat (sella turcica) for your pituitary gland!',
    location: 'Deep in the middle of your skull'
  },
  {
    id: 'ethmoid',
    name: 'Ethmoid Bone',
    description: 'Located between the orbital cavities, forms part of the nasal cavity roof',
    imageId: 'ethmoid',
    funFact: 'The ethmoid is like a sieve with many small holes, helping with your sense of smell!',
    location: 'Between your eyes, behind your nose'
  }
];

interface NeurocraniumGameProps {
  onScoreUpdate: (score: number) => void;
}

export const NeurocraniumGame: React.FC<NeurocraniumGameProps> = ({ onScoreUpdate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const questions = [
    {
      id: 'frontal',
      question: 'This bone forms the forehead and contains important features like the glabella and supraorbital margins. It protects the frontal lobes and forms the roof of the eye sockets. Which bone is this?',
      imageId: 'frontal',
      options: bones.map(b => b.name),
      correctAnswer: 'Frontal Bone',
      explanation: 'The frontal bone is crucial for protecting the frontal lobes and forming the anterior cranial fossa. It features the glabella (smooth elevation between eyebrows), supraorbital margins (upper eye socket rim), and contains the frontal sinuses.'
    },
    {
      id: 'parietal',
      question: 'These paired bones form the roof and sides of the cranium, featuring temporal lines for muscle attachment. They protect important parts of the brain involved in spatial awareness. Identify these bones:',
      imageId: 'parietal',
      options: bones.map(b => b.name),
      correctAnswer: 'Parietal Bone (×2)',
      explanation: 'The parietal bones protect the parietal lobes and feature temporal lines where muscles attach. They join with the frontal bone at the coronal suture and with each other at the sagittal suture.'
    },
    {
      id: 'temporal',
      question: 'This bone houses the organs of hearing and balance, contains the external acoustic meatus, and forms an important joint with the mandible. Which bone is this?',
      imageId: 'temporal',
      options: bones.map(b => b.name),
      correctAnswer: 'Temporal Bone (×2)',
      explanation: 'The temporal bone contains the external acoustic meatus for hearing, the mastoid process for muscle attachment, and forms the temporomandibular joint (TMJ) with the mandible. It\'s crucial for hearing, balance, and jaw movement.'
    },
    {
      id: 'occipital',
      question: 'This bone forms the posterior cranial base and contains the foramen magnum, which allows passage of the spinal cord. It features attachment points for neck muscles. Identify this bone:',
      imageId: 'occipital',
      options: bones.map(b => b.name),
      correctAnswer: 'Occipital Bone',
      explanation: 'The occipital bone features the foramen magnum for spinal cord passage, the external occipital protuberance, and nuchal lines for muscle attachment. It joins the parietal bones at the lambdoid suture.'
    },
    {
      id: 'sphenoid',
      question: 'This butterfly-shaped bone forms part of the cranial base and contains the sella turcica, which houses an important endocrine gland. Which bone is this?',
      imageId: 'sphenoid',
      options: bones.map(b => b.name),
      correctAnswer: 'Sphenoid Bone',
      explanation: 'The sphenoid bone features the sella turcica housing the pituitary gland, and its greater and lesser wings protect vital structures. The sphenomandibular ligament originates from its spine.'
    },
    {
      id: 'ethmoid',
      question: 'Located between the orbits, this bone contains the cribriform plate for olfactory nerve passage and forms part of the nasal cavity. Identify this bone:',
      imageId: 'ethmoid',
      options: bones.map(b => b.name),
      correctAnswer: 'Ethmoid Bone',
      explanation: 'The ethmoid bone contains the cribriform plate for olfactory nerves and forms part of the nasal cavity with its perpendicular and orbital plates. It\'s essential for the sense of smell and nasal cavity structure.'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const bone = bones.find(b => b.id === currentQuestion.id);

  const checkAnswer = (selected: string) => {
    const isCorrect = selected === currentQuestion.correctAnswer;
    setSelectedAnswer(selected);
    setShowAnswer(true);
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      onScoreUpdate(newScore);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setIsReviewMode(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setIsReviewMode(false);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>

        <div className="mb-6">
          <AnatomyImageComponent
            imageId={currentQuestion.imageId}
            className="max-w-xl mx-auto"
          />
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => !showAnswer && setSelectedAnswer(option)}
              className={`w-full p-3 text-left rounded-lg transition-colors ${
                showAnswer
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : option === selectedAnswer
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-100'
                  : selectedAnswer === option
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              } border-2`}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>

        {!showAnswer && selectedAnswer && (
          <button
            onClick={() => checkAnswer(selectedAnswer)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Answer
          </button>
        )}

        {showAnswer && (
          <div className="mt-4">
            <div className={`p-4 rounded-lg ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              <p className="font-bold mb-2">
                {selectedAnswer === currentQuestion.correctAnswer
                  ? 'Correct! Well done!'
                  : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}`}
              </p>
              <p>{currentQuestion.explanation}</p>
              {bone && (
                <div className="mt-2">
                  <p className="font-bold">Fun Fact:</p>
                  <p>{bone.funFact}</p>
                  <p className="font-bold mt-2">Location:</p>
                  <p>{bone.location}</p>
                </div>
              )}
            </div>
            <button
              onClick={currentQuestionIndex < questions.length - 1 ? nextQuestion : () => setIsReviewMode(true)}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Review Answers'}
            </button>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-lg font-bold">Current Score: {score} / {questions.length}</p>
      </div>

      {isReviewMode && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Review Mode</h2>
          <div className="space-y-6">
            {bones.map((bone) => (
              <div key={bone.id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-2">{bone.name}</h3>
                <AnatomyImageComponent imageId={bone.id} className="mb-4" />
                <p className="mb-2">{bone.description}</p>
                <p className="mb-2"><strong>Fun Fact:</strong> {bone.funFact}</p>
                <p><strong>Location:</strong> {bone.location}</p>
              </div>
            ))}
          </div>
          <button
            onClick={restartGame}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start New Quiz
          </button>
        </div>
      )}
    </div>
  );
};
