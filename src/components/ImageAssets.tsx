import type { FC } from 'react';

export interface AnatomyImage {
  id: string;
  src: string;
  alt: string;
  description: string;
  section: 'neurocranium' | 'viscerocranium' | 'sutures';
}

export const anatomyImages: AnatomyImage[] = [
  {
    id: 'skull-lateral',
    src: '/images/cranium_image-049.jpg',
    alt: 'Lateral view of skull with temporalis muscle',
    description: 'Shows the temporalis muscle attachment and skull structure from the side view',
    section: 'neurocranium'
  },
  {
    id: 'facial-muscles',
    src: '/images/cranium_image-091.jpg',
    alt: 'Anterior view of facial muscles',
    description: 'Detailed view of facial muscles including orbicularis oculi and oris',
    section: 'viscerocranium'
  },
  {
    id: 'skull-base',
    src: '/images/cranium_image-035.jpg',
    alt: 'Inferior view of skull base',
    description: 'Shows the skull base structure and important foramina',
    section: 'neurocranium'
  },
  {
    id: 'skull-sutures',
    src: '/images/cranium_image-054.jpg',
    alt: 'Lateral view showing cranial sutures',
    description: 'Demonstrates the coronal, sagittal, lambdoid, and squamous sutures',
    section: 'sutures'
  }
];

interface AnatomyImageProps {
  imageId: string;
  className?: string;
}

export const AnatomyImageComponent: FC<AnatomyImageProps> = ({ imageId, className = '' }) => {
  const image = anatomyImages.find(img => img.id === imageId);

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
      <p className="mt-2 text-sm text-gray-600">{image.description}</p>
    </div>
  );
};
