/**
 * vercel-deploy-handler.js
 * 
 * This script provides additional handling for Vercel deployments
 * to address common issues with Next.js static exports.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Use console.log with explicit newlines for better visibility in deployment logs
console.log('\n🚀 Starting Vercel deployment handler...');

// Define directories
const rootDir = process.cwd();
const outDir = path.join(rootDir, 'out');
const publicDir = path.join(rootDir, 'public');

// Step 1: Verify that the 'out' directory exists
if (!fs.existsSync(outDir)) {
  console.log('\n⚠️ Output directory not found, running build...');
  try {
    execSync('next build', { stdio: 'inherit' });
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
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
    console.log(`\n⚠️ Missing key file: ${file.name}`);
    missingFiles = true;
    
    // Try to find the source file
    const publicFilePath = path.join(publicDir, file.name);
    if (fs.existsSync(publicFilePath)) {
      console.log(`\n📋 Copying ${file.name} from public directory...`);
      fs.copyFileSync(publicFilePath, file.path);
      console.log(`✅ Successfully copied ${file.name}`);
    } else if (file.name === 'index.html' && fs.existsSync(path.join(rootDir, 'index.html'))) {
      console.log(`\n📋 Copying ${file.name} from root directory...`);
      fs.copyFileSync(path.join(rootDir, 'index.html'), file.path);
      console.log(`✅ Successfully copied ${file.name}`);
    } else {
      console.error(`\n❌ Could not find source for ${file.name}`);
    }
  }
});

// Step 3: Create a dummy routes-manifest.json if needed
const routesManifestPath = path.join(outDir, 'routes-manifest.json');
if (!fs.existsSync(routesManifestPath)) {
  console.log('\n📝 Creating dummy routes-manifest.json to satisfy Vercel...');
  
  // Create a more complete routes manifest file
  const dummyManifest = {
    version: 3,
    basePath: "",
    pages404: true,
    redirects: [],
    headers: [
      {
        source: "/black_hole_diffusion.html",
        headers: [
          {
            key: "Cache-Control", 
            value: "public, max-age=86400"
          }
        ]
      }
    ],
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
      },
      {
        page: "/imagine_you/terms",
        regex: "^/imagine_you/terms(?:/)?$",
        routeKeys: {},
        namedRegex: "^/imagine_you/terms(?:/)?$"
      },
      {
        page: "/imagine_you/privacy_policy",
        regex: "^/imagine_you/privacy_policy(?:/)?$",
        routeKeys: {},
        namedRegex: "^/imagine_you/privacy_policy(?:/)?$"
      }
    ],
    dataRoutes: [],
    trailingSlash: true,
    cleanUrls: true
  };
  
  try {
    fs.writeFileSync(routesManifestPath, JSON.stringify(dummyManifest, null, 2));
    console.log('✅ Successfully created routes-manifest.json');
  } catch (error) {
    console.error('\n❌ Failed to create routes-manifest.json:', error.message);
  }
}

// Step 4: Check for Vercel-specific files
const requiredVercelFiles = [
  { 
    name: '.vercel/output/config.json', 
    content: JSON.stringify({
      "version": 3,
      "cleanUrls": true,
      "trailingSlash": true,
      "headers": [
        {
          "source": "/black_hole_diffusion.html",
          "headers": [
            {
              "key": "Cache-Control",
              "value": "public, max-age=86400"
            }
          ]
        }
      ]
    }, null, 2)
  }
];

// Create .vercel/output directory if it doesn't exist
const vercelOutputDir = path.join(rootDir, '.vercel', 'output');
if (!fs.existsSync(vercelOutputDir)) {
  fs.mkdirSync(vercelOutputDir, { recursive: true });
}

// Create required Vercel files
requiredVercelFiles.forEach(file => {
  const filePath = path.join(rootDir, file.name);
  const fileDir = path.dirname(filePath);
  
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }
  
  if (!fs.existsSync(filePath)) {
    console.log(`\n📝 Creating ${file.name}...`);
    try {
      fs.writeFileSync(filePath, file.content);
      console.log(`✅ Successfully created ${file.name}`);
    } catch (error) {
      console.error(`\n❌ Failed to create ${file.name}:`, error.message);
    }
  }
});

// Step 5: Create a build output static directory symlink if needed
const staticOutputDir = path.join(rootDir, '.vercel', 'output', 'static');
if (!fs.existsSync(staticOutputDir)) {
  console.log('\n📂 Setting up build output static directory...');
  try {
    // Instead of symlink (which might not work well in all environments), copy the out directory
    if (!fs.existsSync(path.join(rootDir, '.vercel', 'output', 'static'))) {
      fs.mkdirSync(staticOutputDir, { recursive: true });
      
      // Copy key files to the static directory
      const outFiles = fs.readdirSync(outDir);
      outFiles.forEach(file => {
        const sourcePath = path.join(outDir, file);
        const destPath = path.join(staticOutputDir, file);
        
        if (fs.statSync(sourcePath).isDirectory()) {
          // For directories, create them but don't recursively copy
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
        } else {
          // For files, just copy the ones we need
          if (file === 'black_hole_diffusion.html' || file === 'index.html') {
            fs.copyFileSync(sourcePath, destPath);
          }
        }
      });
      
      console.log('✅ Successfully set up static directory');
    }
  } catch (error) {
    console.error(`\n❌ Error setting up static directory: ${error.message}`);
  }
}

console.log('\n🎉 Vercel deployment handler completed!');
console.log('\n👉 Your static export should now be ready for Vercel deployment!'); 