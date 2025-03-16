import logo from '../assets/Ticket-logo.png';
import { RiMenu4Fill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import { IoChevronDownCircleOutline, IoLogIn } from "react-icons/io5";
import SignIn from './SignIn';
import { useNavigate } from 'react-router';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';


export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <section className="flex justify-around fixed top-0 z-10 w-full h-16 bg-[#3D474F]">

                <div className='w-[20%] flex lg:justify-center py-2'>
                    <img
                        src={logo}
                        alt="logo"
                        className='rounded-full w-12 cursor-pointer'
                        onClick={() => { navigate('/'); }}
                    />
                </div>

                <div className='w-[50%] flex lg:mx-10'>
                    <ul className='items-center text-white h-full space-x-5 hidden lg:flex'>
                        {/* <li className='cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>Events</li> */}
                        {/* <li className='cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>Contact us</li> */}
                    </ul>
                </div>

                <div className='hidden lg:flex justify-center items-center space-x-5 w-[30%] '>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <MenuButton
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#3D474F] px-3 py-2 text-sm font-semibold text-[#3D474F] shadow-xs">
                                <GrLanguage
                                    style={{ width: '20px', height: '20px' }}
                                    className='text-white cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'
                                />
                            </MenuButton>
                        </div>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            <div className="py-1">
                                <MenuItem>
                                    <a
                                        // href="#"
                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        Arabic
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        // href="#"
                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        English
                                    </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                    <button
                        className='text-white cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'
                        onClick={() => { setShowLoginModal(true) }}
                    >
                        Login
                    </button>
                </div>
                <div className='lg:hidden flex items-center'>
                    <RiMenu4Fill
                        style={{ width: '25px', height: '25px' }}
                        className='text-white cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'
                        onClick={toggleMenu}
                    />
                </div>
            </section>
            {/* offCanvas Sidebar */}
            <Sidebar
                isOpen={isMenuOpen}
                onClose={toggleMenu}
                position='left'
            >
                <nav className='flex flex-col justify-between h-full'>
                    <ul className='text-[#3D474F] h-full space-y-3'>
                        {/* <li className='flex space-x-2 items-center cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                            <FaHouse />
                            <span> Home</span>
                        </li> */}
                        {/* <li className='flex space-x-2 items-center cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                            <MdEvent />
                            <span>Events</span>
                        </li> */}
                        {/* <li className='flex space-x-2 items-center cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                            <MdContactSupport />
                            <span>Contact us</span>
                        </li> */}
                    </ul>
                    <div className='space-y-3'>
                        <button className='flex space-x-2 items-center text-[#3D474F] cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                            <IoLogIn />
                            <span onClick={() => { setShowLoginModal(true); toggleMenu() }}>Log in </span>
                        </button>
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton
                                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white py-2 text-sm font-semibold text-[#3D474F] shadow-xs"
                                >
                                    <div className='flex space-x-1.5 cursor-pointer transition delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                                        <GrLanguage
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                        <span > Language </span>
                                    </div>
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                anchor="bottom start"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <a
                                            // href="#"
                                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        >
                                            Arabic
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            // href="#"
                                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        >
                                            English
                                        </a>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </nav>
            </Sidebar>
            <SignIn
                isOpen={showLoginModal}
                setIsOpen={setShowLoginModal}
            />
        </>
    )
}