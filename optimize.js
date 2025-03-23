// optimize.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = process.env.INPUT_DIR || 'assets/original';
const outputDir = process.env.OUTPUT_DIR || 'assets/optimized';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.[a-z]+$/, '.avif'));

  sharp(inputPath)
    .avif({ quality: 80 })  // Adjust quality as needed (0-100)
    .toFile(outputPath)
    .then(() => console.log(`Optimized ${file} -> ${outputPath}`))
    .catch(err => console.error(`Error optimizing ${file}:`, err));
});