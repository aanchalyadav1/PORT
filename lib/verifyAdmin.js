// lib/verifyAdmin.js
export function verifyAdmin(req) {
  const token = req.headers.get('x-admin-token')

  if (!token || token !== process.env.ADMIN_SECRET_KEY) {
    return false
  }
  return true
}
