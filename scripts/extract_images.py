import os
import fitz  # PyMuPDF
import sys

def extract_images(pdf_path, output_dir):
    # Create output directories
    raw_dir = os.path.join(output_dir, 'raw')
    os.makedirs(raw_dir, exist_ok=True)

    # Open the PDF
    doc = fitz.open(pdf_path)

    # Track extracted images to avoid duplicates
    extracted_images = set()

    # Iterate through pages
    for page_num in range(len(doc)):
        page = doc[page_num]
        image_list = page.get_images()

        # Iterate through images on the page
        for img_idx, img in enumerate(image_list):
            try:
                xref = img[0]
                base_image = doc.extract_image(xref)

                # Skip small images (likely icons or decorative elements)
                if base_image["width"] < 100 or base_image["height"] < 100:
                    continue

                image_bytes = base_image["image"]
                image_hash = hash(image_bytes)

                # Skip if we've already extracted this image
                if image_hash in extracted_images:
                    continue

                extracted_images.add(image_hash)

                # Generate output filename
                image_filename = f"page_{page_num + 1}_img_{img_idx + 1}.png"
                output_path = os.path.join(raw_dir, image_filename)

                # Save the image
                with open(output_path, "wb") as image_file:
                    image_file.write(image_bytes)
                print(f"Extracted: {image_filename}")

            except Exception as e:
                print(f"Error extracting image {img_idx + 1} from page {page_num + 1}: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python extract_images.py <pdf_path> <output_dir>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    output_dir = sys.argv[2]
    extract_images(pdf_path, output_dir)
