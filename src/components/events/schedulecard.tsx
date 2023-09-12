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
          <div className="text-[#D40000] text-base font-bold mt-4">{parseInt(daystart)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)}</div>
        )
      }else if(monthstart === monthend && yearstart === yearend && daystart !== dayend){
        return(
          <div className="text-[#D40000] text-base font-bold mt-4">{parseInt(daystart)} - {parseInt(dayend)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)}</div>
        )
      }else if(yearstart === yearend && monthstart !== monthend){
        return(
          <div className="text-[#D40000] text-base font-bold mt-4">{parseInt(daystart)} {month[parseInt(monthstart)-1]} - {parseInt(dayend)} {month[parseInt(monthend)-1]} {parseInt(yearstart)}</div>
        )
      }else{
        return(
          <div className="text-[#D40000] text-base font-bold mt-4">{parseInt(daystart)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)} - {parseInt(dayend)} {month[parseInt(monthend)-1]} {parseInt(yearend)}</div>
        )
      }
    }

    const nameshow1 = name.slice(0,18)
    const nameshow2 = name.slice(18,36)
    const nameshow3 = name.slice(36)
    const placeshow1 = place.slice(0,18)
    const placeshow2 = place.slice(18,36)
    const placeshow3 = place.slice(36)
    
    return (
      <div className="w-52 rounded overflow-hidden">
          <img src={image} alt="event" className=" w-full h-80 rounded-xl shadow-xl"/>
          <div className="w-full">
            {checkdate()}
            <div>
                <h2 className="text-[#000000]  text-lg font-bold mt-2 mb-2 ">{nameshow1}</h2>
                <h2 className="text-[#000000]  text-lg font-bold mb-2 ">{nameshow2}</h2>
                <h2 className="truncate h-16 text-[#000000] break-normal  text-lg font-bold mb-2 ">{nameshow3}</h2>
            </div>
            <p className="text-[#A7A7A7]">{placeshow1}</p>
            <p className="text-[#A7A7A7]">{placeshow2}</p>
            <p className="truncate h-16 text-[#A7A7A7]">{placeshow3}</p>

          </div>
      </div>
    );
  };

export default ScheduleCard;
