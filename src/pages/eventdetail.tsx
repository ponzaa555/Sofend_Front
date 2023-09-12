import React, { use } from 'react';
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
import { TicketClass } from '~/components/events/eventitem';
import Head from "next/head";
import { number, set } from 'zod';

const EventDetails = () => {
    const ref = useRef<null | HTMLDivElement>(null);

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };  

    const [countVIP,setCountVIP] = useState(0);

    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const [eventDetail, setEventDetail] = useState({
        "eventID": "79b7ddc5",
        "eventName": "GARNiDELiA stellacage 2023 -stella ship- Reconnect in Bangkok",
        "startDateTime": "2023-09-16T11:00:00",
        "endDateTime": "2023-09-16T15:00:00",
        "onSaleDateTime": "2023-06-02T17:00:00",
        "endSaleDateTime": "2023-09-16T15:00:00",
        "location": "Centerpoint Entertainment : เซ็นเตอร์พ้อยท์ สตูดิโอ",
        "info": "a concert from J-Pop Anisong duo unit with EDM dance music that incorporate with dazzling Japanese tradition culture style  🇯🇵\nthat reached No.1 chart in BiliBili an QQ music in China 🇨🇳 \nwith their\n[ Gokuraku Jodo] 極楽浄土 that many people used  and applied in many cover dances contests in China.\n\nGARNiDELiA also provided anime songs for many anime blockbusters like Kill la Kill , Mahouka koukou no rettousei ,  Fate Apocrypha ,and etc.\nThis will be their first tour in 4 years after COVID-19.\n[ GARNiDELiA stellacage 2023 -stella ship- Reconnect ] World Tour\n\nThey will perform their blockbuster songs to Reconnect with fans around the world.\nDon't miss it if you are the fans of EDM that fusion seamlessly with Japanese culture and anisongs.",
        "featured": true,
        "eventStatus": "On-going",
        "tagName": [
          "Concert"
        ],
        "posterImage": "https://p-u.popcdn.net/event_details/posters/000/014/901/large/6d86c3a5a56f3d5063610341cdba54571a1152b2.png?1692183338",
        "seatImage": "[\n  {\n  Zone: \"https://p-u.popcdn.net/attachments/images/000/041/657/large/Stage_Zone02.png?1681028940\"\n  }\n]",
        "staff": [],
        "ticket": [],
        "ticketType": "Classed",
        "ticketClass": [
          {
            "amountOfSeat": 50,
            "className": "VVIP ( Regular )",
            "pricePerSeat": 4400,
            "seatNo": []
          },
          {
            "amountOfSeat": 50,
            "className": "VIP ( Regular )",
            "pricePerSeat": 3700,
            "seatNo": []
          },
          {
            "amountOfSeat": 50,
            "className": "General Audience ( GA ) ( Regular )",
            "pricePerSeat": 2600,
            "seatNo": []
          }
        ],
        "organizerName": "Real Live Entertainment Company Limited"
      })

    const ticketClassElements : TicketClass[] = eventDetail.ticketClass;
    
    const daystart = eventDetail.startDateTime.split(/[T-]/)[2]
    const dayend = eventDetail.endDateTime.split(/[T-]/)[2]
    const monthstart = eventDetail.startDateTime.split(/[T-]/)[1]
    const monthend = eventDetail.endDateTime.split(/[T-]/)[1]
    const yearstart = eventDetail.startDateTime.split(/[T-]/)[0]
    const yearend = eventDetail.endDateTime.split(/[T-]/)[0]

    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const starttime = eventDetail.startDateTime.split(/[T-]/)[3]
    const endtime = eventDetail.endDateTime.split(/[T-]/)[3]
    console.log(starttime)

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

    const [listCount,setlistCount] = useState([{
        name:"",
        price:0,
        count:0
    }]);

    /*console.log(eventDetail.ticketClass.map(item => ({
        name:  item.className,
        count: 0
    })))*/

    useEffect(() => {
        if (id) {
          axios.get(`https://eventbud-jujiu2awda-uc.a.run.app/event/${id}`)
            .then((res) => {
              setEventDetail(res.data);
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
    

    const ticketClasses = eventDetail.ticketClass;
    const updateListCount = (nlistCount:any) => {
          setlistCount(nlistCount)
        }
    
    //add count to listCount

    const [Zone, setZone] = useState("");
    const [isSelect,setSelect] = useState(false);
    const [Total,setTotal] = useState(0);
    const [Price,setPrice] = useState(0);
    let items = 0;
    let prices = 0;
    let pp = 0;

    const handleButtonClick = (index, newValue) => {
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
            let item = listCount[i];
            items += item?.count
        }
        setTotal(items)

        for (let i = 0; i < listCount.length; i++) {
            let item = listCount[i];
            prices += (item?.price)*(item?.count)
        }
        setPrice(prices)
      }

    /*console.log(Total)
    console.log(Price)*/

    /*for (let i = 0; i < listCount.length; i++) {
        let item = listCount[i];
        console.log(`Index ${i}: ${item?.count}`);
        console.log(`Index ${i}: ${item?.price}`);
        
    }
    
    console.log("Listc",listCount);
    console.log("Zone",Zone);
    console.log("isSelect",isSelect);*/

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
                                    <div className='text-black font-montserrat text-xl mb-3'>{eventDetail.startDateTime.split(/[T-]/)[3]}-{eventDetail.endDateTime.split(/[T-]/)[3]}</div>
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
                                    <line x1="5" y1="4.37114e-08" x2="5" y2="10" stroke={countVIP>0 ? "#696969":"#FFF"} stroke-width="2" />
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
                            <button disabled={Total===0} className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold py-2 rounded mt-2 mb-2 box-content w-full disabled:bg-slate-50 disabled:text-slate-200 disabled:border-slate-200 disabled:shadow-none">Check out</button>
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
        </>
    )

}
export default EventDetails;