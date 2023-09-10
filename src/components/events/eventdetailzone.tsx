import React from 'react';
import { TicketClass } from './eventitem';
import { useState } from 'react';
import { list } from 'postcss';

const Zone: React.FC<TicketClass> = ( { className, AmountOfSeats, pricePerSeat} ) => {
    
    const [count, setcount] = useState(0);
    const [countVIP, setCountVIP] = useState(0);
    const [zone, setZone] = useState("abc");

    console.log(count);
    console.log(zone);

    const handleMinus = () => {
        setcount(count-1);
        setZone(className)
    }

    const handlePlus = () => {
        setcount(count+1);
        setZone(className)
    }

    return (
    <>
        <div className='grid grid-cols-6 justify-around border-2 border-gray-300 rounded-md place-items-center px-5'>
            <div className='font-montserrat col-span-2 text-center'>{className}</div>
            <div className='font-montserrat font-bold'>{pricePerSeat} ฿</div>
            <button onClick={handleMinus}  disabled={count<=0} className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold rounded my-2 box-content py-2.5 px-1.5 text-center disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" type="submit">
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="10" y2="1" stroke={count<=0 ? "#696969":"#FFF"} stroke-width="2" className="icon" />
            </svg>
            </button>
            <div className='font-montserrat'>{count}</div>
            <button onClick={handlePlus} disabled={count>20} className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold rounded box-content  p-1.5 mr-5 text-center disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" type="submit">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
            <line x1="5" y1="4.37114e-08" x2="5" y2="10" stroke={countVIP>0 ? "#696969":"#FFF"} stroke-width="2" />
            <line y1="5" x2="10" y2="5" stroke={countVIP>0 ? "#696969":"#FFF"} stroke-width="2" />
            </svg>
            </button>
        </div>
    </>
  );
};

export default Zone;