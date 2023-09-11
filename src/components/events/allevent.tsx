import React, {useState,useEffect, use}from 'react'
import { getAllEvent } from '../../service/api'
import Card from './eventcard'
import { set } from 'zod'


const allevent = () => {
  const[selectedtag,setSelectedtag] = useState("")
  const[filteredEvents,setFilteredEvents] = useState([])
  const[Data,setData] = useState([])

  //set number of show event
  const defultshow = 10
  const[showall,setShowall] = useState(defultshow)

  //set color button
  const defaultcolor = `text-xl border border-black rounded-full px-3 py-2 hover:bg-black hover:text-white`
  const[colortag_ex,setColortag_Exhibition] = useState(defaultcolor)
  const[colortag_c,setColortag_Concert] = useState(defaultcolor)
  const[colortag_f,setColortag_Festival] = useState(defaultcolor)
  const[colortag_s,setColortag_Show] = useState(defaultcolor)

  const defaultcolorviewall = `text-xl text-gray-400 font-montserrat font-bold  ml-5 hover:text-black`
  const disabledcolorviewall = `text-xl text-gray-400 font-montserrat font-bold  ml-5`
  const[colorveiwall,setColorviewall] = useState(defaultcolorviewall)
  const [disabledv, setDisabledv] = useState(false);


  //fetch all event from api
  useEffect(() => {
    getAllEvent()
      .then(data => {
        setFilteredEvents(data);
        setData(data)
        setDisabledv(data.length <= defultshow)
        if(data.length <= defultshow){
          setColorviewall(disabledcolorviewall)
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const alltag = ["Exhibition","Concert","Festival","Show"]


  const filteredbytag = () => {
    if(!selectedtag){
      return filteredEvents;
    }

    const filteredE = Data.filter((E) => E.tagName.includes(selectedtag));
      console.log("filtered")
      return filteredE
  }

  var filteredE = filteredbytag()

  var filteredEvent1 = filteredE.filter((event,index) =>{
      if(index<showall){
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
      eval("setColortag_"+inputtag)(`text-xl border border-black rounded-full px-3 py-2 bg-black text-white`)
    }
  }

  //set view all button
  const handleviewall = () => {
    if(showall === defultshow){
      setShowall(Data.length)
      setColorviewall(`text-xl font-montserrat font-bold  ml-5 `)
    }else{  
      setShowall(defultshow)
      setColorviewall(defaultcolorviewall)
    }
  }

  useEffect(() => {
    var filteredData = filteredbytag()
    setFilteredEvents(filteredData)
  },[selectedtag])

  useEffect(() => {
    if(filteredEvents.length <= defultshow){
      setDisabledv(true)
      setColorviewall(disabledcolorviewall)
      setShowall(defultshow)
    }else{
      setDisabledv(false)
      setColorviewall(colorveiwall)
    }
  },[filteredEvents])

  const addevent= (filteredEvent1:any) => {
    if ((filteredEvent1.length) > 0) {
      return (
        <div id='2row5col' className='grid  grid-cols-5 grid-row-2 md:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 '>
          {filteredEvent1.map((eventcard, index) => (
              <a key = {index} href= {"/eventdetail/"+eventcard.eventID} className="col-span-1">
              <Card image={eventcard.posterImage} datestart={eventcard.startDateTime} dateend={eventcard.endDateTime} name={eventcard.eventName} place={eventcard.location} />
              </a>        
            ))}
          {/* all emty grid */}
          {(filteredEvent1.length) < (defultshow) && new Array(defultshow - filteredEvent1.length).fill(null).map((_, index) => (
          <div key = {index} className="max-w-ms rounded flex flex-col   mt-4">
            <div className=" w-60 h-96 "/>
            <p className="h-28 mb-3"></p>
          </div>))}
        </div>)
    }else{
      return (
        <div>
          <div className="h-64 mt-3"/>
          <div className="h-32"/>
          <div className="h-64">
          <div className="text-4xl h-48 flex items-center justify-center font-montserrat font-medium">No Event</div>
          </div>
          <div className="h-32"/>
          <div className="h-64 mt-3"/>
        </div>
      )
    }
  }

  return (
    <>
      <div className=' flex inline-block'>
        <h1 className="text-4xl font-montserrat font-medium  ">All Events</h1>
        <div className='flex flex-auto justify-end'>
          <button className={colorveiwall} value="viewall" onClick={handleviewall} disabled={disabledv}>ViewAll</button>
        </div>
      </div>
      <div className='flex flex-col '>
        <div className=' flex gap-4 mt-4 mb-4'>
          <button className={colortag_ex} value="Exhibition" onClick={handleclicktag}>Exhibition</button>
          <button  className ={colortag_c} value="Concert" onClick={handleclicktag} >Concert</button>
          <button  className= {colortag_f} value="Festival" onClick={handleclicktag}>Festival</button> 
          <button  className = {colortag_s} value="Show" onClick={handleclicktag}>Show</button>
        </div>
        {addevent(filteredEvent1)}
      </div>
    </>
  )
}

export default allevent