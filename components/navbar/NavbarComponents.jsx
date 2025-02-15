import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';

import {
  contributeFilled,
  contributeOutlined,
  helpFilled,
  helpOutlined,
  homeFilled,
  homeOutlined,
  learnFilled,
  learnOutlined,
  trainFilled,
  trainOutlined,
  settingsOutlined,
  trapsFilled,
  trapsOutlined
} from '../../data/icons';
import { useData } from '../../context/data-context';
import { useWindowSize } from '../../functions/hooks';
import { Button } from '../utils/Button';
import { Logo } from '../utils/Logo';

export function NavbarLogo() {
  const { pathname } = useRouter();
  const path = pathname.split('/')?.[1];

  return (
    <div className="w-1/2 p-2 pr-0 sm:p-2 md:w-1/3">
      <Link href="/" className="flex text-fg-primary hover:text-theme">
        <div className="flex justify-center">
          <div className="w-8 sm:w-14">
            <Logo />
          </div>
        </div>
        <h1 className="my-auto ml-2 sm:mx-2 xl:text-2xl">ChessOpenings</h1>
      </Link>
      {pathname !== '/' && (
        <div className="hidden lg:flex">
          <span className="my-auto text-fg-primary xl:text-3xl">•</span>
          <Link href={`/${path}`} className="flex justify-center text-fg-primary hover:text-theme">
            <h2 className="mx-2 my-auto xl:text-2xl">{path}</h2>
          </Link>
        </div>
      )}
    </div>
  );
}

export function NavbarLink({ icon: Icon, path, tooltip, isEndLink }) {
  const { pathname } = useRouter();
  const onPage = pathname === path;

  return (
    <Link
      href={path}
      className={`mx-auto flex h-14 items-center border-b-4 border-t-4 border-t-secondary md:h-20 ${
        onPage ? 'border-b-theme' : 'border-b-secondary'
      }`}
      data-for={`navbar-link-${path.slice(1) || 'home'}`}
      data-tip={tooltip}
    >
      <ReactTooltip
        id={`navbar-link-${path.slice(1) || 'home'}`}
        place="bottom"
        effect="solid"
        backgroundColor="black"
        offset={{ top: 20 }}
      />
      {Icon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          className={`mx-auto ${isEndLink ? 'fill-gray-500' : onPage ? 'fill-theme' : 'fill-fg-primary'}`}
        >
          {Icon()}
        </svg>
      )}
    </Link>
  );
}

function NavbarBurgerLink({ icon: Icon, path, label, onClick }) {
  return (
    <Link href={path} onClick={onClick}>
      <div className="cursor-pointer items-center justify-center fill-fg-primary py-4 hover:fill-theme hover:text-theme">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          className="fill-gray-500 mr-4"
        >
          {Icon()}
        </svg>
        <p className="text-2xl">{label}</p>
      </div>
    </Link>
  );
}

export function NavbarCenterLinks() {
  const { pathname } = useRouter();

  return (
    <div className="just hidden h-full w-1/3 md:flex">
      <NavbarLink icon={pathname === '/' ? homeFilled : homeOutlined} path="/" tooltip="Home" />
      <NavbarLink
        icon={pathname === '/learn' ? learnFilled : learnOutlined}
        path="/learn"
        tooltip="Learn"
      />
      <NavbarLink
        icon={pathname === '/train' ? trainFilled : trainOutlined}
        path="/train"
        tooltip="Train"
      />
      <NavbarLink
        icon={pathname === '/traps' ? trapsFilled : trapsOutlined}
        path="/traps"
        tooltip="Traps and Mistakes"
      />
      <NavbarLink
        icon={pathname === '/contribute' ? contributeFilled : contributeOutlined}
        path="/contribute"
        tooltip="Contribute"
      />
    </div>
  );
}

