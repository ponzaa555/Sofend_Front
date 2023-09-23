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


const selectzonenseat = () => {
  let [quantity, setQuantity] = useState(1)
  const [isdisabled, setDisabled] = useState(false)


  function increment() {
    setQuantity(quantity + 1)
    setDisabled(false)
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }

  return (
    <>
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
                      </div>
                    </div>
                  </div>
                </div>
              <div className='bg-white'>
          </div>
      </div>
      <div className=''>
        <div className='flex flex-row justify-center'>
          <h1 className='font-montserrat text-2xl w-1/12 text-center'>tickets</h1>
        </div>
      <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
          <h1 className=' text-black font-montserrat font-bold mb-5 text-2xl'>Select Zone</h1>
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
            <div className='flex flex-col items-center gap-20'>
              <select className='h-12 border-2 border-black rounded-md'>
                <option disabled>Zone</option>
                <option>Red Zone</option>
                <option>Deep Blue Zone</option>
                <option>Green Zone</option>
                <option>Pink Zone</option>
              </select>
              {/* Seating */}
              <SeatingPlan numRows={10} numSeatsPerRow={20}/>
            </div>

        </div>
        
        
    </>
  )
}

export default selectzonenseat