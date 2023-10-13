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




  useEffect(() => {
    if (id) {
      axios.get<EventDetail>(`https://eventbud-jujiu2awda-uc.a.run.app/event/${id}`)
        .then((res) => {
          setEventDetail(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const [selectedZone, setSelectedZone] = useState<number>(0)
  const handleSelectZone = (zoneIndex: number) => {
    setSelectedZone(zoneIndex)
  }
  // console.log(eventDetail.ticketClass[0]?.rowNo)



  return (
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
              >
                <option className='font-montserrat' disabled>Zone</option>
                {/*option from ticketClass[i].className */}
                {eventDetail.ticketClass.map((ticketclass,index) => (
                  <option key={index} value={index} className='font-montserrat'>{ticketclass.className}</option>
                  ))  
                }
              </select>
              {/* Seating */}

              <SeatingPlan
                objectOfSeat={eventDetail.ticketClass[selectedZone] ?? {}}
                nameOfZone={eventDetail.ticketClass[selectedZone]?.className ?? ""}
                pricePerSeat={eventDetail.ticketClass[selectedZone]?.pricePerSeat ?? 0}
                numRows={eventDetail.ticketClass[selectedZone]?.rowNo ?? 0}
                numSeatsPerRow={eventDetail.ticketClass[selectedZone]?.columnNo ?? 0}
              />
            </div>

        </div>
        
        
    </div>
  )
}

export default selectzonenseat