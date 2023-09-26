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
  const [getfinish, setFinish] = useState(false);
  //fetch all event from api
  useEffect(() => {
    getAllEvent()
      .then(data => {
        setEventcards(data);
        setFinish(true);
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
          {getfinish == true ? 
            <>
              <div className="h-32 mt-3"/>
              <div className="text-4xl h-48 flex items-center justify-center font-montserrat font-medium">No Event</div>
              <div className="h-32 mt-3"/>
            </>:
            <>
              <div className="h-32 mt-3"/>
              <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
                  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="font-montserrat">Loading...</span>
              </div>
              <div className="h-32 mt-3"/>
            </>}
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