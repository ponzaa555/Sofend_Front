import React from 'react';
import Navbar from '~/components/navbar';
import Modal from '~/components/modal/modal';
import { useRef } from 'react';
import Image from 'next/image'
import { useState } from 'react';
import Clock from '~/components/icon/Clock';
import Location from '~/components/icon/Location';
import Calendar from '~/components/icon/Calendar';
import Link from 'next/link';
import SeatingPlan from './seatingPlan';
import GenTicketClass from './genTicketClass';
import type { TicketClass } from '~/components/events/eventitem';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { set } from 'zod';


type EventDetail = {
  eventID: string;
  eventName: string;
  startDateTime: string;
  endDateTime: string;
  onSaleDateTime: string;
  endSaleDateTime: string;
  location: string;
  info: string;
  featured: boolean;
  eventStatus: string;
  tagName: string[];
  posterImage: string;
  seatImage: string[];
  staff: string[];
  ticket: string[];
  ticketType: string;
  ticketClass: TicketClass[];
  organizerName: string;
}

const selectzonenseat = () => {
  let [quantity, setQuantity] = useState(1)
  const [isdisabled, setDisabled] = useState(false)

  const [eventDetail, setEventDetail] = useState<EventDetail>({
    eventID: "",
    eventName: "",
    startDateTime: "",
    endDateTime: "",
    onSaleDateTime: "",
    endSaleDateTime: "",
    location: "",
    info: "",
    featured: false,
    eventStatus: "",
    tagName: [],
    posterImage: "",
    seatImage: [],
    staff: [],
    ticket: [],
    ticketType: "",
    ticketClass: [],
    organizerName: "",
  })

  const router = useRouter();
  const { id } = router.query as { id: string };

  const daystart = eventDetail.startDateTime.split(/[T-]/)[2] as string
    const dayend = eventDetail.endDateTime.split(/[T-]/)[2] as string
    const monthstart = eventDetail.startDateTime.split(/[T-]/)[1] as string
    const monthend = eventDetail.endDateTime.split(/[T-]/)[1] as string
    const yearstart = eventDetail.startDateTime.split(/[T-]/)[0] as string
    const yearend = eventDetail.endDateTime.split(/[T-]/)[0] as string

    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]


    const checkdate = () => {
        if(daystart === dayend && monthstart === monthend && yearstart === yearend){
        return(
            <div className="">{parseInt(daystart)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)}</div>
        )
        }else if(monthstart === monthend && yearstart === yearend && daystart !== dayend){
        return(
            <div className="">{parseInt(daystart)} - {parseInt(dayend)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)}</div>
        )
        }else if(yearstart === yearend && monthstart !== monthend){
        return(
            <div className="">{parseInt(daystart)} {month[parseInt(monthstart)-1]} - {parseInt(dayend)} {month[parseInt(monthend)-1]} {parseInt(yearstart)}</div>
        )
        }else{
        return(
            <div className="">{parseInt(daystart)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)} - {parseInt(dayend)} {month[parseInt(monthend)-1]} {parseInt(yearend)}</div>
        )
        }
    }

    const timestart = eventDetail.startDateTime.split(/[T-]/)[3]?.split(/[:]/)[0] as string
    const timeend = eventDetail.endDateTime.split(/[T-]/)[3]?.split(/[:]/)[0] as string


    const checktime = () => {
        return(
            <div className="">{parseInt(timestart)}:{eventDetail.startDateTime.split(/[T-]/)[3]?.split(/[:]/)[1]}-{parseInt(timeend)}:{eventDetail.endDateTime.split(/[T-]/)[3]?.split(/[:]/)[1]}</div>
        )
    }
  
  const [getfinish, setFinish] = useState(false)

  useEffect(() => {
    if (id) {
      axios.get<EventDetail>(`http://127.0.0.1:8000/event/${id}`)
        .then((res) => {
          setEventDetail(res.data);
          setFinish(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const [selectedZone, setSelectedZone] = useState<number>(-1)
  const handleSelectZone = (zoneIndex: number) => {
    setSelectedZone(zoneIndex)
  }
  // console.log(eventDetail.ticketClass[0]?.rowNo)

  console.log("eventdetail",eventDetail.zoneRevenue)

  const checkIsFull = (index:number) => {
    if (eventDetail.zoneRevenue[index]?.quota - eventDetail.zoneRevenue[index].ticketSold > 0){
      //console.log("full")
      return true
    }
    else{
      //console.log("not full")
      return false
    }
  }




  return (
    <>
    {getfinish == true ?
    <>
    <div className='mb-10'>
      <div className='flex flex-col mb-32'>
        <div style={{backgroundImage: `url(${eventDetail.posterImage})`}} className={`h-56 mb-20 bg-no-repeat bg-cover relative backdrop-blur-md bg-blend-color-burn bg-gray-300`}>
            <div className="backdrop-blur-md h-56 relative"></div>
                    <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                        <div className='flex flex-row justify-center absolute -top-0'>
                          <div className='w-60 h-60 mb-10 mt-20'>
                              <img className={`border-gray-300 rounded-md`} src={eventDetail.posterImage} />
                          </div>
                        <div className='ml-16 mt-20'>
                          <div className='text-white font-montserrat font-medium text-xl mb-5'>{eventDetail.tagName}</div>
                            <div className='text-white font-kanit font-bold text-2xl mb-20'>{eventDetail.eventName}</div>
                              <div className='flex justify-items-center gap-2'>
                                  <Calendar></Calendar>
                                  <div className='text-black font-montserrat text-xl mb-3'>{checkdate()}</div>
                              </div>
                              <div className='flex justify-items-center gap-2'>
                                  <Clock></Clock>
                                  <div className='text-black font-montserrat text-xl mb-3'>{checktime()}</div>
                              </div>
                              <div className='flex justify-items-center gap-2'>
                                  <Location></Location>
                                  <div className='text-black font-montserrat text-xl mb-3'>{eventDetail.location}</div>
                              </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div className='bg-white'>
          </div>
      </div>
      <div className=''>
      <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
          <h1 className=' text-black font-montserrat font-bold mb-5 text-2xl'>Select Zone</h1>
                {/* zone selction */}
                <div className='grid grid-cols-3 gap-y-8 justify-items-center'>
                    {eventDetail.ticketClass.map((ticketclass,index) => (
                        <GenTicketClass
                            key={index}
                            nameOfZone={ticketclass.className}
                            pricePerSeat={ticketclass.pricePerSeat}
                            amountOfSeat={ticketclass.AmountOfSeat}
                            isAvailable={checkIsFull(index)}
                            onSelect={() => handleSelectZone(index)}
                        ></GenTicketClass>
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center gap-20'>
              <select 
                className='h-12 border-2 border-black rounded-md font-montserrat text-xl font-bold'
                onChange={(e) => {
                  setSelectedZone(parseInt(e.target.value))
                }}
                value={selectedZone}
                defaultValue={selectedZone}
              >
                <option className='font-montserrat'>Zone</option>
                {/*option from ticketClass[i].className */}
                {eventDetail.ticketClass.map((ticketclass,index) => (
                  <option 
                    key={index} 
                    value={index} 
                    className='font-montserrat'
                    // disabled={!checkIsFull(index)}
                  >{ticketclass.className}</option>
                  ))  
                }
              </select>
              {/* Seating */}

              <SeatingPlan
                eventID={eventDetail.eventID}
                eventName={eventDetail.eventName}
                startDateTime={eventDetail.startDateTime}
                endDateTime={eventDetail.endDateTime}
                posterImage={eventDetail.posterImage}
                location= {eventDetail.location}
                objectOfSeat={eventDetail.ticketClass[selectedZone] ?? {}}
                nameOfZone={eventDetail.ticketClass[selectedZone]?.className ?? ""}
                pricePerSeat={eventDetail.ticketClass[selectedZone]?.pricePerSeat ?? 0}
                numRows={eventDetail.ticketClass[selectedZone]?.rowNo ?? 0}
                numSeatsPerRow={eventDetail.ticketClass[selectedZone]?.columnNo ?? 0}
              />
            </div>
        </div>
    </div>
    </> :
    <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="font-montserrat">Loading...</span>
    </div>}
    </>

  )
}

export default selectzonenseat
