"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getAllEvents(request, reply) {
    try {
        const connection = request.server.mysql;
        // Ensure MySQL2 returns a promise-based response
        const [rows] = await connection.query('SELECT * FROM sa_events');
        return reply.send(rows); // Return to prevent multiple replies
    }
    catch (error) {
        return reply.status(500).send(error);
    }
}
async function getReservedEvents(request, reply) {
    try {
        const connection = request.server.mysql;
        // Ensure MySQL2 returns a promise-based response
        const [rows] = await connection.query('SELECT * FROM reservations');
        console.log('result: ', rows);
        return reply.send(rows); // Return to prevent multiple replies
    }
    catch (error) {
        return reply.status(500).send(error);
    }
}
async function getAvailableTickets(request, reply) {
    try {
        const connection = request.server.mysql;
        const { eventId, eventDate } = request.query;
        const [rows] = await connection.query(eventDate ? `
            select *
            from tickets
            where event_id = ? AND event_date = ?
        `
            :
                `
            select *
            from tickets
            where event_id = ?
        `, [eventId, eventDate]);
        console.log('reslt:', rows);
        return reply.send(rows);
    }
    catch (error) {
        return reply.status(500).send(error);
    }
}
async function bookEvent(request, reply) {
    const db = request.server.mysql;
    const { reservationDate, reservedTickets, ticketId, totalPrice, userId = 'Admin' } = request.body;
    try {
        await db.query(`START TRANSACTION;`);
        await db.query(`INSERT INTO reservations (user_id, ticket_id, reserved_tickets, price, reservation_date) 
             VALUES (?, ?, ?, ?, ?)`, [userId, ticketId, reservedTickets, totalPrice, reservationDate]);
        await db.query(`UPDATE tickets 
             SET booked_tickets = booked_tickets + ? 
             WHERE ticket_id = ?`, [reservedTickets, ticketId]);
        await db.query(`COMMIT;`);
        return reply.status(201).send({ message: 'Reservation created successfully' });
    }
    catch (error) {
        await db.query(`ROLLBACK;`);
        console.error('Error during booking event:', error);
        return reply.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}
async function removeEvent(request, reply) {
    const connection = request.server.mysql;
    const { reservationId } = request.body;
    try {
        await connection.query(`START TRANSACTION;`);
        // Fetch the reservation details before deleting it
        const [reservation] = await connection.query(`SELECT ticket_id, reserved_tickets FROM reservations WHERE reservation_id = ?`, [reservationId]);
        console.log('Fetched reservation: ', reservation);
        if (reservation.length === 0) {
            await connection.query(`ROLLBACK;`); // Rollback transaction if not found
            return reply.status(404).send({ message: 'Record not found.' });
        }
        const { ticket_id, reserved_tickets } = reservation[0];
        // Delete the reservation
        const [deleteResult] = await connection.query(`DELETE FROM reservations WHERE reservation_id = ?`, [reservationId]);
        console.log('deleteResult: ', deleteResult);
        if (deleteResult.affectedRows === 0) {
            await connection.query(`ROLLBACK;`); // Rollback if delete fails
            return reply.status(500).send({ message: 'Failed to remove reservation.' });
        }
        // Update the booked_tickets count in tickets table
        await connection.query(`UPDATE tickets 
             SET booked_tickets = booked_tickets - ? 
             WHERE ticket_id = ?`, [reserved_tickets, ticket_id]);
        await connection.query(`COMMIT;`);
        return reply.status(200).send({ message: 'Reservation successfully removed.' });
    }
    catch (error) {
        await connection.query(`ROLLBACK;`);
        console.error('Error during removing event:', error);
        return reply.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}
exports.default = {
    getAllEvents,
    getReservedEvents,
    getAvailableTickets,
    bookEvent,
    removeEvent
};
