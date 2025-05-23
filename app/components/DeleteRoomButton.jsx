'use client';
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import deleteRoom from '../actions/deleteRoom';
import { toast } from 'react-toastify';

const DeleteRoomButton = ({ roomId }) => {
    const hadnleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this room? This action cannot be undone.');
        if (confirmed) {
            try {
                const response = await deleteRoom(roomId);
                toast.success('Room deleted successfully');
            } catch (error) {
                console.log('Failed to delete room', error);
                toast.error('Failed to delete room. Please try again later.');
            }
        }
    }
    
  return (
    <button
        onClick={ hadnleDelete }
        className='bg-red-500 text-white px-4 py-2 rounded-lg mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700'>
            <FaTrash className='inline mr-1' /> Delete
    </button>
  )
}

export default DeleteRoomButton