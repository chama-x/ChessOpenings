export function Badge({ status }) {
  function getBackground() {
    switch (status) {
      case 'CLOSED':
        return 'bg-error'
      case 'MERGED':
        return 'bg-success'
      default:
        return 'bg-theme'
    }
  }

  return <div className={`w-32 rounded-md p-2 text-center ${getBackground()}`}>{status}</div>
}
