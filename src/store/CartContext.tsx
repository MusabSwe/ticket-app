import { createContext, useContext, useState } from "react"

type TicketData = {
    ticket_id: number;
    event_id: number;
    event_date: string;
    ticket_price: number;
    total_tickets: number;
    booked_tickets: number;
}
type CartEvent = {
    img: string;
    selectedTickets: number;
    date: string;
    price: string | number;
    ticket: TicketData | null | undefined
}

type CartEventsContextType = CartEvent[];
type CartEventsUpdateContextType = (event: CartEvent) => void;
type UpdateCartEventType = (ticketId: number, newSelectedTickets: number, newPrice: number | string) => void;
type DeleteCartEventType = (ticketId: number) => void;

const CartEventsContext = createContext<CartEventsContextType>([]);
const CartEventsUpdateContext = createContext<CartEventsUpdateContextType>(() => { });
const UpdateCartEventContext = createContext<UpdateCartEventType>(() => { });
const DeleteCartEventContext = createContext<DeleteCartEventType>(() => { });

// Custom hooks
// to get tickets for an event
export const useCartEvents = () => {
    return useContext(CartEventsContext);
}
// to add ticket for an event in the cart
export const useCartEventUpdate = () => {
    return useContext(CartEventsUpdateContext);
}

// update Exsiting ticket of an event in the cart
export const useUpdateCartEvent = () => useContext(UpdateCartEventContext);

// Delete existing ticket of an event in the cart
export const useDeleteCartEvent = () => useContext(DeleteCartEventContext);

export const CartEventsProvider = ({ children }: any) => {

    const [selectedEvents, setSelectedEvents] = useState<CartEventsContextType>([]);

    // add new tikcets for a given events
    const addEventTickets = (event: CartEvent) => {
        setSelectedEvents((prevSelectedSevents) => [...prevSelectedSevents, event])
    }

    // update tickets existing event in the cart 
    const updateEventTickets = (ticketId: number, newSelectedTickets: number, newPrice: number | string) => {
        setSelectedEvents((prev) =>
            prev.map((event) =>
                event.ticket?.ticket_id === ticketId
                    ? { ...event, selectedTickets: newSelectedTickets, price: newPrice }
                    : event
            )
        );
    };

    // Delete a ticket of an event from cart
    const deleteEventTicket = (ticketId: number) => {
        setSelectedEvents((prev) =>
            prev.filter((item) => item.ticket?.ticket_id !== ticketId)
        );
    }

    return (
        <>
            <CartEventsContext.Provider value={selectedEvents}>
                <CartEventsUpdateContext.Provider value={addEventTickets}>
                    <UpdateCartEventContext.Provider value={updateEventTickets}>
                        <DeleteCartEventContext.Provider value={deleteEventTicket}>
                            {children}
                        </DeleteCartEventContext.Provider>
                    </UpdateCartEventContext.Provider>
                </CartEventsUpdateContext.Provider>
            </CartEventsContext.Provider>
        </>
    )

}