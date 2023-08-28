import React from 'react';
import Navbar from '~/components/navbar';
import Modal from '~/components/modal/modal';
import { useRef } from 'react';
import Image from 'next/image'
import { useState } from 'react';
import Clock from '~/components/icon/Clock';
import Location from '~/components/icon/Location';
import Calendar from '~/components/icon/Calendar';

const EventDetail = ({}) => {
    const ref = useRef(null);

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };


    
    return(
        <>
            <Navbar/>
            <div className='flex flex-col mb-32'>
                <div className="bg-[url('https://pbs.twimg.com/media/FzyTww2aQAE_JAS?format=jpg&name=4096x4096')] h-56 mb-20 bg-no-repeat bg-cover relative backdrop-blur-md">
                <div className="backdrop-blur-md h-56 relative"></div>
                    <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                        <div className='flex flex-row justify-center absolute -top-0'>
                            <div className='w-60 h-60 mb-10 mt-20'>
                                <img className=' border-gray-300 rounded-md' src='https://pbs.twimg.com/media/FzyTww2aQAE_JAS?format=jpg&name=4096x4096'></img>
                            </div>
                            <div className='ml-16 mt-20'>
                                <div className='text-white font-montserrat font-medium text-xl mb-5'>exhibition</div>
                                <div className='text-white font-montserrat font-bold text-2xl mb-20'>THE WORLD OF STUDIO GHIBLI'S ANIMATION EXHIBITION BANGKOK 2023</div>
                                <div className='flex justify-items-center gap-2'>
                                    <Calendar></Calendar>
                                    <div className='text-black font-montserrat text-xl mb-3'>1 July 2023 - 31 December 2023</div>
                                </div>
                                <div className='flex justify-items-center gap-2'>
                                    <Clock></Clock>
                                    <div className='text-black font-montserrat text-xl mb-3'>11:00-21:00</div>
                                </div>
                                <div className='flex justify-items-center gap-2'>
                                    <Location></Location>
                                    <div className='text-black font-montserrat text-xl mb-3'>Central World Bangkok</div>
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
                <div className=' text-black font-montserrat font-bold mb-5'>Info</div>
                <div className='text-center'>ไลฟ์ เนชั่น เทโร ร่วมกับ สตูดิโอจิบลิ และศูนย์การค้าเซ็นทรัลเวิลด์ จัดงานแถลงข่าวเปิดนิทรรศการ THE WORLD OF STUDIO GHIBLI'S ANIMATION EXHIBITION BANGKOK 2023 พร้อมการปรากฏตัวของ ‘โทโทโร่’ และ ‘คาโอนาชิ’ รอให้แฟนๆ เข้าไปสำรวจโลกแห่งจินตนาการกับเหล่าตัวละครในแอนิเมชั่นเรื่องโปรด เริ่ม 1 กรกฎาคมเป็นต้นไป ที่เซ็นทรัลเวิลด์ ไลฟ์ ศูนย์การค้าเซ็นทรัลเวิลด์
                </div>
            </div>
            <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className='flex justify-between items-center border-2 border-gray-300 rounded-md'>
                    <div className='flex'>
                        <div className="w-20 h-20 overflow-hidden rounded-full border border-gray-300 mb-2 mt-2 ml-5">
                            <img src='https://s-media-cache-ak0.pinimg.com/originals/45/8b/be/458bbe24f9c6f35c2148e30a926976c8.jpg'/>
                        </div>
                        <div className='flex flex-col'>
                            <div className='text-black font-montserrat ml-5 mt-5 '>Organized by</div>
                            <div className='text-black font-montserrat font-bold text-xl ml-5 mb-5'>Live Nation Tero</div>
                        </div>
                    </div>
                    <Modal></Modal>
                </div>
            </div>
            <div className='justify-center bg-white p-4'>
                <h1 className='text-center text-black font-montserrat font-bold'>EventBud</h1>
            </div>
        </>
    )

}
export default EventDetail;