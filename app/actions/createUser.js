'use server';

import { ID } from "node-appwrite";
import { createAdminClient } from "../config/appwrite";

async function createUser(previousState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password')?.trim();
    const confirmPassword = formData.get('confirmPassword')?.trim();

    if (!email || !name || !password) {
        return {
            error: 'Please fill in all fields',
        };
    }

    if (password.length < 8) {
        return {
            error: 'Password must be at least 8 characters long'
        }
    }

    if (!password || !confirmPassword) {
        return {
            error: 'Password and confirmation are required'
        }
    }

    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    if (password !== confirmPassword) {
        return {
            error: 'Passwords do not match',
        }
    }

    const { account } = await createAdminClient();

    try {
        // Create user
        await account.create(ID.unique(), email, password, name);

        return {
            success: true
        }
    } catch (error) {
        console.log('Registration Error:', error);
        return {
            error: 'Could not register User.'
        }
    }

}

export default createUser;