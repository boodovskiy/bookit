'use server';

import { cookies } from "next/headers";
import { createSessionClient } from "../config/appwrite";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";
import checkRoomAvailability from "./checkRoomAvailability";

async function bookRoom(prevState, formData) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appwrite-session');
    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        // Get the users ID
        const { user } = await checkAuth();

        if (!user) {
            return {
                error: 'You must be logged in to book a room',
            }
        }

        // Extract the date and time from the form data
        const checkInDate = formData.get('check_in_date');
        const checkInTime = formData.get('check_in_time');
        const checkOutDate = formData.get('check_out_date');
        const checkOutTime = formData.get('check_out_time');
        const roomId = formData.get('room_id');
        
        // Combine the date and time into ISO 8601 format
        const checkInDateTime = `${checkInDate}T${checkInTime}`;
        const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

        // Check if the room is available for the selected dates
        const isAvailable = await checkRoomAvailability(roomId, checkInDateTime, checkOutDateTime);

        if (!isAvailable) {
            return {
                error: 'Room is not available for the selected dates.',
            }
        }

        const bookingData = {
            user_id: user.id,
            room_id: roomId,
            check_in: checkInDateTime,
            check_out: checkOutDateTime,
        }

        // Create a new booking
        const newBooking = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            ID.unique(),
            bookingData
        );

        // Revalidate the path to update the bookings
        revalidatePath('bookings', 'layout');

        return {
            success: true,
        }
    } catch (error) {
        console.log('Failed to book rooms', error);
        return {
            error: 'Failed to book room. Please try again later.',
        }
    }
}

export default bookRoom;