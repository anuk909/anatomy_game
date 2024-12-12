import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AnatomyImageComponent, anatomyImages } from './ImageAssets';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AnatomySection {
  id: string;
  title: string;
  description: string;
  content: {
    id: string;
    name: string;
    description: string;
    imageId: string;
    funFact?: string;
    location?: string;
  }[];
}

const anatomySections: AnatomySection[] = [
  {
    id: 'neurocranium',
    title: 'Neurocranium',
    description: 'Learn about the bones that form the braincase',
    content: [
      {
        id: 'frontal',
        name: 'Frontal Bone',
        description: 'Forms the forehead and the anterior portion of the cranial roof',
        imageId: 'frontal',
        funFact: 'The frontal bone protects the frontal lobes of your brain, which are responsible for personality and decision-making!',
        location: 'Located at the front of the skull, forming your forehead'
      },
      // PLACEHOLDER: remaining neurocranium bones (parietal, temporal, sphenoid, ethmoid, occipital)
    ]
  },
  {
    id: 'viscerocranium',
    title: 'Viscerocranium',
    description: 'Explore the bones of the facial skeleton',
    content: [
      // PLACEHOLDER: viscerocranium content
    ]
  },
  {
    id: 'sutures',
    title: 'Sutures',
    description: 'Discover the joints between cranial bones',
    content: [
      // PLACEHOLDER: sutures content
    ]
  }
];

export const LearningMode: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('neurocranium');
  const [currentIndex, setCurrentIndex] = useState(0);

  const section = anatomySections.find(s => s.id === selectedSection);
  const currentContent = section?.content[currentIndex];

  const handleNext = () => {
    if (section && currentIndex < section.content.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="neurocranium" onValueChange={value => {
        setSelectedSection(value);
        setCurrentIndex(0);
      }}>
        <TabsList className="grid w-full grid-cols-3">
          {anatomySections.map(section => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {anatomySections.map(section => (
          <TabsContent key={section.id} value={section.id}>
            <Card>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {currentContent && (
                  <div className="space-y-6">
                    <AnatomyImageComponent
                      imageId={currentContent.imageId}
                      className="mb-6"
                    />

                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">{currentContent.name}</h3>
                        <p>{currentContent.description}</p>
                      </div>

                      {currentContent.location && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Location:</h3>
                          <p>{currentContent.location}</p>
                        </div>
                      )}

                      {currentContent.funFact && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Fun Fact:</h3>
                          <p>{currentContent.funFact}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleNext}
                        disabled={!section || currentIndex === section.content.length - 1}
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
