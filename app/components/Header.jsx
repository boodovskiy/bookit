import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBuilding, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='bg-gray-100'>
        <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className="flex h-16 items-center justify-between">
                <div className="flex item-center">
                    <Link href="/">
                        <Image className="h-12 w-12" src="/images/logo.svg" alt='Bookit' priority={true} width={48} height={48} />
                    </Link>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className='rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white'>
                                Rooms
                            </Link>
                            <Link href="/bookings.html" className='rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white'>
                                Bookings
                            </Link>
                            <Link href="/add-room.html" className='rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white'>
                                Add Room
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <!-- Right Side Menu --> */}
                <div className="ml-auto">
                    <div className="ml-4 flex items-center md:ml-6">
                    {/* <!--Logged out only --> */}
                        <Link href="/login.html" className='mr-3 text-gray-800 hover:text-gray-600'>
                            <FaSignInAlt className="inline mr-1" /> Login
                        </Link>
                        <Link href="/register.html" className='mr-3 text-gray-800 hover:text-gray-600'>
                            <FaUser className="inline mr-1" /> Register
                        </Link>
                        <Link href="/my-rooms.html" className='mr-3 text-gray-800 hover:text-gray-600'>
                            <FaBuilding className="inline mr-1" /> My Rooms
                        </Link>
                        <Link href="/login.html" className='mr-3 text-gray-800 hover:text-gray-600'>
                            <FaSignOutAlt className="inline mr-1" /> Sign-Out
                        </Link>
                    </div>
                </div>
            </div>
        </nav>

        {/* <!-- Mobile menu --> */}
        <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <a href="/" className='block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white'>
                    Rooms
                </a>
                {/* <!-- Logged In Only --> */}
                <a href="/bookings.html" className='block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white'>
                    Bookings
                </a>
                <a href="/add-room.html" className='block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white'>
                    Add Room
                </a>
            </div>
        </div>
    </header>
  )
}

export default Header