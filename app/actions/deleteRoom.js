'use server';

import { cookies } from "next/headers";
import { createSessionClient } from "../config/appwrite";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function deleteRoom(roomId) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appwrite-session');
    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const { account, databases } = await createSessionClient(sessionCookie.value);

        // Get the users ID
        const user = await account.get();
        const userId = user.$id;

        // Fetch users rooms
        const { documents: rooms} = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            [Query.equal('user_id', userId)]
       
        );

        // Find room to delete
        const roomToDelete = rooms.find((room) => room.$id === roomId);

        // Delete the room if it exists
        if (roomToDelete) {
            await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
                roomToDelete.$id
            );

            // Revalidate the rooms list
            revalidatePath('/rooms/my', 'layout');
            revalidatePath('/', 'layout');

            return {
                success: true,
                message: 'Room deleted successfully',
            }
        } else {
            return {
                success: false,
                error: 'Room not found',
            }
        }

    } catch (error) {
        console.log('Failed to delete room', error);
        return {
            success: false,
            error: 'Failed to delete room',
        }
    }
}

export default deleteRoom;