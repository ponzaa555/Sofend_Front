import React,{useEffect,useState}from 'react'
import Card from './eventcard'
import Eventcards from '../../data/MOCK_DATA.json'

const recommendevent = () => {

  return (
    <div className='flex flex-col justify-center'>
      <div className="text-4xl font-montserrat font-bold text-center w-1/3 py-4">Recommend Event</div>
      <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 place-content-center p-3">
        {Eventcards.filter((eventcard) => eventcard.featured === true).map((eventcard) => (
          <a href= "/event" className="">
          <Card image={eventcard.image} date={eventcard.date} name={eventcard.name} place={eventcard.place} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default recommendevent