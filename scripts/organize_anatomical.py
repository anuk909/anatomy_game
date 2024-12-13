import os
import shutil
from PIL import Image

def organize_images(raw_dir, organized_dir):
    # Create organized directories
    for section in ['neurocranium', 'viscerocranium', 'sutures']:
        os.makedirs(os.path.join(organized_dir, section), exist_ok=True)

    # Map of image sizes to likely content
    size_content_map = {
        (400, 500): 'neurocranium',    # Typical size for skull bones
        (600, 600): 'viscerocranium',  # Typical size for facial bones
        (700, 900): 'sutures',         # Typical size for suture images
    }

    # Process each image
    for filename in os.listdir(raw_dir):
        if not filename.endswith('.png'):
            continue

        filepath = os.path.join(raw_dir, filename)
        with Image.open(filepath) as img:
            width, height = img.size

            # Find best matching category based on image size
            best_match = None
            min_diff = float('inf')

            for (ref_w, ref_h), category in size_content_map.items():
                diff = abs(width - ref_w) + abs(height - ref_h)
                if diff < min_diff:
                    min_diff = diff
                    best_match = category

            if best_match:
                dest_dir = os.path.join(organized_dir, best_match)
                shutil.copy2(filepath, os.path.join(dest_dir, filename))
                print(f"Moved {filename} to {best_match}/")

if __name__ == '__main__':
    organize_images('public/images_organized/raw', 'public/images_organized')
