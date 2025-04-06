import { TbListSearch } from "react-icons/tb";
import { FaMapLocationDot } from "react-icons/fa6";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Event {
    event_id: number;
    event_name: string;
    location: string;
    image_url: string;
    start_date: string;
    end_date: string;
}

export default function Events() {

    const [fetchedEvents, setFetchedEvents] = useState<Event[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);

    const navigate = useNavigate();

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() == '' || !value) {
            setFetchedEvents(allEvents);
        } else {
            const filteredData = allEvents.filter((event) => event.event_name.toLowerCase().includes(value.toLowerCase()));
            setFetchedEvents(filteredData);
        }
    }

    useEffect(() => {
        fetch('http://127.0.0.1:3000/events')
            .then((res) => {
                return res.json();
            }).then((data) => {
                if (data.statusCode) {
                    console.log('Error: ', data.message);
                    setFetchedEvents([]);
                    setAllEvents([]);
                } else
                    console.log('data:', data);
                setFetchedEvents(data);
                setAllEvents(data);
            }).catch((e) => {
                setFetchedEvents([]);
                setAllEvents([]);
                console.log(e.message);
            });
    }, [])


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
                                key={event.event_id - 1}
                                className="rounded-2xl border border-[#3D474F] p-3 w-full md:w-1/4 lg:w-1/3 lg:max-w-[258px]"
                            >
                                <div className="sm:flex justify-between  md:flex md:flex-col md:justify-between md:h-full ">
                                    <div className="sm:flex md:block">
                                        <div>
                                            <img
                                                src={event.image_url}
                                                alt="Event-img"
                                                className="rounded-2xl w-full h-[225px] sm:max-w-[120px] sm:w-[120px]  md:max-w-full md:w-full sm:h-[120px] md:h-[140px]"
                                            />
                                        </div>

                                        <div>
                                            <h4 className="custom-scroll sm:text-xs md:text-sm font-bold px-2 py-2 text-[#FF9F77] max-h-[45px] overflow-y-auto">{event.event_name}</h4>
                                            <div className="px-3 space-y-2">
                                                <div className="flex space-x-2 ">
                                                    <FaMapLocationDot className="w-5 h-5 min-w-5 min-h-5" color="#3D474F" />
                                                    <span className="custom-scroll sm:text-xs md:text-sm max-h-[40px] overflow-y-auto">{event.location}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <HiMiniCalendarDateRange className="w-5 h-5 min-w-5 min-h-5" color="#3D474F" />
                                                    <span className="sm:text-xs md:text-sm">
                                                        {event.start_date.split('T')[0] + ' | ' + event.end_date.split('T')[0]}
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
            <style>
                {`
          .custom-scroll {
              scrollbar-width: none;
              scrollbar-color: #888 transparent;
          }
        `}
            </style>
        </section>
    );
}