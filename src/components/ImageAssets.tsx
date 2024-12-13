import { useState, useEffect } from 'react';

// Types for image metadata
export interface AnatomicalImage {
  id: string;
  src: string;
  alt: string;
  description: string;
  category: 'neurocranium' | 'viscerocranium' | 'sutures';
  pageRef: string;
}

// Function to get page reference from filename
const getPageRef = (filename: string): string => {
  const match = filename.match(/page_(\d+)_img_(\d+)/);
  return match ? `Page ${match[1]}` : '';
};

// Function to load images from the organized directories
const loadAnatomicalImages = async (): Promise<AnatomicalImage[]> => {
  const images: AnatomicalImage[] = [];

  // Map of categories to their descriptions
  const categoryDescriptions = {
    neurocranium: {
      name: 'Neurocranium',
      desc: 'Bones forming the cranial vault and base'
    },
    viscerocranium: {
      name: 'Viscerocranium',
      desc: 'Facial bones of the skull'
    },
    sutures: {
      name: 'Sutures',
      desc: 'Joints between cranial bones'
    }
  };

  // Load images from each category
  for (const category of ['neurocranium', 'viscerocranium', 'sutures'] as const) {
    const imageContext = import.meta.glob(`/public/images_organized/${category}/*.png`);

    for (const path in imageContext) {
      const filename = path.split('/').pop()?.replace('.png', '') || '';
      const pageRef = getPageRef(filename);

      images.push({
        id: `${category}_${filename}`,
        src: `/images_organized/${category}/${filename}.png`,
        alt: `${categoryDescriptions[category].name} illustration ${pageRef}`,
        description: `${categoryDescriptions[category].desc}. ${pageRef}`,
        category,
        pageRef
      });
    }
  }

  return images;
};

// Custom hook to use anatomical images
export const useAnatomicalImages = () => {
  const [images, setImages] = useState<AnatomicalImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnatomicalImages()
      .then(loadedImages => {
        setImages(loadedImages);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return {
    images,
    loading,
    error,
    getImagesByCategory: (category: string) =>
      images.filter(img => img.category === category)
  };
};

// Export the loading function for direct use
export { loadAnatomicalImages };

// React component to display anatomical images
interface AnatomyImageProps {
  imageId: string;
  className?: string;
}

export const AnatomyImageComponent: React.FC<AnatomyImageProps> = ({
  imageId,
  className = ''
}) => {
  const { images } = useAnatomicalImages();
  const image = images.find(img => img.id === imageId);

  if (!image) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-auto rounded-lg shadow-lg"
      />
      <p className="mt-2 text-sm text-gray-600">
        {image.description}
        <span className="ml-2 text-xs text-gray-500">
          ({image.pageRef})
        </span>
      </p>
    </div>
  );
};
