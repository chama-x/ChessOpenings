import admin from 'firebase-admin'
import { auth, storage } from '../../../firebaseAdmin'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

function getDisplayMessageFromType(type) {
  switch (type) {
    case 'Opening':
      return 'a new Opening'
    case 'Trap':
      return 'a new Opening Trap'
    default:
      return 'an Opening'
  }
}

const getHandler = async (req, res) => {
  const { id } = req.query

  try {
    const docRef = doc(db, 'submissions', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return res.status(404).json({ message: 'Submission not found' })
    }

    const data = docSnap.data()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching submission' })
  }
}

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res)
  }

  return res.status(405).json({ message: 'Method not allowed' })
}

export default handler
