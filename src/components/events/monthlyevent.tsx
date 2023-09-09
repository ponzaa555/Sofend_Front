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

  return (
    <div>
      <div className="flex justify-around p-4">
        <div className="flex text-2xl font-montserrat font-bold justify-center w-1/3">
            <button onClick={()=>setCurrent((current-1+12)%12)} className='flex'><MaterialSymbolsArrowBackIosNew></MaterialSymbolsArrowBackIosNew>
              <div className="text-2xl font-montserrat pl-2 text-center">{ArrayMonth[((current-1+12)%12)]}</div>
            </button>
        </div>
        <div className="text-4xl font-montserrat font-bold text-center w-1/3">{ArrayMonth[current]}</div>
        <div className="flex text-2xl font-montserrat font-bold justify-center w-1/3">
          <button onClick={()=>setCurrent((current+1)%12)} className='flex'>
            <div className="text-2xl font-montserrat pr-2 text-center">{ArrayMonth[((current+1)%12)]}</div>
            <MaterialSymbolsArrowForwardIos></MaterialSymbolsArrowForwardIos>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 place-content-center p-3">
        {filteredEvent1.map((eventcard, index) => (
          <a key = {index} href= {"/event/"+eventcard.eventID} className="">
          <Card image={eventcard.posterImage} date={eventcard.startDateTime} name={eventcard.eventName} place={eventcard.location} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default monthlyevent