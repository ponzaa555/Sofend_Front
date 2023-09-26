import React, { useState } from "react";
import ComponentGenerateQR from "./CheckoutGen";

const Component2 = (props:any) => {  
    const [isChecked, setIsChecked] = useState(false); 
    const eventData = props


    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

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
                    className="relative z-10 flex text-sm font-medium text-white w-3/4 max-w-4xl m-auto items-center  py-6"
                >   
                    <li
                        className="flex items-center gap-2 p-2"
                    >
                        <span
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#54D260] text-3xl text-center font-montserrat font-bold w-16 h-16`}
                        >1
                        </span>
                    </li>
                    <div className="w-full h-0 border-2 border-green-400 border-dashed"></div>
                    <li
                        className="flex items-center gap-2 p-2"
                    >
                        <span
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#54D260] text-3xl text-center font-montserrat font-bold w-16 h-16`}
                        >2
                        </span>
                    </li>
                    <div className="w-full h-0 border-2 border-green-400 border-dashed"></div>
                    <li
                        className="flex items-center gap-2 p-2"
                    >
                        <span
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#F9F9F9] text-[#54D260] text-3xl text-center font-montserrat font-bold w-16 h-16`}
                        >3
                        </span>
                    </li>
                </div>
            </div>
            {/* payment */}
            <div className='font-montserrat mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className='text-2xl font-bold'>
                    <h1>Payment</h1>
                </div>
                <div className='flex flex-row-2 justify-between mt-6 '>
                    <div className='w-8/12 rounded-md'>
                        <div className="border-8 border-[#D9D9D9] rounded-lg mx-10">
                            <div className="border-8 border-black rounded-sm"></div>
                        </div>
                        <div className='relative bottom-3.5'>
                            <div className='bg-white mx-20 px-20 drop-shadow-md'>
                                <div className='text-xl font-kanit font-bold pt-12'>{eventData.eventName}</div>
                                <div className='text-lg font-montserrat pb-1 text-[#9F9F9F]'>{eventData.location}</div>
                                <div className="border-t-4 border-[#BDBDBD] rounded-md my-6"></div>
                                <div className='flex justify-between mb-2'>
                                    <div className='text-black font-montserrat text-lg'>{checkdate()}</div>
                                    <div className='text-black font-montserrat text-lg'>{checktime()}</div>
                                </div>
                                <div className='flex justify-between mb-2'>
                                    <div className='text-black font-montserrat text-xl'>{eventData.zone}</div>
                                    <div className='text-black font-montserrat text-xl'>{eventData.price} ฿</div>
                                </div>
                                {/* กรณีเลือกที่นั่ง */}
                                {/* <div className='flex justify-start pb-14'>
                                    <div className='text-black font-montserrat text-xl pr-12'>area C1</div>
                                    <div className='text-black font-montserrat text-xl'>seat (เลขที่นั่ง)</div>
                                </div> */}
                                <div className='flex justify-between pb-14 pt-14'>
                                    <div className='flex justify-between w-full'>
                                        <div className="">
                                            <div className='text-black font-montserrat text-2xl font-bold pb-6'>Total</div>
                                            <div className='text-black font-montserrat text-2xl font-bold pb-8'>{eventData.price}</div>
                                            <div className='text-[#838383] font-montserrat text-lg font-bold'>scan QR code to pay</div>

                                        </div>
                                        <div className="">
                                            <div className='text-black font-montserrat text-lg pb-6'>({eventData.amount} items)</div>
                                            <div className='text-black font-montserrat text-2xl font-bold pb-10'>฿</div>
                                            <input type="checkbox" checked={isChecked} onChange={toggleCheckbox}/>
                                        </div>
                                        { isChecked == false ?
                                        <div className="w-48 h-48">
                                            <ComponentGenerateQR
                                                price={eventData.price}
                                            />
                                        </div>: 
                                        <div className="w-48 h-48 relative">
                                            <ComponentGenerateQR
                                                price={eventData.price}
                                            />
                                            <div className="absolute bottom-0 left-0 w-48 h-48 p-10">
                                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="#54d260" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></svg>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                        </div>                     
                    </div>
                    <div className='justify-center w-4/12 relative text-start'>
                        <div className='text-black font-montserrat fixed w-1/3 text-xl mr-8 mt-16'>To protect your interests, please ensure the information is correct before proceeding with the payment.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Component2