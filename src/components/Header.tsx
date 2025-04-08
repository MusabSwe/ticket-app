import logo from '../assets/Ticket-logo.png';
import { RiMenu4Fill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import SignIn from './SignIn';
import { useNavigate } from 'react-router';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FaShoppingCart } from 'react-icons/fa';
import SAR from '../assets/Saudi_Riyal.png';
import Cart from './Cart';
import { useCartEvents } from '../store/CartContext';
import { useTranslation } from 'react-i18next';
import { BiTrash } from 'react-icons/bi';
import { useDeleteCartEvent} from '../store/CartContext';
export default function Header() {

    const selectedEvents = useCartEvents();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [showCartModal, setShowCartModal] = useState<boolean>(false);
    const [_, i18n] = useTranslation();

    const removeTicket = useDeleteCartEvent();

    const navigate = useNavigate();


    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <section
                className="flex justify-around fixed top-0 z-10 w-full h-16 bg-[#3D474F]"
            >
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
                        {/* <li className='cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>My Bookings</li> */}
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
                            className={`absolute ${i18n.language == 'ar' ? 'lg:left-0' : 'right-0'} z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in`}
                        >
                            <div className="py-1">
                                <MenuItem>
                                    <a
                                        onClick={() => { i18n.changeLanguage('ar'); localStorage.setItem('lang', 'ar'); }}
                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        Arabic
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        onClick={() => { i18n.changeLanguage('en'); localStorage.setItem('lang', 'en'); }}
                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                        English
                                    </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                    {/* <button
                        className='text-white cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'
                        onClick={() => { setShowLoginModal(true) }}
                    >
                        Login
                    </button> */}
                    <div className='relative'>
                        <FaShoppingCart
                            style={{ width: '18px', height: '18px' }}
                            className='text-white cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'
                            onClick={() => { setShowCart((prevShowCart) => !prevShowCart) }}
                        />
                        {showCart &&
                            <div className={`absolute bg-white opacity-100 shadow-2xl w-150 ${i18n.language == 'ar' ? 'right-[-570px]' : 'left-[-570px]'} top-7 rounded pb-4`} >
                                <div className='overflow-y-auto min-h-40  max-h-[304px] mx-2'>
                                    <div className='flex w-full justify-around font-extrabold pt-1 text-[#FF9F77] '>
                                        <div className='text-sm text-center w-1/4'> {i18n.language == 'ar' ? 'الحدث' : 'Event'} </div>
                                        <p className='text-sm text-center w-1/4'> {i18n.language == 'ar' ? 'التذاكر' : 'Tickets'} </p>
                                        <p className='text-sm text-center w-1/4'> {i18n.language == 'ar' ? 'التاريخ' : 'Date'} </p>
                                        <p className='text-sm justify-center w-1/4 flex items-center space-x-1'>
                                            <span> {i18n.language == 'ar' ? 'السعر' : 'Price'} </span>
                                            <img src={SAR} className='w-4 h-4' alt="SAR" />
                                        </p>
                                        <p className='text-sm justify-center w-[10%] flex items-center space-x-1'></p>
                                    </div>
                                    {selectedEvents.map((item, index) => (
                                        <div key={index} className='flex justify-around items-center w-full pt-4'>
                                            <div className='w-1/4 flex justify-center'>
                                                <img src={item.img} className='w-18 h-18 rounded' alt="event-img" />
                                            </div>
                                            <p className='w-1/4 text-center'> {item.selectedTickets} </p>
                                            <p className='w-1/4 text-center'> {item.date} </p>
                                            <p className='w-1/4 text-center'> {item.price} </p>
                                            <p
                                                className='w-[10%] flex justify-center cursor-pointer'
                                                onClick={() => {removeTicket(item.ticket.ticket_id) }}
                                            >
                                                <BiTrash color='red' style={{ width: '100%', height: '22px' }} />
                                            </p>
                                        </div>
                                    ))}

                                    {selectedEvents.length == 0 ?
                                        <div className='text-2xl flex justify-center items-end h-[85px]'>
                                            <p className='text-[#FF9F77]'>
                                                {i18n.language == 'ar' ? 'لم يتم إضافة أية أحداث' : 'No events added'}
                                            </p>
                                        </div>
                                        :

                                        <div className="pt-3 flex justify-center px-9">
                                            <button
                                                className="p-2 text-white cursor-pointer bg-[#FF9F77] rounded w-full transition delay-75 duration-150 ease-in-out hover:bg-[#ffb477]"
                                            // onClick={handlePayment}
                                            >
                                                {i18n.language == 'ar' ? 'تأكيد الحجز' : 'Booking confirmation'}
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
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
                position={i18n.language == 'ar' ? 'right' : 'left'}
            >
                <nav className='flex flex-col justify-between h-full'>
                    <ul className='text-[#3D474F] h-full space-y-3'>
                        {/* <li className='flex space-x-2 items-center cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                            <LuTickets />
                            <span> My Bookings</span>
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
                        {/* <button className='flex space-x-2 items-center text-[#3D474F] cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                            <IoLogIn
                                style={{ width: '18px', height: '18px' }}
                            />
                            <span onClick={() => { setShowLoginModal(true); toggleMenu() }}>Log in </span>
                        </button> */}
                        <div
                            onClick={() => { setShowCartModal(true); toggleMenu(); }}
                            className='flex relative mx-0.5 space-x-2 items-center text-[#3D474F] cursor-pointer transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'
                        >
                            <FaShoppingCart
                                style={{ width: '18px', height: '18px' }}
                            />
                            <span>
                                {i18n.language == 'ar' ? 'السلة' : 'Cart'}
                            </span>
                        </div>
                        <Menu as="div" className="relative inline-block">
                            <div>
                                <MenuButton
                                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white py-2 text-sm font-semibold text-[#3D474F] shadow-xs"
                                >
                                    <div className='flex mx-0.5 space-x-1.5 cursor-pointer transition delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                                        <GrLanguage
                                            style={{ width: '18px', height: '18px' }}
                                        />
                                        <span > {i18n.language == 'ar' ? 'اللغة' : 'Language'} </span>
                                    </div>
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute left-0 z-11 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                anchor="bottom start"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <a
                                            // href="#"
                                            onClick={() => { i18n.changeLanguage('ar'); console.log('AR') }}
                                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        >
                                            Arabic
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            // href="#"
                                            onClick={() => { i18n.changeLanguage('en'), console.log('EN') }}
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
            <Cart
                isOpen={showCartModal}
                setIsOpen={setShowCartModal}
            />

        </>
    )
}