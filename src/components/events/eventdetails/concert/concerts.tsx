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

const EventDetail = ({}) => {
    const ref = useRef<null | HTMLDivElement>(null);


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
                                <div className='text-white font-montserrat font-medium text-xl mb-5'>concert</div>
                                <div className='text-white font-kanit font-bold text-2xl mb-20'>จิ้มกันให้ YUPP</div>
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
                <div className=' text-black font-montserrat font-bold mb-5 text-2xl'>Info</div>
                <div className='font-kanit text-center'>
                เตรียมตัวเดือด! กับการรวมตัวความต่าง 2 ขั้ว
ในคอนเสิร์ต จิ้นกันให้ YUPP!

จิ้นกันให้ YUPP! ชวนคุณมาเดือดในคอนเสิร์ตที่รวมความต่างจาก 2 ขั้ว ระหว่างค่าย YUPP! ที่มีศิลปินรุ่นใหม่ไฟแรงหลากหลายแนว นำทีมโดย MILLI, MAIYARAP, AUTTA, NAMEMT, Flower.far, GeniePak, AINN, FIZZIE และ GALCHANIE กับเหล่าคู่ซี้สุดฮอตกระแสแรงเกินต้านอย่าง หยิ่นวอร์, คูเปอร์ปอย, บอสโนอึล, เซฟจี และบุ๋นเปรม

จาก 2 ขั้วความต่าง ทำให้นึกถึงยุครุ่งเรืองของศิลปะอย่างเรเนซองส์ และยุคมืดอย่างดิสโธเปีย นำมาสู่ Concept ของคอนเสิร์ตครั้งนี้ Dark Renaissance เปรียบเสมือนกับศิลปินจากค่าย YUPP! และเหล่าคู่ซี้เป็นผลงานศิลปะที่มีความต่างสุดขั้ว แต่มารวมกันได้อย่างลงตัวภายใต้ธีม Blend The Difference

เตรียมตัวพบความยิ่งใหญ่ที่แตกต่าง น่าค้นหา กับโชว์สุดเดือด ไม่เหมือนโชว์ที่ทุกด้อมเคยเห็นมาในคอนเสิร์ต จิ้นกันให้ YUPP! เจอกัน 2 กันยายน 2566 เวลา 19.00 น. ที่ ธันเดอร์โดม สเตเดียม เมืองทองธานี

เปิดจำหน่ายบัตร 8 กรกฎาคม 2566 เวลา 10.00 น.

บัตรราคา
6,500.- / 5,500.- / 5,000.- / 4,500.- / 3,500.- / 3,000.- / 2,000.-

หมายเหตุ
- ราคาบัตรยังไม่รวมค่าธรรมเนียมออกบัตร ค่าบริการ และค่าธรรมเนียมชำระเงิน
- จำกัดจำนวนการซื้อบัตรไม่เกิน 4 ใบต่อ 1 คำสั่งซื้อ

ติดตามรายละเอียดอื่นๆ เพิ่มเติมได้ที่ Facebook : Sukan และ Twitter : sukanofficial
                </div>
                <img src='https://res.theconcert.com/c_thumb/1c7a110a7c912ae338a0c63992d9fa13f/fan1-d2-thai.jpg'></img>
            </div>
            <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <h1 className=' text-black font-montserrat font-bold mb-5 text-2xl'>Ticket</h1>
                {/* zone selction */}
                <div className='grid grid-cols-3 gap-y-8'>
                    <Link href='/' className='flex flex-row w-fit gap-2'>
                        <svg height="50" width="50">
                            <circle cx="25" cy="25" r="21" fill="red" />
                        </svg>
                        <div className='font-montserrat font-bold flex flex-col justify-start'>
                            <h1 className={``}>Red Zone-6,500฿</h1>
                            <h2 className={`text-green-500`}>Available</h2>
                        </div>
                    </Link>
                    <Link href='/' className='flex flex-row w-fit gap-2'>
                        <svg height="50" width="50">
                            <circle cx="25" cy="25" r="21" fill="Blue" />
                        </svg>
                        <div className={`font-montserrat font-bold flex flex-col justify-start`}>
                            <h1 className={``}>Deep Blue Zone-6,500฿</h1>
                            <h2 className={`text-green-500`}>Available</h2>
                        </div>
                    </Link>
                    <Link href='/' className='flex flex-row w-fit pointer-events-none gap-2'>
                        <svg height="50" width="50">
                            <circle cx="25" cy="25" r="21" fill="Lime" />
                        </svg>
                        <div className='font-montserrat font-bold flex flex-col justify-start'>
                            <h1 className={``}>Green Zone-6,500฿</h1>
                            <h2 className={`text-red-500`}>SOLD OUT</h2>
                        </div>
                    </Link>
                    <Link href='/' className='flex flex-row w-fit pointer-events-none gap-2'>
                        <svg height="50" width="50">
                            <circle cx="25" cy="25" r="21" fill="Magenta" />
                        </svg>
                        <div className='font-montserrat font-bold flex flex-col justify-start'>
                            <h1 className={``}>Pink-6,500฿</h1>
                            <h2 className={`text-red-500`}>SOLD OUT</h2>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='flex justify-center font-montserrat mb-10'>
                <Link href='/eventdetailC2' className='group relative text-white font-bold text-xl inline-block focus:outline-none focus:ring' ref={ref} >
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