import { TbListSearch } from "react-icons/tb";
import kafdImg from "../assets/KAFD Event.jpg";
import Diryah from "../assets/diryah.jpg";
import { FaMapLocationDot } from "react-icons/fa6";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";

interface Event {
    id: number;
    event: string;
    location: string;
    img: string;
    startDate: Date;
    endDate: Date;
    price: number | string;
}

const events: Event[] = [
    {
        id: 1,
        event: 'Iftaar',
        img: kafdImg,
        location: 'KAFD - East of King Fahd Road',
        startDate: new Date(), // chnage to be range of dates 
        endDate: new Date('03/31/2025'),
        price: 28, // ticket price
    },
    {
        id: 2,
        event: 'Diriyah',
        img: Diryah,
        location: 'Albujayri - East of King Fahd Road',
        startDate: new Date(), // chnage to be range of dates 
        endDate: new Date('03/31/2025'),
        price: 49.99
    },
    {
        id: 3,
        event: 'Festival',
        img: kafdImg,
        location: 'Boulevard - King Salman Bin Abdulaziz Road',
        startDate: new Date(), // chnage to be range of dates 
        endDate: new Date('03/31/2025'),
        price: 375
    },
    {
        id: 4,
        event: 'Iftaar',
        img: kafdImg,
        location: 'KAFD - East of King Fahd Road',
        startDate: new Date(), // chnage to be range of dates 
        endDate: new Date('03/31/2025'),
        price: 219
    },
    {
        id: 5,
        event: 'Diriyah',
        img: Diryah,
        location: 'Albujayri - East of King Fahd Road',
        startDate: new Date(), // chnage to be range of dates 
        endDate: new Date('03/31/2025'),
        price: 185
    },
    {
        id: 6,
        event: 'Festival',
        img: kafdImg,
        location: 'Boulevard - King Salman Bin Abdulaziz Road',
        startDate: new Date(), // chnage to be range of dates 
        endDate: new Date('03/31/2025'),
        price: 78
    }
];

export default function Events() {

    const [fetchedEvents, setFetchedEvents] = useState<Event[]>(events);
    const navigate = useNavigate();

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() == '' || !value) {
            setFetchedEvents(events);
        } else {
            const filteredData = events.filter((event) => event.event.toLowerCase().includes(value.toLowerCase()));
            setFetchedEvents(filteredData);
        }
    }

    return (
        <section
            id="events"
            className="px-9 lg:px-18 xl:px-24 w-full my-5"
        >
            {/* filter section */}
            <div className="bg-[#3D474F] p-5 rounded-2xl relative mb-4">
                <input
                    type="text"
                    placeholder="Search for an event"
                    className="w-full border-1 text-[#FF9F77] border-white p-3 rounded-2xl focus:outline-0 focus:border-1 focus:border-[#FF9F77]"
                    onChange={handleSearch}
                />
                <TbListSearch
                    color="#FF9F77"
                    className="absolute top-8 right-8 w-6 h-6"
                />
            </div>
            {/* Events section */}
            <div className="flex flex-wrap md:justify-center lg:justify-start gap-3">
                {fetchedEvents?.length == 0 ?
                    <div className="text-center w-full text-2xl text-[#FF9F77] my-2">
                        No Events
                    </div>
                    :
                    fetchedEvents.map((event) => {

                        return (
                            <div
                                key={event.id - 1}
                                className="rounded-2xl border border-[#3D474F] p-3 w-full md:w-1/4 lg:w-1/3 lg:max-w-[258px]"
                            >
                                <div className="sm:flex justify-between  md:block">
                                    <div className="sm:flex md:block">
                                        <div>
                                            <img
                                                src={event.img}
                                                alt="Event-img"
                                                className="rounded-2xl sm:max-w-[120px] sm:w-[120px]  md:max-w-full md:w-full sm:h-[120px] md:h-[140px]"
                                            />
                                        </div>

                                        <div>
                                            <h4 className="sm:text-sm md:text-xl font-bold px-2 py-2 text-[#FF9F77]">{event.event}</h4>
                                            <div className="px-3 space-y-2">
                                                <div className="flex space-x-2">
                                                    <FaMapLocationDot className="w-5 h-5" color="#3D474F" />
                                                    <span className="sm:text-xs md:text-sm ">{event.location}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <HiMiniCalendarDateRange className="w-5 h-5" color="#3D474F" />
                                                    <span className="sm:text-xs md:text-sm">
                                                        {event.startDate.toISOString().split('T')[0] + ' | ' + event.endDate.toISOString().split('T')[0]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-2 sm:mt-0 md:mt-2">
                                        <button
                                            className="text-sm bg-[#FF9F77] p-2 min-w-[78px] cursor-pointer transition delay-75 duration-150 ease-in-out hover:bg-[#ffb477] rounded w-full text-white"
                                            onClick={() => { navigate('/event-details', { state: event }) }}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </section>
    );
}