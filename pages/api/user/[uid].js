import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { uid } = req.query

  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return res.status(404).json({ message: 'User not found' })
    }

    const data = docSnap.data()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user' })
  }
}

export default handler
