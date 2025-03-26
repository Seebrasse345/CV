/**
 * vercel-deploy-handler.js
 * 
 * This script provides additional handling for Vercel deployments
 * to address common issues with Next.js static exports.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Vercel deployment handler...');

// Define directories
const rootDir = process.cwd();
const outDir = path.join(rootDir, 'out');
const publicDir = path.join(rootDir, 'public');

// Step 1: Verify that the 'out' directory exists
if (!fs.existsSync(outDir)) {
  console.log('⚠️ Output directory not found, running build...');
  try {
    execSync('next build', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Step 2: Verify key files are in place
const keyFiles = [
  { name: 'index.html', path: path.join(outDir, 'index.html') },
  { name: 'black_hole_diffusion.html', path: path.join(outDir, 'black_hole_diffusion.html') }
];

let missingFiles = false;

keyFiles.forEach(file => {
  if (!fs.existsSync(file.path)) {
    console.log(`⚠️ Missing key file: ${file.name}`);
    missingFiles = true;
    
    // Try to find the source file
    const publicFilePath = path.join(publicDir, file.name);
    if (fs.existsSync(publicFilePath)) {
      console.log(`📋 Copying ${file.name} from public directory...`);
      fs.copyFileSync(publicFilePath, file.path);
      console.log(`✅ Successfully copied ${file.name}`);
    } else if (file.name === 'index.html' && fs.existsSync(path.join(rootDir, 'index.html'))) {
      console.log(`📋 Copying ${file.name} from root directory...`);
      fs.copyFileSync(path.join(rootDir, 'index.html'), file.path);
      console.log(`✅ Successfully copied ${file.name}`);
    } else {
      console.error(`❌ Could not find source for ${file.name}`);
    }
  }
});

// Step 3: Create a dummy routes-manifest.json if needed
const routesManifestPath = path.join(outDir, 'routes-manifest.json');
if (!fs.existsSync(routesManifestPath)) {
  console.log('📝 Creating dummy routes-manifest.json to satisfy Vercel...');
  
  // Create a basic routes manifest file
  const dummyManifest = {
    version: 3,
    basePath: "",
    redirects: [],
    headers: [],
    dynamicRoutes: [],
    staticRoutes: [
      {
        page: "/",
        regex: "^/(?:/)?$",
        routeKeys: {},
        namedRegex: "^/(?:/)?$"
      },
      {
        page: "/imagine_you",
        regex: "^/imagine_you(?:/)?$",
        routeKeys: {},
        namedRegex: "^/imagine_you(?:/)?$"
      }
    ],
    dataRoutes: []
  };
  
  try {
    fs.writeFileSync(routesManifestPath, JSON.stringify(dummyManifest, null, 2));
    console.log('✅ Successfully created routes-manifest.json');
  } catch (error) {
    console.error('❌ Failed to create routes-manifest.json:', error.message);
  }
}

console.log('🎉 Vercel deployment handler completed!'); 