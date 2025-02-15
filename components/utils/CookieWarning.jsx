import { Button } from './Button'

export function CookieWarning({ onConfirm }) {
  return (
    <div className="fixed bottom-0 z-10 flex w-full justify-center bg-tertiary p-4">
      <div className="container flex flex-col items-center">
        This site uses local storage and cookies to improve the user experience and provide some
        functionality. By continuing to use the site you agree that you are comfortable with this.
        Information about what is stored is listed on the help page.
        <div className="mb-2 mt-4 w-full max-w-xs">
          <Button fill onClick={onConfirm}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  )
}
