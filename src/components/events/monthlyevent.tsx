import React , {useEffect, useState} from 'react'
import Card from './eventcard'
// import Next from './next'
import { date } from 'zod'
import MaterialSymbolsArrowBackIosNew from '../icon/PreButton'
import MaterialSymbolsArrowForwardIos from '../icon/ForwardButton'

const Eventcards = [
  {
      id: 1,
      name: 'The World of Studio Ghibli\'s Animation',
      place: 'Central World',
      date: '2021.01.01',
      time: '10:00 ~ 18:00',
      image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
      featured: true,
      tag: 'exhibition', //exhibition,event,concert
  },
  {
      id: 2,
      name: 'Crybaby Everybody',
      place: '서울시 강남구',
      date: '2021.02.01',
      time: '10:00 ~ 18:00',
      image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
      featured: true,
      tag: 'exhibition', //exhibition,event,concert
  },
  {
    id: 3,
    name: 'The World of Studio Ghibli\'s Animation',
    place: 'Central World',
    date: '2021.03.01',
    time: '10:00 ~ 18:00',
    image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
    featured: true,
    tag: 'exhibition', //exhibition,event,concert
},
{
  id: 4,
  name: 'The World of Studio Ghibli\'s Animation',
  place: 'Central World',
  date: '2021.04.01',
  time: '10:00 ~ 18:00',
  image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
  featured: true,
  tag: 'exhibition', //exhibition,event,concert
},
{
  id: 5,
  name: 'The World of Studio Ghibli\'s Animation',
  place: 'Central World',
  date: '2021.04.01',
  time: '10:00 ~ 18:00',
  image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
  featured: true,
  tag: 'exhibition', //exhibition,event,concert
},
{
  id: 6,
  name: 'The World of Studio Ghibli\'s Animation',
  place: 'Central World',
  date: '2021.01.01',
  time: '10:00 ~ 18:00',
  image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
  featured: true,
  tag: 'exhibition', //exhibition,event,concert
},
{
  id: 7,
  name: 'The World of Studio Ghibli\'s Animation',
  place: 'Central World',
  date: '2021.01.01',
  time: '10:00 ~ 18:00',
  image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
  featured: true,
  tag: 'exhibition', //exhibition,event,concert
},
{
  id: 8,
  name: 'Crybaby Everybody',
  place: '서울시 강남구',
  date: '2021.02.01',
  time: '10:00 ~ 18:00',
  image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
  featured: true,
  tag: 'exhibition', //exhibition,event,concert
},
{
id: 9,
name: 'The World of Studio Ghibli\'s Animation',
place: 'Central World',
date: '2021.08.01',
time: '10:00 ~ 18:00',
image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
featured: true,
tag: 'exhibition', //exhibition,event,concert
},
{
id: 10,
name: 'The World of Studio Ghibli\'s Animation',
place: 'Central World',
date: '2021.04.01',
time: '10:00 ~ 18:00',
image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
featured: true,
tag: 'exhibition', //exhibition,event,concert
},
{
id: 11,
name: 'The World of Studio Ghibli\'s Animation',
place: 'Central World',
date: '2021.06.01',
time: '10:00 ~ 18:00',
image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
featured: true,
tag: 'exhibition', //exhibition,event,concert
},
{
id: 12,
name: 'The World of Studio Ghibli\'s Animation',
place: 'Central World',
date: '2021.12.01',
time: '10:00 ~ 18:00',
image: 'https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1', //Path
featured: true,
tag: 'exhibition', //exhibition,event,concert
},
]

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
              <div className="text-xl font-montserrat pl-2 text-center">{ArrayMonth[((current-1+12)%12)]}</div>
            </button>
        </div>
        <div className="text-2xl font-montserrat font-bold text-center w-1/3">{ArrayMonth[current]}</div>
        <div className="flex text-2xl font-montserrat font-bold justify-center w-1/3">
          <button onClick={()=>setCurrent((current+1)%12)} className='flex'>
            <div className="text-xl font-montserrat pr-2 text-center">{ArrayMonth[((current+1)%12)]}</div>
            <MaterialSymbolsArrowForwardIos></MaterialSymbolsArrowForwardIos>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 place-content-center p-3">
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