export function NavbarEndLinks({ menuOpen, setMenuOpen, setShowSettingsModal }) {
  const { pathname } = useRouter();
  const { windowSize } = useWindowSize();

  let size = 30;
  if (windowSize >= 1024) size = 36;

  return (
    <div className="mr-2 flex w-1/2 items-center justify-end md:mr-0 md:w-1/3">
      <NavbarAuthButton />
      <div className="items-center sm:flex">
        <NavbarLink
          icon={pathname === '/help' ? helpFilled : helpOutlined}
          path="/help"
          tooltip="Help"
          isEndLink
        />
        <div className="hover:bg-gray-100 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="fill-gray-500"
          >
            {settingsOutlined()}
          </svg>
        </div>
      </div>
      <NavbarBurgerMenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}

function NavbarAuthButton() {
  const { userData } = useData();
  const { pathname } = useRouter();
  const onPage = pathname.includes('/user');

  // currently loading user
  if (userData === undefined) {
    return null;
  }

  return userData ? (
    <Link href={`/user/${userData.uid}`} className="mx-2">
      <ReactTooltip
        id="navbar-link-profile"
        place="bottom"
        effect="solid"
        backgroundColor="black"
        offset={{ top: 20 }}
      />
      <div
        className={`mx-auto flex h-14 items-center border-b-4 border-t-4 border-t-secondary md:h-20 ${
          onPage ? 'border-b-theme' : 'border-b-secondary'
        }`}
        data-for="navbar-link-profile"
        data-tip="Profile"
      >
        <img
          className="border-4 border-secondary object-cover hover:border-2"
          src={userData?.displayPictureURL || '/media/images/default.png'}
          alt="default user"
          width={40}
          height={40}
        />
      </div>
    </Link>
  ) : (
    pathname !== '/sign-in' && (
      <Link href="/sign-in" className="mr-2">
        <Button>Sign In</Button>
      </Link>
    )
  );
}

export function NavbarBurgerMenuButton({ menuOpen, setMenuOpen }) {
  const [hover, setHover] = useState(false);
  const baseClasses =
    'block absolute h-0.5 w-full rounded-lg opacity-100 left-0 rotate-0 transition-all duration-200 ease-in-out';

  return (
    <button
      className="relative mx-2 mt-2 flex h-6 w-7 cursor-pointer md:hidden"
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        className={`top-0 ${baseClasses} ${hover ? 'bg-theme-hover' : 'bg-fg-primary'} ${menuOpen ? 'hidden' : ''}`}
      />
      <span
        className={`top-2 ${baseClasses} ${hover ? 'bg-theme-hover' : 'bg-fg-primary'} ${menuOpen ? 'rotate-45' : ''}`}
      />
      <span
        className={`top-2 ${baseClasses} ${hover ? 'bg-theme-hover' : 'bg-fg-primary'} ${menuOpen ? '-rotate-45' : ''}`}
      />
      <span
        className={`top-4 ${baseClasses} ${hover ? 'bg-theme-hover' : 'bg-fg-primary'} ${menuOpen ? 'hidden' : ''}`}
      />
    </button>
  );
}

export function NavbarBurgerMenu({ menuOpen, setMenuOpen, setShowSettingsModal }) {
  const { pathname } = useRouter();
  const { windowSize } = useWindowSize();

  let size = 30;
  if (windowSize >= 768) setMenuOpen(false);

  return (
    <>
      <div
        className={`absolute w-full overflow-hidden bg-secondary transition-[max-height] ${
          menuOpen ? 'max-h-full duration-500' : 'max-h-0 duration-200'
        }`}
      >
        <NavbarBurgerLink
          icon={pathname === '/' ? homeFilled : homeOutlined}
          path="/"
          label="Home"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/learn' ? learnFilled : learnOutlined}
          path="/learn"
          label="Learn"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/train' ? trainFilled : trainOutlined}
          path="/train"
          label="Train"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/traps' ? trapsFilled : trapsOutlined}
          path="/traps"
          label="Traps & Mistakes"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/contribute' ? contributeFilled : contributeOutlined}
          path="/contribute"
          label="Contribute"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/help' ? helpFilled : helpOutlined}
          path="/help"
          label="Help"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className="cursor-pointer items-center justify-center fill-fg-primary py-4 hover:fill-theme hover:text-theme"
          onClick={() => {
            setShowSettingsModal(true);
            setMenuOpen(false);
          }}
        >
          <div className="hover:bg-gray-100 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              className="fill-gray-500"
            >
              {settingsOutlined()}
            </svg>
          </div>
          <p className="ml-2 text-2xl">Settings</p>
        </div>
      </div>
    </>
  );
}
