// postinstall.js
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('Running postinstall script...')

// Function to rebuild bcrypt
function rebuildBcrypt() {
  console.log('Rebuilding bcrypt...')
  try {
    // First try to rebuild with pnpm
    execSync('pnpm rebuild bcrypt --build-from-source', { stdio: 'inherit' })
  } catch (err) {
    console.log('pnpm rebuild failed, trying npm...')
    // Fallback to npm if pnpm fails
    execSync('npm rebuild bcrypt --build-from-source', { stdio: 'inherit' })
  }
}

// Check if we're in a production build
if (process.env.NODE_ENV === 'production') {
  console.log('Production build detected')
  
  try {
    // Try to require bcrypt to see if it needs rebuilding
    require('bcrypt')
    console.log('bcrypt loaded successfully')
  } catch (err) {
    console.log('bcrypt load failed, attempting rebuild:', err.message)
    rebuildBcrypt()
    
    // Verify the rebuild worked
    try {
      require('bcrypt')
      console.log('bcrypt rebuild successful')
    } catch (verifyErr) {
      console.error('bcrypt rebuild failed:', verifyErr.message)
      process.exit(1)
    }
  }
}

console.log('Postinstall completed successfully') 