// lib/firebaseAdmin.js
// Server-side Firebase Admin initialization.
// Two supported modes to supply credentials:
// 1) Render / environment variable: set GOOGLE_SERVICE_ACCOUNT (base64-encoded JSON string)
//    (recommended for Render). The code will decode and initialize.
// 2) Provide GOOGLE_APPLICATION_CREDENTIALS path pointing to a JSON file on disk.
//    (less common on Render unless you add the file via secret file feature).

import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'

function initFirebaseAdmin() {
  if (admin.apps && admin.apps.length) {
    return admin
  }

  // Option A: GOOGLE_SERVICE_ACCOUNT contains base64 JSON (recommended on Render)
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT
  if (b64) {
    try {
      const jsonStr = Buffer.from(b64, 'base64').toString('utf8')
      const serviceAccount = JSON.parse(jsonStr)
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // optional: databaseURL: process.env.FIREBASE_DATABASE_URL
      })
      console.log('✅ Firebase Admin initialized from GOOGLE_SERVICE_ACCOUNT (base64).')
      return admin
    } catch (err) {
      console.error('❌ Failed to init Firebase Admin from GOOGLE_SERVICE_ACCOUNT:', err)
      throw err
    }
  }

  // Option B: GOOGLE_APPLICATION_CREDENTIALS file path
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (credPath && fs.existsSync(credPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(credPath, 'utf8'))
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
      console.log('✅ Firebase Admin initialized from GOOGLE_APPLICATION_CREDENTIALS file.')
      return admin
    } catch (err) {
      console.error('❌ Failed to init Firebase Admin from file:', err)
      throw err
    }
  }

  // Option C: If running locally and GOOGLE_APPLICATION_CREDENTIALS is set to a file path,
  // firebase-admin SDK will fallback automatically when running with GOOGLE_APPLICATION_CREDENTIALS env set.
  if (process.env.FIREBASE_ADMIN_NO_INIT === 'true') {
    console.warn('⚠️ Firebase Admin initialization skipped (FIREBASE_ADMIN_NO_INIT=true).')
    return admin
  }

  throw new Error('Firebase Admin credentials not found. Set GOOGLE_SERVICE_ACCOUNT (base64) or GOOGLE_APPLICATION_CREDENTIALS path.')
}

export default initFirebaseAdmin()
