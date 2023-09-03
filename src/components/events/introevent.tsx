import React , {useEffect, useState} from 'react'
import Slideshow from './slideshow';
import Seachbar from './seachbar'
import Seachlist from './searchresultlist'


const introevent = () => {
  const [results,setResults] = useState([])

  return (
    <>
    <div className='bg-gradient-to-r from-slate-300 via-emerald-500 via-30% to-sky-500 relative'>
      <div className='justify-between px-4 py-8 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
        <div className='basis-5/12 grid grid-col-4 gap-y-24'>
          <div className='text-5xl/8 text-white font-montserrat font-semibold tracking-wide place-items-start'>
            <h1 className='mb-5'>Unleash </h1>
            <h1 className='mb-5'>enchanting </h1>
            <h1 className='mb-5'>experiences</h1>
            <h1 className='mb-5'>at your fingertips.</h1>
          </div>
          <div>
            <p className='text-l text-white font-montserrat font-normal'>Discover online and offline events at EventBud.</p>
          </div>
        </div>
        <div className='basis-7/12'>
          <Slideshow/>
        </div>
      </div>
      <Seachbar setResults={setResults}/>
      <div className='grid justify-items-center'><Seachlist results={results}/></div>
    </div>
  </>
  );
}

export default introevent;