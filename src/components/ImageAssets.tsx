import type { FC } from 'react';

export interface AnatomyImage {
  id: string;
  src: string;
  alt: string;
  description: string;
  section: 'neurocranium' | 'viscerocranium' | 'sutures';
}

export const anatomyImages: AnatomyImage[] = [
  // Neurocranium bones
  {
    id: 'frontal',
    src: '/images_organized/neurocranium/frontal.png',
    alt: 'Frontal bone anatomy',
    description: 'The frontal bone forms the forehead and anterior cranial fossa. Features include the glabella, supraorbital margins, and frontal sinuses. Critical for protecting frontal lobes and forming eye sockets.',
    section: 'neurocranium'
  },
  {
    id: 'parietal',
    src: '/images_organized/neurocranium/parietal.png',
    alt: 'Parietal bone anatomy',
    description: 'The paired parietal bones form the roof and sides of the cranium. Features temporal lines for muscle attachment and protects the parietal lobes. Key for spatial awareness.',
    section: 'neurocranium'
  },
  {
    id: 'temporal',
    src: '/images_organized/neurocranium/temporal.png',
    alt: 'Temporal bone anatomy',
    description: 'Houses the organs of hearing and balance. Contains the external acoustic meatus, mastoid process, and styloid process. Forms the temporomandibular joint.',
    section: 'neurocranium'
  },
  {
    id: 'occipital',
    src: '/images_organized/neurocranium/occipital.png',
    alt: 'Occipital bone anatomy',
    description: 'Forms the posterior cranial base, featuring the foramen magnum for spinal cord passage. Contains external occipital protuberance and nuchal lines for muscle attachment.',
    section: 'neurocranium'
  },
  {
    id: 'sphenoid',
    src: '/images_organized/neurocranium/sphenoid.png',
    alt: 'Sphenoid bone anatomy',
    description: 'The butterfly-shaped sphenoid forms part of the cranial base. Features the sella turcica housing the pituitary gland, and greater/lesser wings protecting vital structures.',
    section: 'neurocranium'
  },
  {
    id: 'ethmoid',
    src: '/images_organized/neurocranium/ethmoid.png',
    alt: 'Ethmoid bone anatomy',
    description: 'Located between the orbits, contains the cribriform plate for olfactory nerves. Forms part of the nasal cavity and orbital walls with its perpendicular and orbital plates.',
    section: 'neurocranium'
  },

  // Viscerocranium bones
  {
    id: 'maxilla',
    src: '/images_organized/viscerocranium/maxilla.png',
    alt: 'Maxilla bone anatomy',
    description: 'Forms the upper jaw and contains maxillary teeth. Features include maxillary sinus, infraorbital foramen, and contributes to hard palate and nasal cavity floor.',
    section: 'viscerocranium'
  },
  {
    id: 'nasal',
    src: '/images_organized/viscerocranium/nasal.png',
    alt: 'Nasal bone anatomy',
    description: 'Paired bones forming the bridge of the nose. Articulates with frontal bone superiorly and supports upper lateral nasal cartilages. Essential for nasal cavity structure.',
    section: 'viscerocranium'
  },
  {
    id: 'zygomatic',
    src: '/images_organized/viscerocranium/zygomatic.png',
    alt: 'Zygomatic bone anatomy',
    description: 'Forms the prominence of the cheek and lateral orbital wall. Features zygomaticofacial foramina and temporal process. Important for facial expression and mastication.',
    section: 'viscerocranium'
  },
  {
    id: 'mandible',
    src: '/images_organized/viscerocranium/mandible.png',
    alt: 'Mandible bone anatomy',
    description: 'The U-shaped lower jaw bone with mandibular condyle and coronoid process. Contains lower teeth and mental foramen. Essential for chewing and speech.',
    section: 'viscerocranium'
  },

  // Sutures
  {
    id: 'coronal',
    src: '/images_organized/sutures/coronal.png',
    alt: 'Coronal suture anatomy',
    description: 'Joins the frontal and parietal bones. This serrated joint allows slight movement during birth and early development. Important growth site that later fuses.',
    section: 'sutures'
  },
  {
    id: 'sagittal',
    src: '/images_organized/sutures/sagittal.png',
    alt: 'Sagittal suture anatomy',
    description: 'Midline suture between parietal bones. Features interlocking edges for structural strength. Critical for skull growth and brain development.',
    section: 'sutures'
  },
  {
    id: 'lambdoid',
    src: '/images_organized/sutures/lambdoid.png',
    alt: 'Lambdoid suture anatomy',
    description: 'Connects occipital bone with parietal bones. Named for lambda-shaped appearance. Important for posterior cranial development and growth.',
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
