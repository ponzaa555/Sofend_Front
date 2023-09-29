import React from 'react';

interface SheduleitemProps{
    name : string,
    place : string,
    datestart : string,
    dateend : string,
    image: string,
}


const ScheduleCard: React.FC<SheduleitemProps> = ({ datestart,dateend,name,place,image}) => {

    const daystart = datestart.split(/[T-]/)[2]
    const dayend = dateend.split(/[T-]/)[2]
    const monthstart = datestart.split(/[T-]/)[1]
    const monthend = dateend.split(/[T-]/)[1]
    const yearstart = datestart.split(/[T-]/)[0]
    const yearend = dateend.split(/[T-]/)[0]
  
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  
    const checkdate = () => {
      if(daystart === dayend && monthstart === monthend && yearstart === yearend){
        return(
          <div className="font-montserrat text-[#D40000] text-sm font-bold mt-4">{parseInt(daystart)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)}</div>
        )
      }else if(monthstart === monthend && yearstart === yearend && daystart !== dayend){
        return(
          <div className="font-montserrat text-[#D40000] text-sm font-bold mt-4">{parseInt(daystart)} - {parseInt(dayend)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)}</div>
        )
      }else if(yearstart === yearend && monthstart !== monthend){
        return(
          <div className="font-montserrat text-[#D40000] text-sm font-bold mt-4">{parseInt(daystart)} {month[parseInt(monthstart)-1]} - {parseInt(dayend)} {month[parseInt(monthend)-1]} {parseInt(yearstart)}</div>
        )
      }else{
        return(
          <div className="font-montserrat text-[#D40000] text-sm font-bold mt-4">{parseInt(daystart)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)} - {parseInt(dayend)} {month[parseInt(monthend)-1]} {parseInt(yearend)}</div>
        )
      }
    }

    const showname1 = name.slice(0,16)
    const showname2 = name.slice(16,32)
    const showname3 = name.slice(32)
    
    return (
      <div className="w-44 rounded overflow-hidden">
          <img src={image} alt="event" className=" w-full h-60 rounded-xl shadow-xl mb-1"/>
          <div className="w-full">
            {checkdate()}
            <div>
                <h2 className="font-montserrat text-[#000000]  text-base font-bold ">{showname1}</h2>
                <h2 className="font-montserrat text-[#000000]  text-base font-bold ">{showname2}</h2>
                <h2 className="font-montserrat text-[#000000]  text-base font-bold truncate mb-2">{showname3}</h2>
            </div>
            <p className="font-montserrat text-[#A7A7A7] text-xs mb-4">{place}</p>
          </div>
      </div>
    );
  };

export default ScheduleCard;
