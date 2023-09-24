import React, {useState,useEffect, use}from 'react'
import { getAllEvent } from '../../service/api'
import Card from './eventcard'
import { set } from 'zod'


const allevent = () => {
  const[selectedtag,setSelectedtag] = useState("")
  const[filteredEvents,setFilteredEvents] = useState([])
  const[Data,setData] = useState([])
  const[getfinish,setFinish] = useState(false)

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
  const disabledcolorviewall = `text-xl text-gray-400 font-montserrat font-bold  ml-5 `
  const[colorveiwall,setColorviewall] = useState(defaultcolorviewall)
  const [disabledv, setDisabledv] = useState(false);


  //fetch all event from api
  useEffect(() => {
    getAllEvent()
      .then(data => {
        setFilteredEvents(data);
        setFinish(true);
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
    }
    else{
      setDisabledv(false)
      if(colorveiwall === disabledcolorviewall)
        setColorviewall(defaultcolorviewall)
      else
        setColorviewall(colorveiwall)
    }
  },[filteredEvents])

  const addevent= (filteredEvent1:any) => {
    if ((filteredEvent1.length) > 0) {
      return (
        <div id='2row5col' className='grid  grid-cols-5 grid-row-2 md:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 '>
          {filteredEvent1.map((eventcard, index) => (
              <a key = {index} href= {"/eventdetail/"+eventcard.eventID} className="col-span-1 w-52">
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
        {getfinish == true ? 
          <>
            <div className="h-64 mt-3"/>
            <div className="h-32"/>
            <div className="h-64">
              <div className="text-4xl h-48 flex items-center justify-center font-montserrat font-medium">No Event</div>
            </div>
            <div className="h-32"/>
            <div className="h-64 mt-3"/>
          </>:
          <>
            <div className="h-64 mt-3"/>
            <div className="h-32"/>
            <div className="h-64">
              <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
                  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="font-montserrat">Loading...</span>
              </div>
            </div>
            <div className="h-32"/>
            <div className="h-64 mt-3"/>
          </>}
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