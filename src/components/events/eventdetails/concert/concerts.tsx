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
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from "next/head";
import type { TicketClass } from '~/components/events/eventitem';
import { Console } from 'console';
import GenTicketClass from './genTicketClass'



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



const EventDetail = ({}) => {
    const ref = useRef<null | HTMLDivElement>(null);

    const [selectedZone, setSelectedZone] = useState<number>(0)
    const handleSelectZone = (zoneIndex: number) => {
       setSelectedZone(zoneIndex)
    }
    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const router = useRouter();
    const { id } = router.query as { id: string };

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


    // console.log("seatImage",eventDetail.seatImage[0]?.imageURL)


    return(
        <>
            <Navbar/>
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
                                <button className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold py-2 rounded mt-2 mb-2 box-content h-6 w-32 mr-5" onClick={handleClick}>Get Tickets</button>
                            </div>
                    </div>
                </div>
                </div>
                <div className='bg-white'>
                </div>
            </div>
            <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className=' text-black font-montserrat font-bold mb-5 text-2xl'>Info</div>
                <div className='font-kanit text-center'>
                    {eventDetail.info}
                </div>
                <img src={eventDetail.seatImage[0]?.imageURL}></img>
            </div>
            <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <h1 className=' text-black font-montserrat font-bold mb-5 text-2xl'>Ticket</h1>
                {/* zone selction */}
                <div className='grid grid-cols-3 gap-y-8'>
                    {eventDetail.ticketClass.map((ticketclass,index) => (
                        <Link href={"/selectzonenseats/" + id}>
                            <GenTicketClass
                                key={index}
                                nameOfZone={ticketclass.className}
                                pricePerSeat={ticketclass.pricePerSeat}
                                amountOfSeat={ticketclass.AmountOfSeat}
                                onSelect = {() => {handleSelectZone(index)}} 
                            ></GenTicketClass>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex justify-center font-montserrat mb-10'>
                <Link href={'/selectzonenseats/'+id} className='group relative text-white font-bold text-xl inline-block focus:outline-none focus:ring' ref={ref} >
                <span
                    className="absolute inset-0 border border-black group-active:border-black rounded-md"
                ></span>
                <span
                    className="block border border-black bg-black rounded-md px-12 py-3 transition-transform active:border-black active:bg-white active:text-black group-hover:-translate-y-2"
                >
                    select Zone and Seats
                </span>
                </Link>
            </div>
            
            <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className='flex justify-between items-center border-2 border-gray-300 rounded-xl'>
                    <div className='flex'>
                        <div className="w-20 h-20 overflow-hidden rounded-full border border-gray-300 mb-2 mt-2 ml-5">
                            <img src='https://s-media-cache-ak0.pinimg.com/originals/45/8b/be/458bbe24f9c6f35c2148e30a926976c8.jpg'/>
                        </div>
                        <div className='flex flex-col'>
                            <div className='text-black font-montserrat ml-5 mt-5 '>Organized by</div>
                            <div className='text-black font-montserrat font-bold text-xl ml-5 mb-5'>{eventDetail.organizerName}</div>
                        </div>
                    </div>
                    <Modal organizerName={eventDetail.organizerName}></Modal>
                </div>
            </div>
            <div className='justify-center bg-white p-4'>
                <h1 className='text-center text-black font-montserrat font-bold'>EventBud</h1>
            </div>
        </>
    )

}
export default EventDetail;