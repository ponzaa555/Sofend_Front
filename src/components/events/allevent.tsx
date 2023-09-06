import React, {useState,useEffect}from 'react'
import Data from "../../data/Eventcards.json"
import Card from './eventcard'


const allevent = () => {

  const[selectedtag,setSelectedtag] = useState("")
  const[filteredEvents,setFilteredEvents] = useState(Data)
  console.log(filteredEvents)

  //set color tag
  const defaultcolor = `border border-black rounded-full px-3 py-2 hover:bg-black hover:text-white`
  const[colortag_ex,setColortag_Exhibition] = useState(defaultcolor)
  const[colortag_c,setColortag_Concert] = useState(defaultcolor)
  const[colortag_f,setColortag_Festival] = useState(defaultcolor)
  const[colortag_s,setColortag_Show] = useState(defaultcolor)

  const alltag = ["Exhibition","Concert","Festival","Show"]


  const filteredbytag = (filteredEvents:object) => {
    if(!selectedtag){
      return filteredEvents;
    }

    const filteredE = filteredEvents.filter((E) => E.tag===selectedtag);
      console.log("filtered")
      return filteredE
  }
  var filteredEvent1 = filteredEvents.filter((event,index)=> {
    if(index<8){
      return true
    }
  })


  const handleclicktag = (e:any) => {
    const inputtag = String(e.target.value)

    console.log("inputtt ",inputtag)

    if(inputtag === selectedtag){
      setSelectedtag("")
      console.log("back to default")
      setFilteredEvents(Data)

      //set color tag to default
      eval("setColortag_"+inputtag)(defaultcolor)

    }else{
      setSelectedtag(inputtag)

      //set color tag to selected
      alltag.filter((tag) => tag !== inputtag).map((tag) => {
        eval("setColortag_"+tag)(defaultcolor)
      })
      eval("setColortag_"+inputtag)(`border border-black rounded-full px-3 py-2 bg-black text-white`)
    }

  }

  useEffect(() => {
    var filteredData = filteredbytag(filteredEvents)
    setFilteredEvents(filteredData)
  },[selectedtag])
  

  //

  return (
    <>
      <div className=' flex inline-block'>
        <h1 className="text-4xl font-montserrat font-bold  ml-5">ALL EVENT</h1>
        <div className='flex flex-auto justify-end'>
          <button className='text-xl font-montserrat font-bold  ml-5 ' value="show">ViewAll</button>
        </div>
      </div>
      <div className='flex flex-col '>
        <div className=' flex gap-4 ml-4'>
          <button className={colortag_ex} value="Exhibition" onClick={handleclicktag}>Exhibition</button>
          <button  className ={colortag_c} value="Concert" onClick={handleclicktag} >Concert</button>
          <button  className= {colortag_f} value="Festival" onClick={handleclicktag}>Festival</button> 
          <button  className = {colortag_s} value="Show" onClick={handleclicktag}>Show</button>
        </div>
        <div id='2row5col' className='grid  grid-cols-4 grid-rows-2 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 '>
        {filteredEvent1.map((eventcard) => (
          <Card image={eventcard.image} date={eventcard.date} name={eventcard.name} place={eventcard.place} />
        ))}
        </div>
      </div>
    </>
  )
}

export default allevent