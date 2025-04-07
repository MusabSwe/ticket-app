import { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { useLocation } from "react-router"
import SAR from '../assets/Saudi_Riyal.png';
import { useCartEventUpdate, useCartEvents, useUpdateCartEvent } from '../store/CartContext';
import Message from "../components/Message";
import { useTranslation } from "react-i18next";

interface TicketForm {
    reservedDate: string;
    selectedTickets: number;
    price: number | string;
    availableDates?: Array<string>;
    eventTicket: TicketData | any  // row from Ticket table
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
    const addTicketsOnCart = useCartEventUpdate(); // to add new tickets to the cart
    const cartEvents = useCartEvents(); // to get cart list
    const updateTicketOnCart = useUpdateCartEvent(); // to update existing ticket on the cart

    const [_, i18n] = useTranslation();
    const [formData, setFormData] = useState<TicketForm>({
        reservedDate: '', // reservation date
        selectedTickets: 1,
        price: 0,
        availableDates: [],
        eventTicket: null
    });
    const [showMsg, setShowMsg] = useState<boolean>(false);
    const [eventTickets, setEventTickets] = useState<TicketData[]>();

    function isSelectedTicketOnCart(ticketId: number) {
        const filteredCart = cartEvents.filter((item) => item.ticket?.ticket_id == ticketId)[0];
        console.log('filteredCart: ', filteredCart);
        if (filteredCart) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmitToCart = () => {

        const selectedTicketOnCart = {
            img: location?.state?.image_url,
            selectedTickets: formData.selectedTickets, // bookedTickets
            date: formData.reservedDate,
            price: formData.price,
            ticket: formData?.eventTicket // ticket row in table
        }
        if (isSelectedTicketOnCart(formData?.eventTicket.ticket_id)) {
            updateTicketOnCart(formData?.eventTicket.ticket_id, formData.selectedTickets, formData.price)
        } else {
            addTicketsOnCart(selectedTicketOnCart);
        }
    }

    useEffect(() => {
        cartEvents?.length > 0 && console.log('cartEvents: ', cartEvents);
    }, [cartEvents.length])

    useEffect(() => {
        // used to get available dates for the event (to show only available dates )
        fetch(`http://127.0.0.1:3000/available-tickets?eventId=${location.state.event_id}`)
            .then((res) => {
                // console.log('res:', res);
                return res.json();
            }).then((data) => {
                // console.log(`Ticket table for the event ${location.state.event_name}: `, data);
                // setFetchedTickets(data);
                setEventTickets(data); // store ticket table

                const availableDates = data
                    .filter((ticket: TicketData) => ticket.booked_tickets < ticket.total_tickets)
                    .map((ticket: TicketData) => {
                        // console.log('Before: ', ticket.event_date);
                        const localDate = new Date(ticket.event_date).toLocaleDateString("en-CA"); // local time YYYY-MM-DD
                        // console.log('After: ', localDate);
                        return localDate;
                    });


                setFormData((prevFormData) => ({
                    ...prevFormData,
                    availableDates: availableDates,
                }));

                // console.log('availableDates:', availableDates);
            }).catch((err) => {
                console.log('Available tickets error: ', err);
            })
    }, [])


    return (
        <>
            <section
                id="event-details"
                className="flex w-full flex-wrap md:justify-between px-9 lg:px-18 xl:px-24 mb-16 mt-5"
            >
                <div className="md:w-2/3 w-full">
                    <div className="relative">
                        <img
                            src={location?.state?.image_url}
                            alt="Event-img"
                            className="h-[333px] w-full rounded-2xl"
                        />
                        <div className={`absolute bottom-5 ${i18n.language == 'ar' ? '' : 'left-2'}`} >
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
                        <h3 className="text-2xl"> {i18n.language == 'ar' ? 'تفاصيل الفعالية' : 'Event Details'} </h3>
                        <p className="text-[#9E9E9E]">
                            {i18n.language == 'ar' ? 'الشروط والأحكام:' : 'Terms & Conditions:'}
                        </p>
                        <ul className="list-disc px-7 text-[#9E9E9E] space-y-2 tracking-tighter">
                            <li>
                                {i18n.language == 'en' ?
                                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, rem possimus rerum hic, enim in sapiente eius ut dolorum ratione dolorem optio fugiat placeat consectetur a facilis? Blanditiis, vel rem.'
                                    :
                                    'لوريم إيبسوم هو نص عربي غير معنى، يُستخدم في مجالات الطباعة ومواقع الويب كنص دال على الشكل والتخطيط. يمكنك اختيار عدد الفقرات وعدد الحروف ثم النقر علىهذا النص'
                                }
                            </li>
                            <li>
                                {i18n.language == 'en' ?
                                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, rem possimus rerum hic, enim in sapiente eius ut dolorum ratione dolorem optio fugiat placeat consectetur a facilis? Blanditiis, vel rem.'
                                    :
                                    'لوريم إيبسوم هو نص عربي غير معنى، يُستخدم في مجالات الطباعة ومواقع الويب كنص دال على الشكل والتخطيط. يمكنك اختيار عدد الفقرات وعدد الحروف ثم النقر علىهذا النص'
                                }
                            </li>
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
                                <h3 className="text-2xl md:text-center">{i18n.language == 'ar' ? 'تفاصيل التذكرة' : 'Ticket Details'}</h3>
                                <div className="pt-2 px-2 space-y-4">
                                    <div >
                                        <label className="" htmlFor="event-date"> {i18n.language == 'ar' ? 'إختر التاريخ' : 'Choose the date'} </label>
                                        <select
                                            id="event-date"
                                            className="border w-full p-3 rounded mt-2 mb-1"
                                            onChange={(e) => {
                                                // fix date to be same format
                                                const selectedEventTicket: any = eventTickets?.map((t) => {
                                                    const localDate = new Date(t.event_date).toLocaleDateString("en-CA"); // local time YYYY-MM-DD
                                                    if (localDate === e.target.value) {
                                                        return t;
                                                    }
                                                    // to remove undfined obj
                                                }).filter((t) => t)[0];
                                                // console.log('selectedEventTicket: ', selectedEventTicket);
                                                // console.log('formDate before update: ', formData);
                                                // console.log('Selected date: ', e.target.value);
                                                // console.log('Cart list: ', cartEvents);

                                                // here check if the selected date for the event
                                                // exist in the cart, so if exist will update the selected before
                                                // if not will add a new event to the cart list
                                                const tempEvent = cartEvents.map((cart) => {
                                                    if (cart.date == e.target.value) {
                                                        return cart;
                                                    }
                                                }).filter((selectedItem) => selectedItem)[0];
                                                if (tempEvent) {
                                                    // console.log('Already event with the given date added to the cart: ', tempEvent);
                                                    setFormData((prevFormData) => ({
                                                        ...prevFormData,
                                                        reservedDate: e.target.value,
                                                        eventTicket: selectedEventTicket,
                                                        selectedTickets: tempEvent.selectedTickets,
                                                        price: tempEvent.price
                                                    }));
                                                } else {
                                                    console.log('else');
                                                    setFormData((prevFormData) => ({
                                                        ...prevFormData,
                                                        reservedDate: e.target.value,
                                                        eventTicket: selectedEventTicket,
                                                        selectedTickets: 1,
                                                        price: selectedEventTicket?.ticket_price ? selectedEventTicket?.ticket_price : 0
                                                    }));
                                                }
                                            }}
                                            value={formData.reservedDate}
                                            required
                                        >
                                            <option value=""> -- </option>
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
                                                <label htmlFor="tickets"> {i18n.language == 'ar' ? 'اختر عدد التذاكر' : 'Choose number of Tickets'} </label>
                                                <div className="flex space-x-3 justify-between">
                                                    <button
                                                        type="button"
                                                        onClick={() => {

                                                            setFormData((prevFormdate) => (prevFormdate.selectedTickets === 1 ? prevFormdate : ({ ...prevFormdate, selectedTickets: prevFormdate?.selectedTickets - 1, price: ((prevFormdate?.selectedTickets - 1) * formData.eventTicket?.ticket_price).toFixed(2) })))
                                                        }
                                                        }
                                                        className="px-5 py-2 border-1 rounded cursor-pointer hover:text-white hover:bg-[#ffb477] transition delay-75 duration-75 ease-in-out"
                                                    >
                                                        -
                                                    </button>
                                                    <div className="px-5 py-2 border-1 rounded">{formData?.selectedTickets}</div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData((prevFormdate) => (prevFormdate.selectedTickets === (formData?.eventTicket?.total_tickets - formData?.eventTicket?.booked_tickets) ? prevFormdate : ({ ...prevFormdate, selectedTickets: prevFormdate?.selectedTickets + 1, price: ((prevFormdate?.selectedTickets + 1) * formData?.eventTicket?.ticket_price).toFixed(2), })))
                                                        }
                                                        }

                                                        className="px-5 py-2 border-1 rounded cursor-pointer hover:text-white hover:bg-[#ffb477] transition delay-75 duration-75 ease-in-out"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>{i18n.language == 'ar' ? 'السعر' : 'Price'}:</span>
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
                                    {i18n.language == 'ar' ? 'أضف إلى السلة' : 'Add To Cart'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <Message
                isOpen={showMsg}
                message={i18n.language == "ar" ? "تمت إضافة التذكرة إلى سلة التسوق بنجاح" : "Ticket added to the Cart sucessfully"}
                setIsOpen={setShowMsg}
                type={1}
            />
        </>
    )
}