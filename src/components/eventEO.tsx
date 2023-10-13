import React from 'react'
import Arrow from '../components/icon/ForwardButton';
import { Link } from 'react-router-dom';

const eventEO = (props:any) => {

    const eventEO = props

    const daystart = eventEO.startDateTime.split(/[T-]/)[2] as string
    const dayend = eventEO.endDateTime.split(/[T-]/)[2] as string
    const monthstart = eventEO.startDateTime.split(/[T-]/)[1] as string
    const monthend = eventEO.endDateTime.split(/[T-]/)[1] as string
    const yearstart = eventEO.startDateTime.split(/[T-]/)[0] as string
    const yearend = eventEO.endDateTime.split(/[T-]/)[0] as string

    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const checkdate = () => {
        if(daystart === dayend && monthstart === monthend && yearstart === yearend){
        return(
            <div className="">{parseInt(daystart)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)}</div>
        )
        }else if(monthstart === monthend && yearstart === yearend && daystart !== dayend){
        return(
            <div className="">{parseInt(daystart)} - {parseInt(dayend)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)}</div>
        )
        }else if(yearstart === yearend && monthstart !== monthend){
        return(
            <div className="">{parseInt(daystart)} {month[parseInt(monthstart)-1]} - {parseInt(dayend)} {month[parseInt(monthend)-1]} {parseInt(yearstart)}</div>
        )
        }else{
        return(
            <div className="">{parseInt(daystart)} {month[parseInt(monthstart)-1]} {parseInt(yearstart)} - {parseInt(dayend)} {month[parseInt(monthend)-1]} {parseInt(yearend)}</div>
        )
        }
    }

    const timestart = eventEO.startDateTime.split(/[T-]/)[3]?.split(/[:]/)[0] as string
    const timeend = eventEO.endDateTime.split(/[T-]/)[3]?.split(/[:]/)[0] as string

    const checktime = () => {
        return(
            <div className="">{parseInt(timestart)}:{eventEO.startDateTime.split(/[T-]/)[3]?.split(/[:]/)[1]}-{parseInt(timeend)}:{eventEO.endDateTime.split(/[T-]/)[3]?.split(/[:]/)[1]}</div>
        )
    }

    const checkstatus = () => {
        if(eventEO.eventStatus === "On-going"){
            return(
                <div className='text-green-700'>{eventEO.eventStatus}</div>
            )
        }else if(eventEO.eventStatus === "Draft"){
            return(
                <div className='text-gray-500'>{eventEO.eventStatus}</div>
            )
        }
        else{
            return(
                <div className='text-red-700'>{eventEO.eventStatus}</div>
            )
        }
    }


  return (
    <>
        {/*event for this EO [On-Going]*/}
        <div className='flex font-montserrat text-base font-bold items-center mb-5'>
            <div className='flex items-center space-x-4 w-6/12'>
                <img className='object-cover h-36 w-30 rounded-md' src={eventEO.posterImage} />
                <div className='font-bold w-1/2'>{eventEO.eventName}</div>
            </div>
            <div className='flex flex-col w-2/12'>
                <div className=''>{checkdate()}</div>
                <div className=''>{checktime()}</div>
            </div>
            <div className='w-1/12'></div>
            <div className='w-2/12'>{checkstatus()}</div>
            <div className='w-2/12'>{eventEO.soldTicket}/{eventEO.totalTicket}</div>
            <div className='w-1/12 items-center'>
                <a href={`/eventeditor/${eventEO.eventID}`}>
                    <Arrow />
                </a>
            </div>
        </div>
        <div className='w-full h-0.5 bg-gray-300 rounded-lg mb-5' />
    </>
  )
}

export default eventEO