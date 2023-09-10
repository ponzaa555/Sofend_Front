import { useRouter } from 'next/router';
import EventDetails from '../eventdetail';

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <EventDetails></EventDetails>
    </div>
  );
};

export default EventDetail;
