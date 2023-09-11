import React,{useEffect,useState}from 'react'
import Card from './eventcard'
import { set } from 'zod'
import { getAllEvent } from '../../service/api'

const recommendevent = () => {
  
  const [Eventcards, setEventcards] = useState([]);

  //fetch all event from api
  useEffect(() => {
    getAllEvent()
      .then(data => {
        setEventcards(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const reccommend = Eventcards.filter((event)=>event.featured === true )

  let recE = reccommend.filter((event,index) =>{
    if (index <5){
      return true
    }
  })

  const addevent = (recE:any) => {
    if(recE.length >  0){
      return (
      <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 place-content-center ">
          {recE.map((eventcard, index) => (
            <a key = {index} href= {"/eventdetail/"+eventcard.eventID} className="">
            <Card image={eventcard.posterImage} datestart={eventcard.startDateTime} dateend={eventcard.endDateTime} name={eventcard.eventName} place={eventcard.location} />
            </a>
          ))}
      </div>)
    }else{
      return(
        <div>
          <div className="h-32 mt-3"/>
          <div className="text-4xl h-48 flex items-center justify-center font-montserrat font-medium">No Event</div>
          <div className="h-32 mt-3"/>
        </div>
      )
    }
  }
  
  return (
    <div className='flex flex-col '>
      <div className="text-4xl font-montserrat font-medium py-4">Recommend Events</div>
      {addevent(recE)}
    </div>
  )
}

export default recommendevent