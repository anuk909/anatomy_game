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
    id: 'frontal',
    src: '/images/neurocranium/frontal.png',
    alt: 'Frontal bone anatomy',
    description: 'Forms the forehead and anterior portion of the cranial roof',
    section: 'neurocranium'
  },
  {
    id: 'parietal',
    src: '/images/neurocranium/parietal.png',
    alt: 'Parietal bone anatomy',
    description: 'Forms the superior and lateral walls of the cranium',
    section: 'neurocranium'
  },
  {
    id: 'temporal',
    src: '/images/neurocranium/temporal.png',
    alt: 'Temporal bone anatomy',
    description: 'Houses the organs of hearing and contains the styloid process',
    section: 'neurocranium'
  },
  {
    id: 'sphenoid',
    src: '/images/neurocranium/sphenoid.png',
    alt: 'Sphenoid bone anatomy',
    description: 'Forms part of the anterior cranial fossa and contains the sella turcica',
    section: 'neurocranium'
  },
  {
    id: 'ethmoid',
    src: '/images/neurocranium/ethmoid.png',
    alt: 'Ethmoid bone anatomy',
    description: 'Located between the orbital cavities, forms part of the nasal cavity roof',
    section: 'neurocranium'
  },
  {
    id: 'occipital',
    src: '/images/neurocranium/occipital.png',
    alt: 'Occipital bone anatomy',
    description: 'Forms the posterior and inferior portions of the cranium',
    section: 'neurocranium'
  },
  {
    id: 'viscerocranium-overview',
    src: '/images/viscerocranium/overview.png',
    alt: 'Overview of viscerocranium bones',
    description: 'Complete overview of the facial bones and their relationships',
    section: 'viscerocranium'
  },
  {
    id: 'sutures-overview',
    src: '/images/sutures/overview.png',
    alt: 'Overview of cranial sutures',
    description: 'Shows the major sutures connecting the cranial bones',
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
