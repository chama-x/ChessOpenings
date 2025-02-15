export function OpeningTabs({ setTab, tab }) {
  return (
    <div className="my-4 shadow-md">
      <OpeningTab label="All" setTab={setTab} tab={tab} value="" />
      <OpeningTab label="e4" setTab={setTab} tab={tab} value="e4" />
      <OpeningTab label="d4" setTab={setTab} tab={tab} value="d4" />
      <OpeningTab label="Other" setTab={setTab} tab={tab} value="other" />
    </div>
  )
}

function OpeningTab({ label, tab, setTab, value }) {
  return (
    <button
      className={`h-10 w-1/4 cursor-pointer first:rounded-bl-md first:rounded-tl-md last:rounded-br-md last:rounded-tr-md hover:bg-tertiary ${
        tab === value ? 'cursor-default bg-tertiary' : 'bg-secondary'
      }`}
      onClick={() => setTab(value)}
    >
      {label}
    </button>
  )
}
