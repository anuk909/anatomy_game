import fitz  # PyMuPDF
import os

def extract_images_from_pdf(pdf_path, output_dir):
    # Create output directories if they don't exist
    os.makedirs(os.path.join(output_dir, 'neurocranium'), exist_ok=True)
    os.makedirs(os.path.join(output_dir, 'viscerocranium'), exist_ok=True)
    os.makedirs(os.path.join(output_dir, 'sutures'), exist_ok=True)

    # Open the PDF
    doc = fitz.open(pdf_path)

    # Extract images
    for page_num in range(len(doc)):
        page = doc[page_num]
        image_list = page.get_images()

        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image['image']

            # Save image with descriptive name
            image_name = f'page_{page_num + 1}_img_{img_index + 1}.png'

            # Default to neurocranium directory
            output_subdir = 'neurocranium'

            # Save the image
            with open(os.path.join(output_dir, output_subdir, image_name), 'wb') as img_file:
                img_file.write(image_bytes)

            print(f'Extracted: {image_name}')

if __name__ == '__main__':
    # Extract images
    extract_images_from_pdf('/home/ubuntu/cranium_anatomy.pdf', 'public/images')
