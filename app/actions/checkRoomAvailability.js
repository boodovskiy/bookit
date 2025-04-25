'use server';

import { cookies } from "next/headers";
import { createSessionClient } from "../config/appwrite";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";
import { DateTime } from "luxon";

// Check for overlaping date ranges
function dateRangesOverlap(checkInA, checkOutA, checkInB, checkOutB) {
    return (checkInA <= checkOutB && checkOutA >= checkInB);
}

async function checkRoomAvailability({ roomId, checkIn, checkOut }) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appwrite-session');
    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        const checkInDate = DateTime.fromISO(checkIn, { zone: 'utc' }).toUTC();
        const checkOutDate = DateTime.fromISO(checkOut, { zone: 'utc' }).toUTC();
        
        // Fetch all bookings for a given room
        const { documents: bookings } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            [Query.equal('room_id', 'roomId')]
        );

        // Loop over all bookings and check for overlaps
        for (const booking of bookings) {
            const bookingCheckIn = DateTime.fromISO(booking.check_in, { zone: 'utc' }).toUTC();
            const bookingCheckOut = DateTime.fromISO(booking.check_out, { zone: 'utc' }).toUTC();

            // Check if the booking overlaps with the requested dates
            if (dateRangesOverlap(checkInDate, checkOutDate, bookingCheckIn, bookingCheckOut)) {
                return  false; // Ovverlap found, room is not available
            }
        }

        // No overlaps found, room is available
        return true;
    } catch (error) {
        console.log('Failed to check availability', error);
        return {
            error: 'Failed to check availability'
        }
    }
}

export default checkRoomAvailability;