/**
 * postbuild.js
 * Simple post-build script to ensure static files are properly copied
 */

const fs = require('fs');
const path = require('path');

console.log('📋 Running post-build process...');

// Define paths
const outDir = path.join(process.cwd(), 'out');
const publicDir = path.join(process.cwd(), 'public');

// Ensure black_hole_diffusion.html is copied to the output directory
const blackHoleFile = 'black_hole_diffusion.html';
const blackHoleSource = path.join(publicDir, blackHoleFile);
const blackHoleDest = path.join(outDir, blackHoleFile);

if (fs.existsSync(blackHoleSource)) {
  console.log(`🔄 Copying ${blackHoleFile} to output directory...`);
  fs.copyFileSync(blackHoleSource, blackHoleDest);
  console.log(`✅ Successfully copied ${blackHoleFile}`);
  
  // Verify it exists in output
  if (fs.existsSync(blackHoleDest)) {
    console.log(`✅ Verified ${blackHoleFile} exists in output directory`);
  } else {
    console.error(`❌ Failed to verify ${blackHoleFile} in output directory`);
  }
} else {
  console.error(`❌ Source file not found: ${blackHoleSource}`);
}

// Copy text files for terms and privacy policy
const textFiles = ['privacy.txt', 'tncs.txt'];

textFiles.forEach(file => {
  const source = path.join(publicDir, file);
  const dest = path.join(outDir, file);
  
  if (fs.existsSync(source)) {
    console.log(`🔄 Copying ${file} to output directory...`);
    fs.copyFileSync(source, dest);
    console.log(`✅ Successfully copied ${file}`);
  } else {
    console.error(`❌ Source file not found: ${source}`);
  }
});

console.log('🎉 Post-build process completed!'); 