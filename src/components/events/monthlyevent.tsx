import React , {useEffect, useState} from 'react'
import Card from './eventcard'
import { date } from 'zod'
import MaterialSymbolsArrowBackIosNew from '../icon/PreButton'
import MaterialSymbolsArrowForwardIos from '../icon/ForwardButton'
import Eventcards from '../../data/Eventcards.json'

const ArrayMonth = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'
]


const monthlyevent = () => {

  const [current, setCurrent] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(Eventcards);


  const filterEventsHandler = () => {
    setFilteredEvents(Eventcards.filter((eventcard) => ( parseInt(eventcard.date.split('.')[1]) === (current+1))));
  };


  useEffect(() => {
    filterEventsHandler(ArrayMonth[current]);
  }, [current]);


  console.log(filteredEvents);
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
      <div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 place-content-center p-3">
        {filteredEvents.map((eventcard) => (
          <a href= "/event" className="">
          <Card image={eventcard.image} date={eventcard.date} name={eventcard.name} place={eventcard.place} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default monthlyevent