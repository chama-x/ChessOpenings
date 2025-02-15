export function UserBaseStats({ contributions, loadedUser, submissionsByUser }) {
  const createdDate = new Date(loadedUser.accountCreatedDate._seconds * 1000)
  const fullDaysSinceEpoch = Math.floor(Date.now() / 8.64e7)
  const daysSinceLoggedIn = fullDaysSinceEpoch - loadedUser.lastDayLoggedIn

  return (
    <div className="flex flex-wrap justify-between text-center">
      <div className="mb-4 flex w-1/2 flex-col sm:w-1/4">
        <p>
          <b>Joined</b>
        </p>
        {`${createdDate.toLocaleString('default', { month: 'long' })} ${createdDate.getFullYear()}`}
      </div>
      <div className="mb-4 flex w-1/2 flex-col sm:w-1/4">
        <p>
          <b>Last Active</b>
        </p>
        {daysSinceLoggedIn === 0
          ? 'Today'
          : daysSinceLoggedIn === 1
            ? 'Yesterday'
            : `${daysSinceLoggedIn} days ago`}
      </div>
      <div className="mb-4 flex w-1/2 flex-col sm:w-1/4">
        <p>
          <b>Submissions</b>
        </p>
        {submissionsByUser.length}
      </div>
      <div className="mb-4 flex w-1/2 flex-col sm:w-1/4">
        <p>
          <b>Contributions</b>
        </p>
        {contributions.length}
      </div>
    </div>
  )
}
