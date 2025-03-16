import { createContext, useState } from "react"
const CartEventsContext = createContext([]);
const CartEventsUpdateContext = createContext();
export const CartEventsProvider = ({ children }: any) => {

    const [selectedEvents, setSelectedEvents] = useState([]);

    return (
        <>
            <CartEventsContext.Provider value={selectedEvents}>
                <CartEventsUpdateContext.Provider value={setSelectedEvents}>
                    {children}
                </CartEventsUpdateContext.Provider>
            </CartEventsContext.Provider>
        </>
    )

}