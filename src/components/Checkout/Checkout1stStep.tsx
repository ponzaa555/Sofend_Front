import React from "react";
import Image from "next/image";

const Component1 = () => {
    return (
        <div className=''>
            {/* timeline steps*/}
            <div className='relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg '>
                <div
                    className="relative z-10 flex text-sm font-medium text-white w-3/4 max-w-4xl m-auto items-center"
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
            <div className='font-montserrat mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className='text-2xl font-bold'>
                    <h1>Review Ticket Information</h1>
                </div>
                <div className='flex flex-row-2 justify-between mt-6'>
                    <div className='w-60 rounded-md'>
                        <img className=' border-gray-300 rounded-md' src='https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1'></img>
                    </div>
                    <div className='flex flex-col justify-evenly w-full pl-8'>
                        <div className='text-black font-kanit font-bold text-xl mb-3'>THE WORLD OF STUDIO GHIBLI'S ANIMATION EXHIBITION BANGKOK 2023</div>
                        <div className='flex'>
                            <div className='text-black font-montserrat text-lg mb-3 pr-8'>1st July 2023 - 31 December 2023</div>
                            <div className='text-black font-montserrat text-lg mb-3'>11:00-21:00</div>
                        </div>
                        <div className='text-black font-montserrat text-lg mb-7'>Central World Live at Central World Fl.8</div>
                        <div className='flex justify-between bg-[#EFEFEF] p-7'>
                            <div className='text-black font-bold font-montserrat text-3xl my-4 text-left'>Normal x1</div>
                            <div className='text-black font-bold font-montserrat text-3xl my-4 text-right pr-5'>650 ฿</div>
                        </div>
                    </div>
                </div>
                <div className='mx-auto md:items-center md:px-8 mb-8 border-2 border-gray-300 rounded-md p-10 mt-6'>
                    <div className='flex justify-around'>
                        <div className='flex'>
                            <div className='text-2xl font-bold pr-5 font-montserrat'>First Name</div>
                            <div className='text-2xl font-montserrat'>Woohoo</div>
                        </div>
                        <div className='flex'>
                            <div className='text-2xl font-bold pr-5 font-montserrat'>Last Name</div>
                            <div className='text-2xl font-montserrat'>Yeah</div>
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