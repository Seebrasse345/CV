// Force Deploy Script
// This script creates a dummy update to trigger a new Vercel deployment
// Run with: node scripts/force-deploy.js

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Create the scripts directory if it doesn't exist
if (!fs.existsSync('scripts')) {
  fs.mkdirSync('scripts');
}

// Function to run shell commands and log output
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Create or update a vercel trigger file
const triggerFilePath = path.join('.vercel', 'trigger.txt');

// Create .vercel directory if it doesn't exist
if (!fs.existsSync('.vercel')) {
  fs.mkdirSync('.vercel');
}

// Write current timestamp to trigger file
fs.writeFileSync(
  triggerFilePath,
  `Deployment trigger: ${new Date().toISOString()}\n`
);

console.log('Created deployment trigger file');

// Commit and push changes
runCommand('git add .');
runCommand('git commit -m "Force Vercel deployment [skip ci]"');
runCommand('git push origin master');

console.log('Successfully pushed changes to trigger deployment');
console.log('Check your Vercel dashboard for deployment status'); 