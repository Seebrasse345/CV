/**
 * copy-static-files.js
 * 
 * This script ensures all critical static files are properly copied
 * to the output directory during build. It's especially helpful for
 * files that might be referenced from both the root and public directories.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Copying essential static files...');

// Define the output directory (should match output in vercel.json)
const outDir = path.join(process.cwd(), 'out');

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
  console.log('⚠️ Output directory not found, creating...');
  fs.mkdirSync(outDir, { recursive: true });
}

// List of critical files to ensure are in the output directory
const criticalFiles = [
  {
    source: path.join(process.cwd(), 'public', 'black_hole_diffusion.html'),
    dest: path.join(outDir, 'black_hole_diffusion.html')
  },
  // Add other critical files here as needed
];

// Copy each file
criticalFiles.forEach(file => {
  try {
    if (fs.existsSync(file.source)) {
      console.log(`📂 Copying ${path.basename(file.source)} to output directory...`);
      fs.copyFileSync(file.source, file.dest);
      console.log(`✅ Successfully copied ${path.basename(file.source)}`);
    } else {
      console.error(`❌ Source file not found: ${file.source}`);
    }
  } catch (error) {
    console.error(`❌ Error copying ${path.basename(file.source)}: ${error.message}`);
  }
});

console.log('🎉 Static file copy process completed!'); 