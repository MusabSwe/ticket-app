import logo from '../assets/Ticket-logo.png';
import { RiMenu4Fill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import { FaHouse } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import SignIn from './SignIn';


export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <section className="flex justify-around fixed top-0 z-10 w-full h-16 bg-[#3D474F]">

                <div className='w-[20%] flex lg:justify-center py-2'>
                    <img src={logo} alt="logo" className='rounded-full w-12 cursor-pointer' />
                </div>

                <div className='w-[50%] flex lg:mx-10'>
                    <ul className='items-center text-white h-full space-x-5 hidden lg:flex'>
                        <li className='cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>Home</li>
                        <li className='cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>Events</li>
                        {/* <li className='cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>Contact us</li> */}
                    </ul>
                </div>

                <div className='hidden lg:flex justify-center items-center space-x-5 w-[30%] '>
                    <button
                        className='text-white cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'
                        onClick={() => { setShowLoginModal(true) }}
                    >
                        Log in
                    </button>
                    <div className='text-white cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                        <GrLanguage
                            style={{ width: '20px', height: '20px' }}
                            className='text-white cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'
                        />
                    </div>
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
                        <li className='flex space-x-2 items-center cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                            <FaHouse />
                            <span> Home</span>
                        </li>
                        <li className='flex space-x-2 items-center cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                            <MdEvent />
                            <span>Events</span>
                        </li>
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
                        <div className='flex space-x-2 items-center text-[#3D474F] cursor-pointer transition delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                            <GrLanguage
                                style={{ width: '20px', height: '20px' }}
                            />
                            <span>Language</span>
                        </div>
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