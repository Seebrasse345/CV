/**
 * postbuild.js
 * Simple post-build script to ensure static files are properly copied
 */

const fs = require('fs');
const path = require('path');

console.log('\n📋 Running post-build process...');

// Define paths
const outDir = path.join(process.cwd(), 'out');
const publicDir = path.join(process.cwd(), 'public');

// Function to ensure directory exists
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    console.log(`📁 Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Function to copy file with verification
const copyFileWithVerification = (source, dest, description = '') => {
  try {
    if (fs.existsSync(source)) {
      const destDir = path.dirname(dest);
      ensureDirectoryExists(destDir);
      
      console.log(`🔄 Copying ${path.basename(source)}${description ? ` ${description}` : ''}...`);
      fs.copyFileSync(source, dest);
      
      if (fs.existsSync(dest)) {
        console.log(`✅ Successfully copied and verified ${path.basename(dest)}`);
        return true;
      } else {
        console.error(`❌ Failed to verify copy at: ${dest}`);
        return false;
      }
    } else {
      console.error(`❌ Source file not found: ${source}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error copying file: ${error.message}`);
    return false;
  }
};

// Copy black_hole_diffusion.html to multiple locations
const blackHoleFile = 'black_hole_diffusion.html';
const blackHoleSource = path.join(publicDir, blackHoleFile);
const blackHoleDestinations = [
  { path: path.join(outDir, blackHoleFile), desc: 'to root output' },
  { path: path.join(outDir, 'imagine_you', blackHoleFile), desc: 'to imagine_you directory' },
  { path: path.join(outDir, 'imagine_you', 'terms', '..', blackHoleFile), desc: 'for terms page access' },
  { path: path.join(outDir, 'imagine_you', 'privacy_policy', '..', blackHoleFile), desc: 'for privacy policy page access' }
];

console.log('\n📦 Copying black hole animation file...');
blackHoleDestinations.forEach(dest => {
  copyFileWithVerification(blackHoleSource, dest.path, dest.desc);
});

// Copy text files for terms and privacy policy
const textFiles = ['privacy.txt', 'tncs.txt'];
console.log('\n📄 Copying text files...');
textFiles.forEach(file => {
  const source = path.join(publicDir, file);
  const dest = path.join(outDir, file);
  copyFileWithVerification(source, dest);
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

console.log('\n🔍 Verifying critical routes...');
criticalRoutes.forEach(route => {
  if (fs.existsSync(route.source)) {
    console.log(`✅ Route /${route.path}/ exists`);
  } else {
    console.error(`❌ Route /${route.path}/ does not exist at expected path: ${route.source}`);
    
    // Create the directory if needed
    const dirPath = path.dirname(route.source);
    ensureDirectoryExists(dirPath);
    
    // If we have the non-trailing-slash version, copy it
    const possibleSource = path.join(outDir, route.path + '.html');
    if (fs.existsSync(possibleSource)) {
      console.log(`🔄 Copying ${possibleSource} to ${route.source}`);
      fs.copyFileSync(possibleSource, route.source);
      console.log(`✅ Fixed route /${route.path}/`);
    }
  }
});

// Create a verification file to help debug file locations
const verificationContent = {
  buildTime: new Date().toISOString(),
  blackHoleLocations: blackHoleDestinations.map(dest => ({
    path: dest.path,
    exists: fs.existsSync(dest.path)
  })),
  routes: criticalRoutes.map(route => ({
    path: route.path,
    exists: fs.existsSync(route.source)
  }))
};

const verificationFile = path.join(outDir, 'build-verification.json');
fs.writeFileSync(verificationFile, JSON.stringify(verificationContent, null, 2));
console.log('\n📝 Created build verification file at: build-verification.json');

console.log('\n🎉 Post-build process completed!'); 