import React from 'react';
import { EventitemProps } from './eventitem';

const Card: React.FC<EventitemProps> = ({datestart,dateend,name,place,image}) => {
  const daystart = datestart.split(/[T-]/)[2]
  const dayend = dateend.split(/[T-]/)[2]
  const monthstart = datestart.split(/[T-]/)[1]
  const monthend = dateend.split(/[T-]/)[1]
  const yearstart = datestart.split(/[T-]/)[0]
  const yearend = dateend.split(/[T-]/)[0]

  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  return (
    <div className="w-52 rounded overflow-hidden">
        <img src={image} alt="event" className=" w-full h-80 rounded-xl shadow-xl"/>
        <div className="w-full">
          <h2 className="text-[#D40000] text-base font-bold mt-4">{parseInt(daystart)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)}-{parseInt(dayend)} {month[parseInt(monthend)-1]} {parseInt(yearend)}</h2>
          <h2 className="text-[#000000] text-lg font-bold mt-2 mb-2">{name}</h2>
          <p className="text-[#A7A7A7] mb-2">{place}</p>
        </div>
    </div>
  );
};

export default Card; 