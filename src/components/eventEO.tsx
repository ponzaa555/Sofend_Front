import React from 'react'
import Arrow from '../components/icon/ForwardButton';

const eventEO = () => {
  return (
    <>
        {/*event for this EO [On-Going]*/}
        <div className='flex font-montserrat text-base font-bold items-center mb-5'>
            <div className='flex items-center space-x-4 w-6/12'>
                <img className='object-cover h-36 w-30 rounded-md' src='https://p-u.popcdn.net/event_details/posters/000/016/215/large/fc20bc7076d8acd7e80168e07f511f4181a65da0.png?1695028291' />
                <div className='font-bold w-1/2'>BE@RBRICK WORLD WIDE TOUR 3 in Bangkok</div>
            </div>
            <div className='flex flex-col w-2/12'>
                <div className=''>Sat, 20 Nov 2021</div>
                <div className=''>19:00 - 22:00</div>
            </div>
            <div className='w-1/12'></div>
            <div className='w-2/12 text-green-700'>On-Going</div>
            <div className='w-2/12'>400/1000</div>
            <div className='w-1/12 items-center'>
                <button className=''>
                    <Arrow />
                </button>
            </div>
        </div>
        <div className='w-full h-1 bg-gray-300 rounded-lg mb-5' />
    </>
  )
}

export default eventEO