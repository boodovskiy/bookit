import React from 'react'
import getMyBookings from '../actions/getMyBookings';
import BookedRoomCard from '../components/BookedRoomCard';
import Heading from '../components/Heading';

const BookingsPage = async () => {
  const bookings = await getMyBookings();
  console.log(bookings);

  return (
    <>
      <Heading title="My Bookings"/>
      { bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">You have no bookings.</p>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )}
    </>
  )
}

export default BookingsPage