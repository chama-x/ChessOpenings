import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'submissions'))
    const submissions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return res.status(200).json(submissions)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching submissions' })
  }
}

export default handler
