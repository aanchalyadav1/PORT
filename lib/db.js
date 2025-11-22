// lib/db.js
// Simple server-side wrapper for Firestore operations used by the content API.
// Uses the firebase-admin instance initialized in lib/firebaseAdmin.js

import admin from './firebaseAdmin.js'
const firestore = admin.firestore()

/**
 * getList(collection) => returns { items: [] } — content from doc 'list'
 * setList(collection, items) => writes items array to doc 'list'
 * appendToList(collection, item) => pushes to array (transaction safe)
 * deleteAtIndex(collection, index) => remove item at index
 */

export async function getList(collection) {
  try {
    const ref = firestore.collection(collection).doc('list')
    const snap = await ref.get()
    if (!snap.exists) return { items: [] }
    const data = snap.data()
    return { items: Array.isArray(data.items) ? data.items : [] }
  } catch (err) {
    console.error('getList error', err)
    throw err
  }
}

export async function setList(collection, items) {
  if (!Array.isArray(items)) throw new Error('items must be an array')
  try {
    const ref = firestore.collection(collection).doc('list')
    await ref.set({ items }, { merge: true })
    return { ok: true }
  } catch (err) {
    console.error('setList error', err)
    throw err
  }
}

export async function appendToList(collection, item) {
  const ref = firestore.collection(collection).doc('list')
  return firestore.runTransaction(async tx => {
    const doc = await tx.get(ref)
    const items = doc.exists && Array.isArray(doc.data().items) ? doc.data().items.slice() : []
    items.push(item)
    tx.set(ref, { items }, { merge: true })
    return { ok: true, items }
  })
}

export async function deleteAtIndex(collection, index) {
  const ref = firestore.collection(collection).doc('list')
  return firestore.runTransaction(async tx => {
    const doc = await tx.get(ref)
    const items = doc.exists && Array.isArray(doc.data().items) ? doc.data().items.slice() : []
    if (index < 0 || index >= items.length) throw new Error('Index out of range')
    items.splice(index, 1)
    tx.set(ref, { items }, { merge: true })
    return { ok: true, items }
  })
}
