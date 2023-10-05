import React from 'react'
import Link from 'next/link'
import Head from 'next/head';
import PersonCircleWhite from './icon/PersonCircleWhite';
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import Profile from './profile';
import CreateEvent from './createevent';

const navbarEO = () => {
    const [navbar, setNavbar] = React.useState(false);
    const {data:session} = useSession();

    return (
    <>
        <Head>
            <title>EventBud</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            {/* import font to page */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
            <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
        </Head>

      <nav className="w-full bg-black">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="#">
                <div className="flex">
                    <h2 className="text-3xl body-font font-montserrat font-bold text-white">EventBud</h2>
                    <p className='text-base body-font font-montserrat font-medium text-white'>creator</p>
                </div>
              </a>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-white font-montserrat text-xl">
                    <ul className="items-center justify-center space-y-8 md:flex md:space-x-2 md:space-y-0">
                        <PersonCircleWhite/>
                        <button className='font-medium'
                            onClick={() => signOut({callbackUrl: '/main'})}
                        >Sign out</button>
                    </ul>
                </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default navbarEO
