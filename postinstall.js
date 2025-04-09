// postinstall.js
console.log('Running postinstall script...')

// Check if we're in a production build
if (process.env.NODE_ENV === 'production') {
  console.log('Production build detected - running bcrypt rebuild if needed')
  try {
    // Try to require bcrypt to see if it needs rebuilding
    require('bcrypt')
  } catch (err) {
    console.log('Rebuilding bcrypt for production...')
    const { execSync } = require('child_process')
    execSync('npm rebuild bcrypt --build-from-source')
  }
}

console.log('Postinstall completed successfully') 