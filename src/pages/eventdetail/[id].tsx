import EventDetails from '../eventdetail';
import EventDetailsC from '../eventdetailC';
import { useRouter } from 'next/router';


const EventDetail = () => {

  //get id from url
  const router = useRouter()
  const { id } = router.query
  console.log("HELLO FROM [id].tsx I got",id?.slice(0,2))
  //check ticketType from id[0:2] and redirect to correct page
  const ticketType = id?.slice(0,2)
  const RenderPage = () => {
    if(ticketType === "02"){
      return <EventDetailsC></EventDetailsC>;
    } else if(id === "d62af169"){
      return <EventDetailsC></EventDetailsC>;
    } else {
      return <EventDetails></EventDetails>;
    }
  };
  

  




  return (
    <div>
      <RenderPage></RenderPage>
    </div>
  );
};

export default EventDetail;