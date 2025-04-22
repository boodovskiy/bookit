import React from 'react'
import getMyBookings from '../actions/getMyBookings';

const BookingsPage = async () => {
  const bookings = await getMyBookings();
  console.log(bookings);

  return (
    <>
      { bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">You have no bookings.</p>
      ) : (
        bookings.map((booking, index) => (
          <h3 key={index}>{ booking.room_id.name }</h3>
        ))
      )}
    </>
  )
}

export default BookingsPage