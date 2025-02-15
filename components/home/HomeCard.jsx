'use client'

import Link from 'next/link'

import { useWindowSize } from '../../functions/hooks'
import { LinkButton } from '../utils/Button'

export function HomeCard({
  alignRight = false,
  children,
  iconPrimary: IconPrimary,
  iconSecondary: IconSecondary,
  link,
  linkText,
  text,
  titlePrimary,
  titleSecondary,
}) {
  const { windowSize } = useWindowSize()
  const iconSize = windowSize >= 768 ? 60 : 40

  return (
    <div className="mt-6 flex flex-col rounded-lg bg-secondary p-4 shadow-md md:p-8">
      <div
        className={`mx-2 mb-4 flex items-center lg:mx-4 ${alignRight ? 'flex-row-reverse' : ''}`}
      >
        <Link
          href={link}
          className={`group flex items-center fill-theme text-theme ${alignRight ? 'ml-auto lg:justify-end' : 'mr-auto'}`}
        >
          {IconPrimary && (
            <svg
              className="mr-4 h-full transition-transform group-hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {IconPrimary()}
            </svg>
          )}
          <h2 className="text-lg underline-offset-2 transition-colors hover:underline group-hover:text-theme-hover sm:text-xl md:text-3xl">
            {titlePrimary}
          </h2>
        </Link>
        <div className="hidden min-w-max lg:flex">
          <LinkButton link={link}>{linkText}</LinkButton>
        </div>
      </div>
      <p
        className={`mx-2 mb-4 flex items-center fill-fg-primary lg:mx-4 ${alignRight ? 'justify-end' : ''}`}
      >
        {text}
      </p>
      <div className="mx-2 flex items-center fill-fg-primary lg:mx-4">
        {IconSecondary && (
          <svg
            className="mr-2 h-full"
            xmlns="http://www.w3.org/2000/svg"
            width={(2 * iconSize) / 3}
            height={(2 * iconSize) / 3}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {IconSecondary()}
          </svg>
        )}
        <h3 className="text-md md:text-xl">{titleSecondary}</h3>
      </div>
      {children}
      <div className="m-2 mb-2 flex md:mb-0 lg:hidden">
        <LinkButton link={link} fill>
          {linkText}
        </LinkButton>
      </div>
    </div>
  )
}

export function HomeCardSmall({ children }) {
  return (
    <div className="mt-6 w-full xl:w-1/2 xl:first-of-type:pr-2 xl:last-of-type:pl-2">
      <div className="flex h-full flex-col rounded-lg bg-secondary p-4 shadow-md transition-transform hover:scale-[1.02] md:p-8">
        {children}
      </div>
    </div>
  )
}

export function HomeCardSmallMax({ children }) {
  return (
    <div className="mb-6 w-full break-inside-avoid">
      <div className="flex h-full flex-col rounded-lg bg-secondary p-4 shadow-md transition-transform hover:scale-[1.02] md:p-8">
        {children}
      </div>
    </div>
  )
}
