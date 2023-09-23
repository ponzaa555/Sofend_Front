import React from "react";

const Component1 = (props:any) => {
    const eventData = props

    // function to convert format date and time.
    const daystart = eventData.startDateTime.split(/[T-]/)[2] as string
    const dayend = eventData.endDateTime.split(/[T-]/)[2] as string
    const monthstart = eventData.startDateTime.split(/[T-]/)[1] as string
    const monthend = eventData.endDateTime.split(/[T-]/)[1] as string
    const yearstart = eventData.startDateTime.split(/[T-]/)[0] as string
    const yearend = eventData.endDateTime.split(/[T-]/)[0] as string

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

    const timestart = eventData.startDateTime.split(/[T-]/)[3]?.split(/[:]/)[0] as string
    const timeend = eventData.endDateTime.split(/[T-]/)[3]?.split(/[:]/)[0] as string

    const checktime = () => {
        return(
            <div className="">{parseInt(timestart)+7}:{eventData.startDateTime.split(/[T-]/)[3]?.split(/[:]/)[1]}-{parseInt(timeend)+7}:{eventData.endDateTime.split(/[T-]/)[3]?.split(/[:]/)[1]}</div>
        )
    }

    return (
        <div className=''>
            {/* timeline steps*/}
            <div className='relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg '>
                <div
                    className="relative z-10 flex text-sm font-medium text-white w-3/4 max-w-4xl m-auto items-center py-6"
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
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#F9F9F9] text-[#54D260] text-6xl text-center font-montserrat font-bold w-28 h-28`}
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

            {/* review ticket information */}
            <div className='font-montserrat mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className='text-2xl font-bold'>
                    <h1>Review Ticket Information</h1>
                </div>
                <div className='flex flex-row-2 justify-between mt-6'>
                    <div className='w-60 rounded-md'>
                        <img className=' border-gray-300 rounded-md' src={eventData.posterImage}></img>
                    </div>
                    <div className='flex flex-col justify-evenly w-full pl-8'>
                        <div className='text-black font-kanit font-bold text-xl mb-3'>{eventData.eventName}</div>
                        <div className='flex'>
                            <div className='text-black font-montserrat text-lg mb-3 pr-8'>{checkdate()}</div>
                            <div className='text-black font-montserrat text-lg mb-3'>{checktime()}</div>
                        </div>
                        <div className='text-black font-montserrat text-lg mb-7'>{eventData.location}</div>
                        <div className='flex justify-between bg-[#EFEFEF] p-7'>
                            <div className='text-black font-bold font-montserrat text-3xl my-4 text-left'>{eventData.zone}</div>
                            <p className='text-black font-bold font-montserrat text-2xl my-4 text-left pr-36'>x{eventData.amount}</p>
                            <div className='text-black font-bold font-montserrat text-3xl my-4 text-right pr-5'>{eventData.price} ฿</div>
                        </div>
                    </div>
                </div>

                {/* First name and last name */}
                <div className='mx-auto md:items-center md:px-8 mb-8 border-2 border-gray-300 rounded-md p-10 mt-6'>
                    <div className='flex justify-around'>
                        <div className='flex'>
                            <div className='text-2xl font-bold pr-5 font-montserrat'>First Name</div>
                            <div className='text-2xl font-montserrat'>{eventData.Firstname}</div>
                        </div>
                        <div className='flex'>
                            <div className='text-2xl font-bold pr-5 font-montserrat'>Last Name</div>
                            <div className='text-2xl font-montserrat'>{eventData.Lastname}</div>
                        </div>
                    </div>
                </div>
                <p className='text-red-500 text-center tex-base font-montserrat'>
                    Staff will check attendee's ID card or passport for entry. Please make sure that the name on the ticket is match the name of the person using it. You can change personal information in your profile at any time.
                </p>
            </div>
        </div>
    )
}

export default Component1