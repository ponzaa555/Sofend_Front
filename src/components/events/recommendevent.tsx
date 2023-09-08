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
  
  return (
    <div className='flex flex-col '>
      <div className="text-4xl font-montserrat font-bold ml-5 py-4">Recommend Event</div>
      <div className="grid grid-cols-6 md:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 place-content-center p-3">
        {recE.map((eventcard) => (
          <a href= "/event" className="">
          <Card image={eventcard.posterImage} date={eventcard.startDateTime} name={eventcard.eventName} place={eventcard.location} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default recommendevent