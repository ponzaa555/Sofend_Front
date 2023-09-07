import React from "react";
import Image from "next/image";
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Component2 = () => {
    return (
        <div className=''>
            <div className='mx-56 pt-5 pb-8'>
                <Image className='' src="/images/events/Timeline2nd.png" width={500} height={500} style={{ width: '100%', height: '100%' }} alt="Timeline1stStep"/>
            </div>
            <div className='font-montserrat mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className='text-2xl font-bold'>
                    <h1>Payment</h1>
                </div>
                <div className='flex flex-row-2 justify-between mt-6 '>
                    <div className='w-8/12 rounded-md'>
                        <div className="border-8 border-[#D9D9D9] rounded-lg mx-10">
                            <div className="border-8 border-black rounded-sm"></div>
                        </div>
                        <div className=''>
                            <div className='bg-white mx-20 px-20 drop-shadow-md'>
                                <div className='text-xl font-kanit font-bold pt-12'>จิ้นกันให้ YUPP!</div>
                                <div className='text-lg font-montserrat pb-1 text-[#9F9F9F]'>Thunder dome stadium, Muang Thong Thani</div>
                                <div className="border-t-4 border-[#BDBDBD] rounded-md my-6"></div>
                                <div className='flex justify-between mb-2'>
                                    <div className='text-black font-montserrat text-lg'>2 September 2023</div>
                                    <div className='text-black font-montserrat text-lg'>19:00-22:00</div>
                                </div>
                                <div className='flex justify-between mb-2'>
                                    <div className='text-black font-montserrat text-xl'>Deep Blue Zone x1</div>
                                    <div className='text-black font-montserrat text-xl'>5,500 ฿</div>
                                </div>
                                <div className='flex justify-start pb-14'>
                                    <div className='text-black font-montserrat text-xl pr-12'>area C1</div>
                                    <div className='text-black font-montserrat text-xl'>seat (เลขที่นั่ง)</div>
                                </div>
                                <div className='flex justify-between pb-14'>
                                    <div className='flex justify-between w-full'>
                                        <div className="">
                                            <div className='text-black font-montserrat text-2xl font-bold pb-6'>Total</div>
                                            <div className='text-black font-montserrat text-2xl font-bold pb-10'>5,500.00</div>
                                            <div className='text-[#838383] font-montserrat text-lg font-bold'>scan QR code to pay</div>
                                        </div>
                                        <div className="">
                                            <div className='text-black font-montserrat text-lg pb-6'>(1 items)</div>
                                            <div className='text-black font-montserrat text-2xl font-bold'>฿</div>
                                        </div>
                                    </div>
                                    <Image className='ml-10' src="/images/events/QR.png" width={500} height={500} style={{ width: '30%', height: '30%' }} alt="Timeline1stStep"/> 
                                </div>
                            </div>
                            <div className='flex mx-20 drop-shadow-md'>
                                <div className="w-0 h-0 
                                    border-l-[40px] border-l-transparent
                                    border-t-[50px] border-t-white
                                    border-r-[40px] border-r-transparent">
                                </div>
                                <div className="w-0 h-0 
                                    border-l-[40px] border-l-transparent
                                    border-t-[50px] border-t-white
                                    border-r-[40px] border-r-transparent">
                                </div> 
                                <div className="w-0 h-0 
                                    border-l-[40px] border-l-transparent
                                    border-t-[50px] border-t-white
                                    border-r-[40px] border-r-transparent">
                                </div>
                                <div className="w-0 h-0 
                                    border-l-[40px] border-l-transparent
                                    border-t-[50px] border-t-white
                                    border-r-[40px] border-r-transparent">
                                </div>
                                <div className="w-0 h-0 
                                    border-l-[40px] border-l-transparent
                                    border-t-[50px] border-t-white
                                    border-r-[40px] border-r-transparent">
                                </div>
                                <div className="w-0 h-0 
                                    border-l-[40px] border-l-transparent
                                    border-t-[50px] border-t-white
                                    border-r-[40px] border-r-transparent">
                                </div> 
                                <div className="w-0 h-0 
                                    border-l-[40px] border-l-transparent
                                    border-t-[50px] border-t-white
                                    border-r-[40px] border-r-transparent">
                                </div>
                                <div className="w-0 h-0 
                                    border-l-[40px] border-l-transparent
                                    border-t-[50px] border-t-white
                                    border-r-[40px] border-r-transparent">
                                </div>  
                            </div>  
                        </div>                     
                    </div>
                    <div className='flex flex-col justify-evenly pl-8 w-4/12 pt-14'>
                        <div className='text-black font-montserrat text-xl mb-3'>To protect your interests, please ensure the information is correct before proceeding with the payment.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Component2