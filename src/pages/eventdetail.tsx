import React from 'react';
import Navbar from '../components/navbar'
import Modal from '../components/modal/modal'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Clock from '~/components/icon/Clock';
import Location from '~/components/icon/Location';
import Calendar from '~/components/icon/Calendar';
import { useRouter } from 'next/router';
import Head from "next/head";
import type { TicketClass } from '~/components/events/eventitem';
import { Console } from 'console';
import Link from 'next/link';

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

type ForListCount = {
    name: string;
    price: number;
    count: number;
}

const EventDetails = ({}) => {


    const ref = useRef<null | HTMLDivElement>(null);

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
            <div className="">{parseInt(timestart)+7}:{eventDetail.startDateTime.split(/[T-]/)[3]?.split(/[:]/)[1]}-{parseInt(timeend)+7}:{eventDetail.endDateTime.split(/[T-]/)[3]?.split(/[:]/)[1]}</div>
        )
    }

    const [listCount,setlistCount] = useState<ForListCount[]>([{
        name:"",
        price:0,
        count:0
    }]);

    useEffect(() => {
        if (id) {
          axios.get<EventDetail>(`https://eventbud-jujiu2awda-uc.a.run.app/event/${id}`)
            .then((res) => {
              setEventDetail(res.data);
              setgetfinish(true)
              setlistCount(res.data.ticketClass.map(item => ({
                name: item.className,
                price : item.pricePerSeat,
                count:0,
              })))
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, [id]);
    
    //add count to listCount

    const [Zone, setZone] = useState("");
    const [isSelect,setSelect] = useState(false);
    const [Total,setTotal] = useState(0);
    const [Price,setPrice] = useState(0);
    const [getfinish, setgetfinish] = useState(false);

    let items = 0;
    let prices = 0;

    const handleButtonClick = (index: number, newValue: number) => {
        const updatedListCount = [...listCount];
        updatedListCount[index].count = newValue;
        setlistCount(updatedListCount);
        if(updatedListCount[index].count===0){
            setZone("");
            setSelect(false);
        }
        else{
            setZone(updatedListCount[index].name);
            setSelect(true);
        }
        for (let i = 0; i < listCount.length; i++) {
            const item = listCount[i] as ForListCount;
            items += item.count
        }
        setTotal(items)

        for (let i = 0; i < listCount.length; i++) {
            const item = listCount[i] as ForListCount;
            prices += (item.price)*(item.count)
        }
        setPrice(prices)
      }
    
    const data = { 
        eventName: eventDetail.eventName,
        startDateTime: eventDetail.startDateTime,
        endDateTime: eventDetail.endDateTime,
        posterImage: eventDetail.posterImage,
        location : eventDetail.location,
        zone: Zone,
        amount: Total,
        price: Price,
    }
    const dataString = encodeURIComponent(JSON.stringify(data));

    return(
        <>
            <Head>
                {/* import font to page */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
            </Head>
            <Navbar/>
            {getfinish == true ? 
            <>
                <div className='flex flex-col mb-32'>
                    <div style={{backgroundImage: `url(${eventDetail.posterImage})`}} className={`h-56 mb-20 bg-no-repeat bg-cover relative backdrop-blur-md bg-blend-color-burn bg-gray-300`}>
                    <div className="backdrop-blur-md h-56 relative"></div> 
                        <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                            <div className='flex flex-row justify-center absolute -top-0'>
                                <div className='w-60 h-60 mb-10 mt-20'>
                                    <img className={`border-gray-300 rounded-md`} src={eventDetail.posterImage} />
                                </div>
                                <div className='ml-16 mt-20'>
                                    <div className='text-white font-montserrat text-xl mb-5'>{eventDetail.tagName}</div>
                                    <div className='text-white font-kanit font-bold text-2xl mb-24'>{eventDetail.eventName}</div>
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
                    <div className='bg-white mb-10'>
                    </div>
                </div>
                <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                    <div className=' text-black font-montserrat font-bold mb-5 text-2xl'>Info</div>
                    <div className='font-kanit text-center'>{eventDetail.info}</div>
                </div>
                <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                    <div className=' text-black font-montserrat font-bold mb-5 text-2xl' ref={ref}>Ticket</div>
                        <div className='flex flex-row justify-between gap-5'>
                            <div className="basis-3/5">
                                <div className='flex flex-col gap-5'>
                                {listCount.map((item,index) => (
                                    <div key={index}>
                                    <div className='grid grid-cols-6 justify-around border-2 border-gray-300 rounded-md place-items-center px-5'>
                                        <span className='col-span-2 text-center font-montserrat'>{item.name}</span>
                                        <span className='font-montserrat font-bold'>{item.price} ฿</span>
                                        <button onClick={() => handleButtonClick(index, item.count - 1)} disabled={item.count==0} className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold rounded my-2 box-content py-2.5 px-1.5 text-center disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" type="submit">
                                        <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line y1="1" x2="10" y2="1" stroke={item.count==0 ? "#696969":"#FFF"} stroke-width="2" className="icon" />
                                        </svg></button>
                                        <span>{item.count}</span>
                                        <button onClick={() => handleButtonClick(index, item.count + 1)} disabled={Zone!=item.name && isSelect} className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold rounded box-content  p-1.5 mr-5 text-center disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" type="submit">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                                        <line x1="5" y1="4.37114e-08" x2="5" y2="10" stroke={Zone!=item.name && isSelect ? "#696969":"#FFF"} stroke-width="2" />
                                        <line y1="5" x2="10" y2="5" stroke={Zone!=item.name && isSelect ? "#696969":"#FFF"} stroke-width="2" />
                                        </svg></button>
                                    </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className="basis-2/4">
                                <div className=' border-2 border-gray-300 rounded-md'>
                                <div className='flex flex-col'>
                                    <div className='grid grid-cols-2 place-items-center mt-5 mb-5'>
                                        <div className='font-montserrat text-xl'>Total</div>
                                        <div className='font-montserrat'>{Total} items</div>
                                    </div>
                                    <hr className='border-[1.5px] border-gray-300 mx-8'></hr>
                                    <div className='grid grid-cols-2 place-items-center mt-5 mb-5'>
                                        <div className='font-montserrat font-bold texl-xl'>{Price}</div>
                                        <div className='font-montserrat font-bold text-xl'>฿</div>   
                                    </div>
                                </div>
                                </div>
                                <Link href={`/checkout?data=${dataString}`}>
                                    <button disabled={Total===0} className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold py-2 rounded mt-2 mb-2 box-content w-full disabled:bg-slate-50 disabled:text-slate-200 disabled:border-slate-200 disabled:shadow-none">Check out</button>
                                </Link>
                            </div>
                        </div>
                </div>
                <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                    <div className='flex justify-between items-center border-2 border-gray-300 rounded-md'>
                        <div className='flex'>
                            <div className="w-20 h-20 overflow-hidden rounded-full border border-gray-300 mb-2 mt-2 ml-5">
                                <img src='../images/events/profile.png'/>
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
            </>:
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
export default EventDetails;