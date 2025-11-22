// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function uploadImage(base64) {
  try {
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'aanchal-portfolio',
    })
    return result.secure_url
  } catch (err) {
    console.error("Cloudinary upload error:", err)
    throw err
  }
}

export default cloudinary
