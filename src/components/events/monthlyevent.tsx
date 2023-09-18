import React , {use, useEffect, useState} from 'react'
import Card from './eventcard'
import { date, set } from 'zod'
import MaterialSymbolsArrowBackIosNew from '../icon/PreButton'
import MaterialSymbolsArrowForwardIos from '../icon/ForwardButton'
import { getAllEvent } from '../../service/api'

const ArrayMonth = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'
]


const monthlyevent = () => {
  const [Eventcards, setEventcards] = useState([]);
  const [current, setCurrent] = useState(new Date().getMonth());
  const [filteredEvents, setFilteredEvents] = useState([]);
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

  var filteredEvent1 = Eventcards.filter((eventcard) => ( parseInt(eventcard.startDateTime.split('-')[1]) === (current+1)))

  const filterEventsHandler = () => {
    setFilteredEvents(Eventcards.filter((eventcard) => ( parseInt(eventcard.startDateTime.split('-')[1]) === (current+1))));
  };

  useEffect(() => {
    filterEventsHandler();
  }, [current]);

  const addevent = (filteredEvent1:any) => {
    if(filteredEvent1.length >  0){
      return (
        <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 place-content-center ">
          {filteredEvent1.map((eventcard, index) => (
            <a key = {index} href= {"/eventdetail/"+eventcard.eventID} className="w-52">
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
    <div>
      <div className="flex justify-between p-4 mb-2 mt-2">
        <div className="flex text-2xl font-montserrat font-bold w-1/4">
            <button onClick={()=>setCurrent((current-1+12)%12)} className='flex mt-1'><MaterialSymbolsArrowBackIosNew></MaterialSymbolsArrowBackIosNew>
              <div className="text-2xl font-montserrat font-medium text-center">{ArrayMonth[((current-1+12)%12)]}</div>
            </button>
        </div>
        <div className="text-4xl font-montserrat font-bold text-center ">{ArrayMonth[current]}</div>
        <div className="flex text-2xl font-montserrat font-bold w-1/4 justify-end">
          <button onClick={()=>setCurrent((current+1)%12)} className='flex mt-1'>
            <div className="text-2xl font-montserrat font-medium text-center ">{ArrayMonth[((current+1)%12)]}</div>
            <MaterialSymbolsArrowForwardIos></MaterialSymbolsArrowForwardIos>
          </button>
        </div>
      </div>
      {addevent(filteredEvent1)}
    </div>
  )
}

export default monthlyevent