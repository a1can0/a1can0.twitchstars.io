// scripts/optimize.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const inputDir = process.env.INPUT_DIR || 'assets/original';
  const outputDir = process.env.OUTPUT_DIR || 'assets/optimized';

  await fs.mkdir(outputDir, { recursive: true });
  const files = await fs.readdir(inputDir);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Optimized ${file} to ${outputPath}`);
  }
}

optimizeImages().catch(console.error);