import { useState } from 'react'
import { auth } from '../../../firebaseAdmin'

import { contributeOutlined } from '../../../data/icons'
import { useData } from '../../../context/data-context'
import { Button } from '../../../components/utils/Button'
import { Header } from '../../../components/utils/Header'
import { AdminSubmissionCard } from '../../../components/submission/AdminSubmissionCard'
import { SEO } from '../../../components/utils/SEO'

export default function Submissions() {
  const { loadingError, submissions } = useData()
  const [page, setPage] = useState(0)

  const PAGE_SIZE = 5
  const lowerLimit = page * PAGE_SIZE
  const higherLimit = page * PAGE_SIZE + PAGE_SIZE

  const totalSubmissions = submissions?.length || 'Loading'
  const mergedSubmissions = submissions?.filter((s) => s.status === 'MERGED').length || 'Loading'
  const openSubmissions = submissions?.filter((s) => s.status === 'OPEN').length || '0'

  if (loadingError) {
    return <div>{JSON.stringify(loadingError)}</div>
  }

  return (
    <div className="container flex flex-col">
      <SEO description="Admin Submissions" title="submissions" path="/admin/submissions" />
      <Header icon={contributeOutlined} heading="Submissions" />

      <div className="mb-4 flex">
        <div className="flex w-1/3 justify-center text-xl">Total: {totalSubmissions}</div>
        <div className="flex w-1/3 justify-center text-xl">Merged: {mergedSubmissions}</div>
        <div className="flex w-1/3 justify-center text-xl">Open: {openSubmissions}</div>
      </div>

      {submissions?.map(
        (s, i) =>
          lowerLimit <= i &&
          i < higherLimit && <AdminSubmissionCard index={i + 1} key={s.id} submission={s} />
      )}

      <div className="my-4 flex">
        <div className="mr-2 w-full">
          <Button fill onClick={() => setPage((oldPage) => oldPage - 1)} disabled={page === 0}>
            Prev Page
          </Button>
        </div>
        <div className="mr-l w-full">
          <Button
            fill
            onClick={() => setPage((oldPage) => oldPage + 1)}
            disabled={page === Math.floor(submissions?.length / PAGE_SIZE)}
          >
            Next Page
          </Button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const idToken = ctx.req.cookies?.idToken
  const redirect = {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  }

  if (!idToken) return redirect
  try {
    const parsedToken = JSON.parse(ctx.req.cookies?.idToken)
    const decodedToken = await auth.verifyIdToken(parsedToken)
    const uid = decodedToken.uid
    if (uid === process.env.ADMIN_UID) {
      return {
        props: {},
      }
    }
    return redirect
  } catch (error) {
    return redirect
  }
}
