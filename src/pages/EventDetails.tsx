import { useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { useLocation } from "react-router"
import SAR from '../assets/Saudi_Riyal.png';
import { useCartEventUpdate } from '../store/CartContext';
import Message from "../components/Message";

interface TicketDetails {
    date: string;
    tickets: number;
    price: number | string;
}

export default function EventDetails() {

    const location = useLocation();
    const addEvents = useCartEventUpdate();
    const price = location?.state?.price ? location?.state?.price : 0

    const [formData, setFormData] = useState<TicketDetails>({
        date: '', // reservation date
        tickets: 1,
        price: price,
    });
    const [showMsg, setShowMsg] = useState<boolean>(false);


    const handleSubmitToCart = () => {
        console.log('formData: ', formData);
        const selectedEvents = {
            img: location?.state?.img,
            tickets: formData.tickets,
            date: formData.date,
            price: formData.price,
            // ticketId:'',
            // bookedTickets:'',
        }

        console.log('handleSubmitToCart: ', selectedEvents);

        addEvents(selectedEvents);
    }

    // const today = new Date();
    // const minDate = today.toISOString().split("T")[0];
    // // Get the end of March date (YYYY-MM-DD)
    // const endOfMarch = new Date(today.getFullYear(), 2, 31)
    //     .toISOString()
    //     .split("T")[0];
    // useEffect(() => {
    //     console.log('location.state: ', location.state);
    //     console.log('today.toISOString(): ', today.toISOString());
    //     console.log('minDate: ', minDate);
    //     console.log('Max date: ', endOfMarch);

    // }, [])

    return (
        <>
            <section
                id="event-details"
                className="flex w-full flex-wrap md:justify-between px-9 lg:px-18 xl:px-24 my-16"
            >
                <div className="md:w-2/3 w-full">
                    <div className="relative">
                        <img
                            src={location?.state?.img}
                            alt="Event-img"
                            className="h-[333px] w-full rounded-2xl"
                        />
                        <div className="absolute bottom-5 left-2">
                            <h1 className="text-2xl font-extrabold px-2 py-2 text-white">{location?.state?.event}</h1>
                            <div className="px-3 space-y-2">
                                <div className="flex space-x-2">
                                    <FaMapLocationDot className="w-5 h-5" color="#FFF" />
                                    <span className="font-extrabold text-white">{location?.state?.location}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <HiMiniCalendarDateRange className="w-5 h-5" color="#FFF" />
                                    <span className="font-extrabold text-white">
                                        {location?.state?.startDate?.toISOString()?.split('T')[0] + ' | ' + location?.state?.endDate?.toISOString()?.split('T')[0]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-2xl">Event Details</h3>
                        <p className="text-[#9E9E9E]">
                            Terms & Conditions:
                        </p>
                        <ul className="list-disc px-7 text-[#9E9E9E] space-y-2 tracking-tighter">
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, rem possimus rerum hic, enim in sapiente eius ut dolorum ratione dolorem optio fugiat placeat consectetur a facilis? Blanditiis, vel rem.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, illo, eaque repellendus vel rem labore ad veritatis tempora suscipit dolor dolore atque sapiente possimus delectus cupiditate praesentium nobis quasi cumque.</li>
                        </ul>
                    </div>
                </div>
                <div
                    className="md:w-1/3 md:flex md:justify-center md:mt-0 mt-3 w-full "
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmitToCart();
                            setShowMsg(true);
                        }}
                        className="md:w-full"
                    >
                        <div
                            className="border-t flex flex-col justify-between md:border py-3 md:p-4 md:rounded-2xl mx-2 md:bg-slate-100 "
                        >
                            <div>
                                <h3 className="text-2xl md:text-center"> Ticket Details </h3>
                                <div className="pt-2 px-2 space-y-4">
                                    <div>
                                        <label htmlFor="event-date">Choose the date</label>
                                        <br />
                                        <input
                                            type="date"
                                            className="border w-full p-3 rounded"
                                            id="event-date"
                                            onChange={(e) => {
                                                setFormData((prevFormdate) => ({
                                                    ...prevFormdate,
                                                    date: e.target.value
                                                }))
                                            }}
                                            value={formData.date}
                                            required
                                        // min={ }
                                        // max={ }
                                        />
                                    </div>
                                    {formData.date &&
                                        <>
                                            <div>
                                                <label htmlFor="tickets">Choose number of Tiktes</label>
                                                <div className="flex space-x-3 justify-between">
                                                    <button
                                                        type="button"
                                                        onClick={() => { setFormData((prevFormdate) => (prevFormdate.tickets === 1 ? prevFormdate : ({ ...prevFormdate, tickets: prevFormdate?.tickets - 1, price: ((prevFormdate?.tickets - 1) * price).toFixed(2) }))) }}
                                                        className="px-5 py-2 border-1 rounded cursor-pointer hover:text-white hover:bg-[#ffb477] transition delay-75 duration-75 ease-in-out"
                                                    >
                                                        -
                                                    </button>
                                                    <div className="px-5 py-2 border-1 rounded">{formData?.tickets}</div>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setFormData((prevFormdate) => (prevFormdate.tickets === 5 ? prevFormdate : ({ ...prevFormdate, tickets: prevFormdate?.tickets + 1, price: ((prevFormdate?.tickets + 1) * price).toFixed(2), }))) }}
                                                        className="px-5 py-2 border-1 rounded cursor-pointer hover:text-white hover:bg-[#ffb477] transition delay-75 duration-75 ease-in-out"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>Price:</span>
                                                <span className="w-20">{formData.price}</span>
                                                <img
                                                    src={SAR}
                                                    alt="SAR"
                                                    className="w-6 h-6"
                                                />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="py-2 px-2">
                                <button
                                    type="submit"
                                    className="p-3 text-white cursor-pointer bg-[#FF9F77] rounded w-full transition delay-75 duration-150 ease-in-out hover:bg-[#ffb477]"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <Message
                isOpen={showMsg}
                message="Event added to the Cart sucessfully"
                setIsOpen={setShowMsg}
                type={1}
            />
        </>
    )
}