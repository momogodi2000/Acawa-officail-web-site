#!/usr/bin/env python3
"""
Image optimization script for ACAWA platform
Compresses images and generates WebP formats with multiple sizes
"""

import os
import sys
from PIL import Image, ImageOps
import argparse
from pathlib import Path
import json

class ImageOptimizer:
    def __init__(self):
        self.sizes = {
            'small': 320,
            'medium': 640,
            'large': 1024,
            'xlarge': 1920
        }
        
        self.quality_settings = {
            'thumbnail': 70,
            'gallery': 85,
            'hero': 90,
            'print': 95
        }
    
    def optimize_image(self, input_path, output_dir, quality='gallery', generate_webp=True, generate_sizes=True):
        """
        Optimize a single image with compression and format conversion
        """
        try:
            input_path = Path(input_path)
            output_dir = Path(output_dir)
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # Open and process image
            with Image.open(input_path) as img:
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'LA', 'P'):
                    # Handle transparency
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    
                    # Create white background for JPEG conversion
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'RGBA':
                        background.paste(img, mask=img.split()[-1])  # Use alpha channel as mask
                    else:
                        background.paste(img)
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Auto-orient based on EXIF data
                img = ImageOps.exif_transpose(img)
                
                base_name = input_path.stem
                quality_value = self.quality_settings.get(quality, 85)
                
                results = []
                
                if generate_sizes:
                    # Generate different sizes
                    for size_name, width in self.sizes.items():
                        # Skip if image is smaller than target size
                        if img.width < width:
                            continue
                            
                        # Calculate height maintaining aspect ratio
                        aspect_ratio = img.height / img.width
                        height = int(width * aspect_ratio)
                        
                        # Resize image
                        resized_img = img.resize((width, height), Image.Resampling.LANCZOS)
                        
                        # Save JPEG version
                        jpeg_path = output_dir / f"{base_name}-{width}w.jpg"
                        resized_img.save(
                            jpeg_path,
                            'JPEG',
                            quality=quality_value,
                            optimize=True,
                            progressive=True
                        )
                        results.append(str(jpeg_path))
                        
                        # Save WebP version if requested
                        if generate_webp:
                            webp_path = output_dir / f"{base_name}-{width}w.webp"
                            resized_img.save(
                                webp_path,
                                'WebP',
                                quality=quality_value,
                                optimize=True,
                                method=4  # Better compression
                            )
                            results.append(str(webp_path))
                
                # Save original size optimized versions
                original_jpeg = output_dir / f"{base_name}.jpg"
                img.save(
                    original_jpeg,
                    'JPEG',
                    quality=quality_value,
                    optimize=True,
                    progressive=True
                )
                results.append(str(original_jpeg))
                
                if generate_webp:
                    original_webp = output_dir / f"{base_name}.webp"
                    img.save(
                        original_webp,
                        'WebP',
                        quality=quality_value,
                        optimize=True,
                        method=4
                    )
                    results.append(str(original_webp))
                
                return results
                
        except Exception as e:
            print(f"Error processing {input_path}: {str(e)}")
            return []
    
    def optimize_directory(self, input_dir, output_dir, quality='gallery'):
        """
        Optimize all images in a directory
        """
        input_dir = Path(input_dir)
        output_dir = Path(output_dir)
        
        supported_formats = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif'}
        image_files = []
        
        for ext in supported_formats:
            image_files.extend(input_dir.glob(f"*{ext}"))
            image_files.extend(input_dir.glob(f"*{ext.upper()}"))
        
        results = {}
        total_files = len(image_files)
        
        print(f"Found {total_files} images to optimize...")
        
        for i, image_file in enumerate(image_files, 1):
            print(f"Processing {i}/{total_files}: {image_file.name}")
            optimized_files = self.optimize_image(image_file, output_dir, quality)
            results[str(image_file)] = optimized_files
        
        return results
    
    def generate_image_manifest(self, results, output_path):
        """
        Generate a manifest file with optimized image mappings
        """
        manifest = {
            'version': '1.0',
            'generated_at': str(Path().absolute()),
            'optimized_images': results
        }
        
        with open(output_path, 'w') as f:
            json.dump(manifest, f, indent=2)
        
        print(f"Manifest saved to: {output_path}")

def main():
    parser = argparse.ArgumentParser(description='Optimize images for ACAWA platform')
    parser.add_argument('input', help='Input file or directory')
    parser.add_argument('-o', '--output', default='./optimized', help='Output directory')
    parser.add_argument('-q', '--quality', choices=['thumbnail', 'gallery', 'hero', 'print'], 
                       default='gallery', help='Quality preset')
    parser.add_argument('--no-webp', action='store_true', help='Skip WebP generation')
    parser.add_argument('--no-sizes', action='store_true', help='Skip multiple size generation')
    parser.add_argument('--manifest', help='Generate manifest file at specified path')
    
    args = parser.parse_args()
    
    optimizer = ImageOptimizer()
    input_path = Path(args.input)
    
    if input_path.is_file():
        print(f"Optimizing single image: {input_path}")
        results = {
            str(input_path): optimizer.optimize_image(
                input_path, 
                args.output, 
                args.quality,
                not args.no_webp,
                not args.no_sizes
            )
        }
    elif input_path.is_dir():
        print(f"Optimizing directory: {input_path}")
        results = optimizer.optimize_directory(input_path, args.output, args.quality)
    else:
        print(f"Error: {input_path} does not exist")
        sys.exit(1)
    
    if args.manifest:
        optimizer.generate_image_manifest(results, args.manifest)
    
    total_optimized = sum(len(files) for files in results.values())
    print(f"\nOptimization complete! Generated {total_optimized} optimized images.")

if __name__ == '__main__':
    main()
