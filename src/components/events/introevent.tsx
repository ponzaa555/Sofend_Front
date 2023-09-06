import React from 'react'
import Slideshow from './slideshow';

const introevent = () => {
  return (
    <div className='bg-gradient-to-r from-slate-300 via-emerald-500 via-30% to-sky-500'>
        <div className='flex flex-row justify-center pt-10 pb-28'>
            <div className='flex flex-col gap-14'>
                <div className='text-6xl text-white font-montserrat font-bold'>
                    <h1 className='mb-1'>Unleash </h1>
                    <h1 className='mb-1'>enchanting </h1>
                    <h1 className='mb-1'>experiences at </h1>
                    <h1 className='mb-1'>your fingertips.</h1>
                </div>
                <div className='text-xl text-white font-montserrat font-normal lg:pt-10'>
                    <p>discover online and offline events at EventBuzz.</p>
                </div>
            </div>
            <div className='w-2/5 ml-6'>
                <Slideshow/>
            </div>
        </div>
    </div>
  )
}

export default introevent