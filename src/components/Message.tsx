import { IoBagCheckOutline } from "react-icons/io5";
import "./Modal.css";
import { useNavigate } from "react-router";
import { TbShoppingCartCancel } from "react-icons/tb";

interface MessageProps {
    isOpen: boolean;
    setIsOpen: any;
    message: string;
    type: number; // 1 --> sucess, 2 --> Fail, 3 --> warning
}

export default function Message({ isOpen, setIsOpen, message, type }: MessageProps) {

    const navigate = useNavigate();

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
                    {/* <span
                        onClick={() => { setIsOpen(false) }}
                    >
                        <CgClose className="cursor-pointer hover:text-[red]" />
                    </span> */}
                    <div>
                        <div className="flex justify-center mt-3">
                            {type == 1 ?
                                <IoBagCheckOutline className="w-20 h-20 text-green-400" />
                                :
                                <TbShoppingCartCancel className="w-20 h-20 text-red-500" />
                            }
                        </div>

                        <div className="my-5">
                            <h3 className="text-xl px-2 text-center text-slate-300 font-extrabold"> {message} </h3>
                        </div>
                        <div className="text-center mt-7">
                            <button
                                className={`p-1 text-white text-xl cursor-pointer ${type == 1 ? 'bg-green-400' : 'bg-red-500'} rounded w-full transition delay-75 duration-150 ease-in-out ${type == 1 ? 'hover:bg-green-500' : 'hover:bg-red-600'}`}
                                onClick={() => { type == 1 ? navigate('/') : setIsOpen(false) }}
                            >
                                {type == 1 ?
                                    'Home'
                                    :
                                    'Close'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}