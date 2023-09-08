import React from "react";
import Image from "next/image";
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Component2 = () => {
    return (
        <div className=''>
            {/* timeline steps*/}
            <div className='relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg '>
                <div
                    className="relative z-10 flex text-sm font-medium text-white w-3/4 max-w-4xl m-auto items-center  py-6"
                >   
                    <li
                        className="flex items-center gap-2 p-2"
                    >
                        <span
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#54D260] text-6xl text-center font-montserrat font-bold w-28 h-28`}
                        >1
                        </span>
                    </li>
                    <div className="w-full h-0 border-2 border-green-400 border-dashed"></div>
                    <li
                        className="flex items-center gap-2 p-2"
                    >
                        <span
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#54D260] text-6xl text-center font-montserrat font-bold w-28 h-28`}
                        >2
                        </span>
                    </li>
                    <div className="w-full h-0 border-2 border-green-400 border-dashed"></div>
                    <li
                        className="flex items-center gap-2 p-2"
                    >
                        <span
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#F9F9F9] text-[#54D260] text-6xl text-center font-montserrat font-bold w-28 h-28`}
                        >3
                        </span>
                    </li>
                </div>
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
                        <div className='relative bottom-3.5'>
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
                                            <div className='text-black font-montserrat text-2xl font-bold pb-8'>5,500.00</div>
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
                        </div>                     
                    </div>
                    <div className='justify-center w-4/12 relative text-start'>
                        <div className='text-black font-montserrat fixed w-1/3 text-xl mr-8 mt-16'>To protect your interests, please ensure the information is correct before proceeding with the payment.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Component2