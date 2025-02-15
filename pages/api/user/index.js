import admin from 'firebase-admin'
import { auth, storage } from '../../../firebaseAdmin'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

const handler = async (req, res) => {
  let statusCode = 500
  let responseBody = { error: 'Internal Server Error: Encountered an unknown error' }

  if (
    !req.headers.referer.includes('http://localhost:3000') &&
    !req.headers.referer.includes('https://chessopenings.co.uk')
  ) {
    res.statusCode = 401
    res.json({ error: 'Unauthorized: Unauthorized host' })
    return res
  }

  const idToken = JSON.parse(req.cookies?.idToken)
  let uid
  try {
    const decodedToken = await auth.verifyIdToken(idToken)
    uid = decodedToken.uid
  } catch (error) {
    res.statusCode = 401
    res.json({ error: 'Unauthorized: No Valid Token Provided' })
    return res
  }

  if (req.method === 'POST') {
    try {
      const fullDaysSinceEpoch = Math.floor(Date.now() / 8.64e7)
      const newUser = {
        uid,
        displayName: JSON.parse(req.body).displayName || '',
        displayPictureURL: JSON.parse(req.body).photoURL || '',
        stats: {
          openings: {
            // label: {
            //   attemptsWhite
            //   successfulWhite
            //   attemptsBlack
            //   successfulBlack
            // }
          },
          noOfDaysLoggedIn: 1,
          noOfSuccessiveDaysLoggedIn: 1,
          mostNoOfSuccessiveDaysLoggedIn: 1,
        },
        achievements: [
          // references to achievements achieved, so can update list of achievements and not have to update every user
        ],
        following: [
          // list of uids, potential way to follow other users progress and achievements
        ],
        accountCreatedDate: admin.firestore.Timestamp.now(),
        lastDayLoggedIn: fullDaysSinceEpoch,
      }
      await storage.collection('users').doc(uid).set(newUser)
      statusCode = 200
      responseBody = { title: 'Success', body: newUser }
    } catch (error) {
      statusCode = 500
      responseBody = { error: `Internal Server Error: Error updating Firestore. ${error.message}` }
    }

    res.statusCode = statusCode
    res.json(responseBody)
    return
  }

  if (req.method === 'PUT') {
    try {
      await storage
        .collection('users')
        .doc(uid)
        .update({
          ...JSON.parse(req.body),
          last_updated: admin.firestore.FieldValue.serverTimestamp(),
        })

      statusCode = 200
      responseBody = { title: 'Success' }
    } catch (error) {
      statusCode = 500
      responseBody = { error: `Internal Server Error: Error updating Firestore. ${error.message}` }
    }

    res.statusCode = statusCode
    res.json(responseBody)
    return
  }

  if (req.method === 'DELETE') {
    try {
      await auth.deleteUser(uid)
      await storage.collection('users').doc(uid).delete()
      statusCode = 200
      responseBody = { title: 'Success' }
    } catch (error) {
      statusCode = 500
      responseBody = {
        error: `Internal Server Error: Error deleting user/user details. ${error.message}`,
      }
    }

    res.statusCode = statusCode
    res.json(responseBody)
    return
  }

  if (req.method === 'GET') {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users' })
    }
  }

  res.statusCode = statusCode
  res.json(responseBody)
}

export default handler
