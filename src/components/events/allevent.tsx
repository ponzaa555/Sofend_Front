import React, {useState,useEffect}from 'react'
import Data from "../../data/Eventcards.json"
import Card from './eventcard'


const allevent = () => {

  const[selectedtag,setSelectedtag] = useState("")
  const[filteredEvents,setFilteredEvents] = useState(Data)
  console.log(filteredEvents)

  const filteredbytag = (filteredEvents:object) => {
    if(!selectedtag){
      return filteredEvents;
    }

    const filteredE = filteredEvents.filter((E) => E.tag===selectedtag);
      console.log("filtered")
      return filteredE;
  }





  const handleclicktag = (e:any) => {
    const inputtag = String(e.target.value)

    console.log("inputtt ",inputtag)

    if(inputtag === selectedtag){
      setSelectedtag("")
      console.log("back to default")
      setFilteredEvents(Data)

    }else{
      setSelectedtag(inputtag)
    }

  }


  useEffect(() => {
    var filteredData = filteredbytag(filteredEvents)
    setFilteredEvents(filteredData)
  },[selectedtag])

  //

  return (
    <>
      <h1 className='font-montserrat font-bold text-4xl'>ALL EVENT</h1>
      <div className='flex flex-col items-center'>
        <div className='w-11/12 flex justify-start gap-4'>
          <button className={`border border-black rounded-full px-2 hover:bg-black hover:text-white`} value="Exhibition" onClick={handleclicktag}>Exhibition</button>
          <button  className='border border-black rounded-full px-2'>Concert</button>
          <button  className='border border-black rounded-full px-2'>Festival</button> 
          <button  className='border border-black rounded-full px-2'>Show</button>
        </div>
        <div className='grid grid-cols-4 grid-rows-2'>
        {filteredEvents.map((eventcard) => (
          <Card image={eventcard.image} date={eventcard.date} name={eventcard.name} place={eventcard.place} />
        ))}
        </div>
      </div>
    </>
  )
}

export default allevent