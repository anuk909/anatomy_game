import os
import shutil
from PIL import Image

def organize_images(input_dir, output_dir):
    # Create necessary directories
    sections = ['neurocranium', 'viscerocranium', 'sutures']
    for section in sections:
        os.makedirs(os.path.join(output_dir, section), exist_ok=True)

    # Define image mappings based on content
    image_mappings = {
        'neurocranium': {
            'frontal': ['page_2_img_1.png', 'page_2_img_2.png'],
            'parietal': ['page_3_img_1.png', 'page_3_img_2.png'],
            'temporal': ['page_4_img_1.png', 'page_4_img_2.png'],
            'occipital': ['page_5_img_1.png', 'page_5_img_2.png'],
            'sphenoid': ['page_6_img_1.png', 'page_6_img_2.png'],
            'ethmoid': ['page_7_img_1.png', 'page_7_img_2.png']
        },
        'viscerocranium': {
            'maxilla': ['page_8_img_1.png', 'page_8_img_2.png'],
            'nasal': ['page_9_img_1.png'],
            'zygomatic': ['page_10_img_1.png'],
            'mandible': ['page_11_img_1.png', 'page_11_img_2.png']
        },
        'sutures': {
            'coronal': ['page_12_img_1.png'],
            'sagittal': ['page_13_img_1.png'],
            'lambdoid': ['page_14_img_1.png']
        }
    }

    # Process and organize images
    for section, bones in image_mappings.items():
        for bone, source_images in bones.items():
            for idx, source_image in enumerate(source_images):
                source_path = os.path.join(input_dir, 'neurocranium', source_image)
                if os.path.exists(source_path):
                    # Create destination filename
                    dest_filename = f"{bone}{'' if idx == 0 else f'_{idx + 1}'}.png"
                    dest_path = os.path.join(output_dir, section, dest_filename)

                    # Copy and optimize image
                    try:
                        with Image.open(source_path) as img:
                            # Convert to RGB if necessary
                            if img.mode in ('RGBA', 'LA'):
                                img = img.convert('RGB')
                            # Optimize and save
                            img.save(dest_path, 'PNG', optimize=True)
                        print(f"Processed: {dest_path}")
                    except Exception as e:
                        print(f"Error processing {source_path}: {e}")

if __name__ == '__main__':
    organize_images('public/images', 'public/images_organized')
