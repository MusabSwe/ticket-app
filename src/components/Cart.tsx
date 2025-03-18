import { CgClose } from "react-icons/cg";
import "./Modal.css";
import SAR from '../assets/Saudi_Riyal.png';
import { useCartEvents } from "../store/CartContext";
interface CartProps {
    isOpen: boolean;
    setIsOpen: any;
}

export default function Cart({ isOpen, setIsOpen }: CartProps) {

    const selectedEvents = useCartEvents();

    const handlePayment = () => {
        setIsOpen(false);
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
                    <span
                        onClick={() => { setIsOpen(false) }}
                    >
                        <CgClose className="cursor-pointer hover:text-[red]" />
                    </span>
                    <div className='min-h-40 overflow-auto max-h-[304px] rounded pb-4'>
                        <div className='flex w-full justify-around font-extrabold pt-1 text-[#FF9F77] '>
                            <div className='text-sm text-center w-[15%]'> Event </div>
                            <p className='text-sm text-center w-1/4'> Tickets </p>
                            <p className='text-sm text-center w-[35%]'> Date </p>
                            <p className='text-sm justify-center w-1/4 flex items-center space-x-1'>
                                <span>Price</span>
                                <img src={SAR} className='w-4 h-4' alt="SAR" />
                            </p>
                        </div>
                        {selectedEvents?.map((event, index) => (
                            <div key={index} className='flex justify-around items-center w-full pt-4'>
                                <div className='w-[15%] flex justify-center'>
                                    <img src={event.img} className='w-10 h-10 rounded' alt="event-img" />
                                </div>
                                <p className='w-1/4 text-center'> {event.tickets} </p>
                                <p className='w-[35%] text-center min-w-[6rem]'> {event.date} </p>
                                <p className='w-1/4 text-center'> {event.price} </p>
                            </div>
                        ))}

                        {selectedEvents.length == 0 ?
                            <div className='text-2xl flex justify-center items-end h-[85px]'>
                                <p className='text-[#FF9F77]'>No events added</p>
                            </div>
                            :
                            <div className="pt-3">
                                <button
                                    className="p-2 text-white cursor-pointer bg-[#FF9F77] rounded w-full transition delay-75 duration-150 ease-in-out hover:bg-[#ffb477]"
                                    onClick={handlePayment}
                                >
                                    Pay
                                </button>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )

}