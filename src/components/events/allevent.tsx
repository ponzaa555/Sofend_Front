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


  const colorChange = () => {
    const inputValue = selectedtag

    if(inputValue !== ""){
      return "bg-black text-white"
    }
    else{
      return "bg-white text-white"
    }
}


  useEffect(() => {
    var filteredData = filteredbytag(filteredEvents)
    setFilteredEvents(filteredData)
    colorChange
  },[selectedtag])

  //

  return (
    <>
      <div className='flex flex-col justify-center'>
        <h1 className="text-4xl font-montserrat font-bold text-center w-1/4 py-4">ALL EVENT</h1>
      </div>
      <div className='flex flex-col items-center'>
        <div className='w-5/6 flex justify-start gap-4'>
          <button className={`border border-black rounded-full px-2 hover:bg-black hover:text-white`} value="Exhibition" onClick={handleclicktag}>Exhibition</button>
          <button  className ={`border border-black rounded-full px-2 hover:bg-black hover:text-white`} value="Concert" onClick={handleclicktag} >Concert</button>
          <button  className= {`border border-black rounded-full px-2 hover:bg-black hover:text-white`} value="Festival" onClick={handleclicktag}>Festival</button> 
          <button  className = {`border border-black rounded-full px-2 hover:bg-black hover:text-white`} value="Show" onClick={handleclicktag}>Show</button>
        </div>
        <div className='grid  grid-cols-4 grid-rows-2  gap-0'>
        {filteredEvents.map((eventcard) => (
          <Card image={eventcard.image} date={eventcard.date} name={eventcard.name} place={eventcard.place} />
        ))}
        </div>
      </div>
    </>
  )
}

export default allevent
