import { TbListSearch } from "react-icons/tb";
import kafdImg from "../assets/KAFD Event.jpg";
import Diryah from "../assets/diryah.jpg";
import { FaMapLocationDot } from "react-icons/fa6";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
interface Event {
    id: number;
    event: string;
    location: string;
    img: string;
    date: Date;
}

export default function Events() {

    const events: Event[] = [
        {
            id: 1,
            event: 'Iftaar',
            img: kafdImg,
            location: 'KAFD - East of King Fahd Road',
            date: new Date(),
        },
        {
            id: 2,
            event: 'Diriyah',
            img: Diryah,
            location: 'Albujayri - East of King Fahd Road',
            date: new Date(),
        },
        {
            id: 3,
            event: 'Festival',
            img: kafdImg,
            location: 'Boulevard - King Salman Bin Abdulaziz Road',
            date: new Date(),
        },
        {
            id: 4,
            event: 'Iftaar',
            img: kafdImg,
            location: 'KAFD - East of King Fahd Road',
            date: new Date(),
        },
        {
            id: 5,
            event: 'Diriyah',
            img: Diryah,
            location: 'Albujayri - East of King Fahd Road',
            date: new Date(),
        },
        {
            id: 6,
            event: 'Festival',
            img: kafdImg,
            location: 'Boulevard - King Salman Bin Abdulaziz Road',
            date: new Date(),
        }
    ];

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
                />
                <TbListSearch
                    color="#FF9F77"
                    className="absolute top-8 right-8 w-6 h-6"
                />
            </div>
            {/* Events section */}
            <div className="flex flex-wrap md:justify-center lg:justify-start gap-3">
                {events.map((event) => {

                    return (
                        <div
                            key={event.id - 1}
                            className="rounded-2xl border border-[#3D474F] p-3 w-full md:w-1/4 lg:w-1/3 lg:max-w-[258px]"
                        >
                            <div className="flex justify-between  md:block">
                                <div className="flex md:block">
                                    <div>
                                        <img
                                            src={event.img}
                                            alt="Event-img"
                                            className="rounded-2xl max-w-[120px] w-[120px]  md:max-w-full md:w-full h-[120px] md:h-[140px]"
                                        />
                                    </div>

                                    <div>
                                        <h4 className="text-sm md:text-xl font-bold px-2 py-2 text-[#FF9F77]">{event.event}</h4>
                                        <div className="px-3 space-y-2">
                                            <div className="flex space-x-2">
                                                <FaMapLocationDot className="w-5 h-5" color="#3D474F" />
                                                <span className="text-xs md:text-sm ">{event.location}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <HiMiniCalendarDateRange className="w-5 h-5" color="#3D474F" />
                                                <span className="text-xs md:text-sm">
                                                    {event.date.toDateString() + ' | ' + event.date.toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center md:mt-2">
                                    <button
                                        className="text-sm bg-[#FF9F77] p-2 cursor-pointer transition  delay-75 duration-150 ease-in-out hover:bg-[#ffb477] rounded w-full text-white"
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