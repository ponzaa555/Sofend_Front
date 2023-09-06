import React,{useEffect,useState}from 'react'
import Card from './eventcard'
import Eventcards from '../../data/MOCK_DATA.json'

for (const event of Eventcards){
  console.log(event)
}
const reccommend = Eventcards.filter((event)=>event.featured === true )
let recE = reccommend.filter((event,index) =>{
  if (index <5){
    return true
  }
})

const recommendevent = () => {

  return (
    <div className='flex flex-col '>
      <div className="text-4xl font-montserrat font-bold ml-5 py-4">Recommend Event</div>
      <div className="grid grid-cols-6 md:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 place-content-center p-3">
        {recE.map((eventcard) => (
          <a href= "/event" className="">
          <Card image={eventcard.image} date={eventcard.date} name={eventcard.name} place={eventcard.place} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default recommendevent