import { useState } from 'react'

import { NavbarBurgerMenu, NavbarCenterLinks, NavbarEndLinks, NavbarLogo } from './NavbarComponents'
import { SettingsModal } from '../modals/SettingsModal'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  return (
    <>
      <div className="z-20 flex flex-col items-center bg-secondary shadow-md">
        <div className="container mx-auto flex w-full items-center">
          <NavbarLogo />
          <NavbarCenterLinks />
          <NavbarEndLinks
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setShowSettingsModal={setShowSettingsModal}
            showSettingsModal={showSettingsModal}
          />
        </div>
        <div className="w-full">
          <NavbarBurgerMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setShowSettingsModal={setShowSettingsModal}
            showSettingsModal={showSettingsModal}
          />
        </div>

        {showSettingsModal && <SettingsModal setShowSettingsModal={setShowSettingsModal} />}
      </div>
      {menuOpen && (
        <div
          className="fixed left-0 top-0 z-10 h-full w-full bg-tertiary opacity-90"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
