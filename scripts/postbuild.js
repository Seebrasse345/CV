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

// Verify critical routes exist
const criticalRoutes = [
  { 
    path: 'imagine_you',
    source: path.join(outDir, 'imagine_you', 'index.html')
  },
  { 
    path: 'imagine_you/terms',
    source: path.join(outDir, 'imagine_you', 'terms', 'index.html')
  },
  { 
    path: 'imagine_you/privacy_policy',
    source: path.join(outDir, 'imagine_you', 'privacy_policy', 'index.html')
  }
];

console.log('🔍 Verifying critical routes...');
criticalRoutes.forEach(route => {
  if (fs.existsSync(route.source)) {
    console.log(`✅ Route /${route.path}/ exists`);
  } else {
    console.error(`❌ Route /${route.path}/ does not exist at expected path: ${route.source}`);
    
    // Create the directory if needed
    const dirPath = path.dirname(route.source);
    if (!fs.existsSync(dirPath)) {
      console.log(`📁 Creating directory: ${dirPath}`);
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // If we have the non-trailing-slash version, copy it
    const possibleSource = path.join(outDir, route.path + '.html');
    if (fs.existsSync(possibleSource)) {
      console.log(`🔄 Copying ${possibleSource} to ${route.source}`);
      fs.copyFileSync(possibleSource, route.source);
      console.log(`✅ Fixed route /${route.path}/`);
    }
  }
});

// Ensure black_hole_diffusion.html is also copied to the imagine_you directory
const imagineYouBlackHoleDest = path.join(outDir, 'imagine_you', blackHoleFile);
if (!fs.existsSync(imagineYouBlackHoleDest) && fs.existsSync(blackHoleDest)) {
  const imagineYouDir = path.join(outDir, 'imagine_you');
  if (!fs.existsSync(imagineYouDir)) {
    fs.mkdirSync(imagineYouDir, { recursive: true });
  }
  
  console.log(`🔄 Copying ${blackHoleFile} to imagine_you directory...`);
  fs.copyFileSync(blackHoleDest, imagineYouBlackHoleDest);
  console.log(`✅ Successfully copied ${blackHoleFile} to imagine_you directory`);
}

console.log('🎉 Post-build process completed!'); 