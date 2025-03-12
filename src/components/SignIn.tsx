import { CgClose } from "react-icons/cg";
import "./Modal.css";
import Logo from '../assets/Ticket-logo.png';
import { useState } from "react";

interface SignInProps {
    isOpen: boolean;
    setIsOpen: any;
}

export default function SignIn({ isOpen, setIsOpen }: SignInProps) {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = () => {
        console.log('user info: ', userInfo);
    }

    return (
        <>
            <div
                id="myModal"
                className={isOpen ? "modal" : "hidden"}
            >
                {/* Modal content */}
                <div
                    className="modal-content"
                >
                    <span onClick={() => { setIsOpen(false) }}><CgClose className="cursor-pointer hover:text-[red]" /></span>
                    <div className="flex justify-center">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-14 h-14 rounded-full"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-[#3D474F] text-center mt-3">Plase Enter your information to login</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className="mt-2"
                        >
                            <div>
                                <label className="text-xs text-[#3D474F] red-star">Enter your email</label>
                                <br />
                                <input
                                    type="email"
                                    required
                                    className="border pt-1 border-[#3D474F] rounded w-full"
                                    onChange={(e) => {
                                        setUserInfo((prevUserInfo) => ({
                                            ...prevUserInfo,
                                            email: e.target.value
                                        }))
                                    }}
                                    value={userInfo.email}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-[#3D474F] red-star">Enter your password</label>
                                <br />
                                <input
                                    type="password"
                                    required
                                    className="border pt-1 border-[#3D474F] rounded w-full"
                                    onChange={(e) => {
                                        setUserInfo((prevUserInfo) => ({
                                            ...prevUserInfo,
                                            password: e.target.value
                                        }))
                                    }}
                                    value={userInfo.password}
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-[#3D474F] transition delay-100 duration-150 ease-in-out p-1 text-white text-sm w-full mt-4 rounded hover:bg-[#FF9F77] cursor-pointer"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}