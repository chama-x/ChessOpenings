import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip'

import { edit } from '../../data/icons'
import { useData } from '../../context/data-context'
import { Button } from '../../components/utils/Button'
import { EditUserModal } from '../../components/modals/EditUserModal'
import { UserBaseStats } from '../../components/user/UserBaseStats'
import { SVG } from '../utils/SVG'

export function UserProfileHeader({ contributions, loadedUser, setLoadedUser, submissionsByUser }) {
  const { user } = useData()
  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const {
    query: { uid },
  } = useRouter()

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [user])

  return (
    <>
      <ReactTooltip id="user-tooltip" place="left" effect="solid" backgroundColor="black" />
      <div className="flex flex-col items-center sm:flex-row">
        <img
          className="rounded-lg object-cover sm:mr-8"
          src={loadedUser.displayPictureURL || '/media/images/default.png'}
          alt="user profile picture"
          width={200}
          height={200}
        />
        <div className="flex flex-grow flex-col">
          <div className="flex items-center justify-between">
            <h1 className="my-4 text-xl xs:text-2xl sm:text-4xl">
              {loadedUser.displayName || 'User Profile'}
            </h1>
            {user?.uid === uid && (
              <div data-tip="Edit Profile" data-for="user-tooltip">
                <Button onClick={() => setShowEditUserModal(true)}>
                  <SVG fill="white" icon={edit} size={24} />
                </Button>
              </div>
            )}
          </div>

          <h2 className="mb-4 text-lg text-fg-secondary xs:text-xl md:text-2xl">User ID: {uid}</h2>
          <div className="hidden md:block">
            <UserBaseStats
              contributions={contributions}
              loadedUser={loadedUser}
              submissionsByUser={submissionsByUser}
            />
          </div>
        </div>
      </div>
      {showEditUserModal && (
        <EditUserModal
          setShowModal={setShowEditUserModal}
          loadedUser={loadedUser}
          setLoadedUser={setLoadedUser}
        />
      )}
    </>
  )
}
