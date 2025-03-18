import { createContext, useContext, useState } from "react"

type CartEvent = {
    img: string;
    tickets: number;
    date: string;
    price: string | number;
}

type CartEventsContextType = CartEvent[];
type CartEventsUpdateContextType = (event: CartEvent) => void

const CartEventsContext = createContext<CartEventsContextType>([]);
const CartEventsUpdateContext = createContext<CartEventsUpdateContextType>(() => { });

// Custom hooks
export const useCartEvents = () => {
    return useContext(CartEventsContext);
}

export const useCartEventUpdate = () => {
    return useContext(CartEventsUpdateContext);
}

export const CartEventsProvider = ({ children }: any) => {

    const [selectedEvents, setSelectedEvents] = useState<CartEventsContextType>([]);

    const addEvents = (event: CartEvent) => {
        setSelectedEvents((prevSelectedSevents) => [...prevSelectedSevents, event])
    }

    return (
        <>
            <CartEventsContext.Provider value={selectedEvents}>
                <CartEventsUpdateContext.Provider value={addEvents}>
                    {children}
                </CartEventsUpdateContext.Provider>
            </CartEventsContext.Provider>
        </>
    )

}