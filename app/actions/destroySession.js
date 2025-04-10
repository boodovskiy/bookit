'use server';

import { cookies } from "next/headers";
import { createSessionClient } from "../config/appwrite";

async function destroySession() {
    // Retrive the session cookie
    const sessionCookie = (await cookies()).get('appwrite-session');

    if (!sessionCookie) {
        return {
            error: 'No session cookie found'
        }    
    } 

    try {
       const { account } = await createSessionClient(sessionCookie.value); 
       
       // Delete current session
       await account.deleteSession('current');

       // Clear session cookie
       (await cookies()).delete('appwrite-session');

       return {
        success: true
       }
    } catch (error) {
        return {
            error: 'Error deleting session.'
        }
    }
}

export default destroySession;