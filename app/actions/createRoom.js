'use server';

import { ID } from "node-appwrite";
import { createAdminClient } from "../config/appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

async function createRoom(previousState, formData) {
    // Get databases instance
    const { databases, storage } = await createAdminClient();

    try {
        const { user } = await checkAuth();

        if (!user) {
            return {
                error: 'You must be logged in to create a room',
            };
        }

        let imageId;

        const image = formData.get('image');

        // Uploading image to Appwrite Storage
        if (image && image.size > 0 && image.name !== 'undefined') {
            try {
                const response = await storage.createFile(
                    process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS,
                    ID.unique(),
                    image
                );
                imageId = response.$id;
            } catch (error) {
                console.log('Error uploading image:', error);
                return {
                    error: 'Could not upload image',
                };
            }
        } else {
            console.log('No image provided or invalid image');
        }


        // Create room
        const newRoom = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            ID.unique(),
            {
                user_id: user.id,
                name: formData.get('name'),
                description: formData.get('description'),
                sqft: formData.get('sqft'),
                capacity: formData.get('capacity'), 
                location: formData.get('location'),
                address: formData.get('address'),
                availability: formData.get('availability'),
                price_per_hour: formData.get('price_per_hour'),
                amenities: formData.get('amenities'),
                image: imageId || null,
            }
        );

        revalidatePath('/', 'layout');

        return {
            success: true
        }
    } catch (error) {
        console.log('Error creating room:', error);
        const errorMessage = error.response?.message || 'Unknown error occurred.';
        return {
            error: errorMessage,
        }
    }
}

export default createRoom;  