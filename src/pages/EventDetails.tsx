import { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { useLocation } from "react-router"
import SAR from '../assets/Saudi_Riyal.png';
import { useCartEventUpdate } from '../store/CartContext';
import Message from "../components/Message";

interface TicketForm {
    reservedDate: string;
    tickets: number;
    price: number | string;
    availableDates?: Array<string>;
    eventTicket: TicketData[] | null | undefined // row from Ticket table
}

interface TicketData {
    ticket_id: number;
    event_id: number;
    event_date: string;
    ticket_price: number;
    total_tickets: number;
    booked_tickets: number;
}

export default function EventDetails() {

    const location = useLocation();
    const addEvents = useCartEventUpdate();

    const [formData, setFormData] = useState<TicketForm>({
        reservedDate: '', // reservation date
        tickets: 1,
        price: 0,
        availableDates: [],
        eventTicket: null
    });
    const [showMsg, setShowMsg] = useState<boolean>(false);
    const [eventTickets, setEventTickets] = useState<TicketData[]>();

    const [selectedTicket, setSelectedTicket] = useState<TicketData>({
        ticket_price: 0,
        booked_tickets: 0,
        event_date: '',
        event_id: 0,
        ticket_id: 0,
        total_tickets: 0
    });

    const handleSubmitToCart = () => {
        console.log('formData: ', formData);
        const selectedEvents = {
            img: location?.state?.image_url,
            tickets: formData.tickets, // bookedTickets
            date: formData.reservedDate,
            price: formData.price,
            // ticketId:'',
            // bookedTickets:'',
        }
        console.log('handleSubmitToCart: ', selectedEvents);
        addEvents(selectedEvents);
    }

    useEffect(() => {
        // used to get available dates for the event (to show only available dates )
        fetch(`http://127.0.0.1:3000/available-tickets?eventId=${location.state.event_id}`)
            .then((res) => {
                console.log('res:', res);
                return res.json();
            }).then((data) => {
                console.log(`Ticket table for the event ${location.state.event_name}: `, data);
                // setFetchedTickets(data);
                setEventTickets(data); // store ticket table

                const availableDates = data
                    .filter((ticket: TicketData) => ticket.booked_tickets < ticket.total_tickets)
                    .map((ticket: TicketData) => {
                        console.log('Before: ', ticket.event_date);
                        const localDate = new Date(ticket.event_date).toLocaleDateString("en-CA"); // local time YYYY-MM-DD
                        console.log('After: ', localDate);
                        return localDate;
                    });


                setFormData((prevFormData) => ({
                    ...prevFormData,
                    availableDates: availableDates,
                }));

                console.log('availableDates:', availableDates);
            }).catch((err) => {
                console.log('Avaiable tickets error: ', err);
            })
    }, [])

    useEffect(() => {

        formData.reservedDate && fetch(`http://127.0.0.1:3000/available-tickets?eventDate=${formData.reservedDate}&eventId=${location.state.event_id}`)
            .then((res) => {
                console.log('res:', res);
                return res.json();
            }).then((data) => {
                console.log('data:', data[0]);
                setSelectedTicket(data[0]);
                setFormData((prevData) => ({
                    ...prevData,
                    price: data[0]?.ticket_price
                }))
            }).catch((e) => {
                console.log('e: ', e);
            })

    }, [formData.reservedDate])

    return (
        <>
            <section
                id="event-details"
                className="flex w-full flex-wrap md:justify-between px-9 lg:px-18 xl:px-24 my-16"
            >
                <div className="md:w-2/3 w-full">
                    <div className="relative">
                        <img
                            src={location?.state?.image_url}
                            alt="Event-img"
                            className="h-[333px] w-full rounded-2xl"
                        />
                        <div className="absolute bottom-5 left-2">
                            <h1 className="text-2xl font-extrabold px-2 py-2 text-white">{location?.state?.event_name}</h1>
                            <div className="px-3 space-y-2">
                                <div className="flex space-x-2">
                                    <FaMapLocationDot className="w-5 h-5" color="#FFF" />
                                    <span className="font-extrabold text-white">{location?.state?.location}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <HiMiniCalendarDateRange className="w-5 h-5" color="#FFF" />
                                    <span className="font-extrabold text-white">
                                        {location?.state?.start_date?.split('T')[0] + ' | ' + location?.state?.end_date?.split('T')[0]}
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

                                        <select
                                            id="event-date"
                                            className="border w-full p-3 rounded"
                                            onChange={(e) => {
                                                const selectedEventTicket: any = eventTickets?.filter((t) => t.event_date == e.target.value)[0];
                                                setFormData((prevFormData) => ({
                                                    ...prevFormData,
                                                    reservedDate: e.target.value,
                                                    eventTicket: selectedEventTicket
                                                }));
                                            }}
                                            value={formData.reservedDate}
                                            required
                                        >
                                            <option value="">Select a date</option>
                                            {formData?.availableDates ? formData?.availableDates.map((date, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={date}
                                                    >
                                                        {date}
                                                    </option>
                                                );
                                            })
                                                :
                                                null
                                            }
                                        </select>
                                    </div>
                                    {formData.reservedDate &&
                                        <>
                                            <div>
                                                <label htmlFor="tickets">Choose number of Tiktes</label>
                                                <div className="flex space-x-3 justify-between">
                                                    <button
                                                        type="button"
                                                        onClick={() => {

                                                            setFormData((prevFormdate) => (prevFormdate.tickets === 1 ? prevFormdate : ({ ...prevFormdate, tickets: prevFormdate?.tickets - 1, price: ((prevFormdate?.tickets - 1) * selectedTicket?.ticket_price).toFixed(2) })))
                                                        }
                                                        }
                                                        className="px-5 py-2 border-1 rounded cursor-pointer hover:text-white hover:bg-[#ffb477] transition delay-75 duration-75 ease-in-out"
                                                    >
                                                        -
                                                    </button>
                                                    <div className="px-5 py-2 border-1 rounded">{formData?.tickets}</div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData((prevFormdate) => (prevFormdate.tickets === (selectedTicket?.total_tickets - selectedTicket?.booked_tickets) ? prevFormdate : ({ ...prevFormdate, tickets: prevFormdate?.tickets + 1, price: ((prevFormdate?.tickets + 1) * selectedTicket?.ticket_price).toFixed(2), })))
                                                        }
                                                        }

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