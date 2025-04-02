import rooms from '../data/rooms.json'
import Heading from './components/Heading';
import RoomCard from './components/RoomCard';

export default function Home() {
  return (
    <>
      <Heading title='Available Rooms' />
      { rooms.length > 0 ? (
        rooms.map((room, index) => <RoomCard key={index} room={room} />)
        ) : (<p>No rooms available at the moment.</p>)
      }
    </>
  );
}
