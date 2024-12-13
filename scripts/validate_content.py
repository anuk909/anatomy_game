import fitz  # PyMuPDF
import os
from typing import Dict, List, Set

def extract_bone_mentions(pdf_path: str) -> Dict[str, List[str]]:
    """Extract bone mentions and related content from PDF."""
    bone_keywords = {
        'frontal': [],
        'parietal': [],
        'temporal': [],
        'occipital': [],
        'sphenoid': [],
        'ethmoid': [],
    }
    
    doc = fitz.open(pdf_path)
    for page in range(len(doc)):
        text = doc[page].get_text()
        for bone in bone_keywords.keys():
            if bone in text.lower():
                # Extract the paragraph containing the bone mention
                paragraphs = text.split('\n\n')
                for para in paragraphs:
                    if bone in para.lower():
                        bone_keywords[bone].append(f"Page {page + 1}: {para.strip()}")
    
    return bone_keywords

def check_image_coverage(images_dir: str, bone_keywords: Dict[str, List[str]]) -> Set[str]:
    """Check which bones have corresponding images."""
    covered_bones = set()
    for bone in bone_keywords.keys():
        matching_images = [f for f in os.listdir(images_dir) if bone in f.lower()]
        if matching_images:
            covered_bones.add(bone)
    return covered_bones

def main():
    pdf_path = '/home/ubuntu/cranium_anatomy.pdf'
    images_dir = 'public/images_organized/neurocranium'
    
    print("Analyzing PDF content and image coverage...")
    bone_mentions = extract_bone_mentions(pdf_path)
    covered_bones = check_image_coverage(images_dir, bone_mentions)
    
    print("\nContent Coverage Analysis:")
    print("=" * 50)
    
    for bone, mentions in bone_mentions.items():
        print(f"\n{bone.title()} Bone:")
        print("-" * 20)
        if bone in covered_bones:
            print(f"✓ Has corresponding images")
        else:
            print(f"✗ Missing images")
        
        print(f"Content mentions: {len(mentions)}")
        for mention in mentions[:2]:  # Show first two mentions
            print(f"  • {mention[:200]}...")

if __name__ == '__main__':
    main()
