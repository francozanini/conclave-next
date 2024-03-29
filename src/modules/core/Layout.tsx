import Head from 'next/head';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

export default function Layout({children}: LayoutProps) {
  const session = useSession();

  if (!session.data) {
    return <div>{children ?? null}</div>;
  }

  return (
    <>
      <Head>
        <title>Conclave</title>
        <meta charSet="utf-8" />
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <Navbar />
      <main>{children ?? null}</main>
    </>
  );
}

function NavbarMenu() {
  const menuItems = [
    {link: '/characters', name: 'Characters'},
    {link: '/chronicles', name: 'Chronicles'},
    {link: '/profile', name: 'Profile'}
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-controls="navbar-sticky"
          aria-expanded="false"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          data-collapse-toggle="navbar-sticky"
          type="button">
          <span className="sr-only">Open main menu</span>
          <svg
            aria-hidden="true"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-full bg-gray-900 rounded p-1 flex flex-col gap-4">
          {menuItems.map(({link, name}) => (
            <DropdownMenu.Item key={link} className="text-lg h-8 w-full">
              <Link
                className="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:dark:hover:text-white dark:text-gray-400  dark:hover:text-white  dark:border-gray-700"
                href={link}>
                {name}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function Navbar() {
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 relative w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <span className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Conclave
          </span>
        </span>
        <div className="flex md:order-2">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => signOut()}>
            Logout
          </button>
          <NavbarMenu />
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                aria-current="page"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                href="/characters">
                Characters
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                href="/chronicles">
                Chronicles
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                href="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return <footer>Footer</footer>;
}
