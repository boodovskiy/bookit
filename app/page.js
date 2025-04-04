import getAllRooms from './actions/getAllRooms';
import Heading from './components/Heading';
import RoomCard from './components/RoomCard';

export default async function Home() {
  const rooms = await getAllRooms();

  return (
    <>
      <Heading title='Available Rooms' />
      { rooms.length > 0 ? (
        rooms.map((room, index) => <RoomCard key={room.$id} room={room} />)
        ) : (<p>No rooms available at the moment.</p>)
      }
    </>
  );
}
