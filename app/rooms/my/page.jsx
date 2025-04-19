import getMyRooms from '@/app/actions/getMyRooms';
import Heading from '@/app/components/Heading';
import MyRoomCard from '@/app/components/MyRoomCard';
import React from 'react'

const MyRoomsPage = async () => {
    const rooms = await getMyRooms();
  return (
    <>
        <Heading title='My Rooms' />
        {rooms.length > 0 ? (
            rooms.map((room) => <MyRoomCard key={room.$id} room={room}/>  ) 
        ) : (
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className='text-gray-600'>You have not created any rooms yet.</h3>
            </div>
        )}
    </>
  )
}

export default MyRoomsPage