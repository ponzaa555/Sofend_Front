import React from "react";
import Image from "next/image";

const Component1 = () => {
    return (
        <div className=''>
            <div className='mx-56 pt-5 pb-8'>
                <Image className='' src="/images/events/Timeline1st.png" width={500} height={500} style={{ width: '100%', height: '100%' }} alt="Timeline1stStep"/>
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
                            <div className='text-2xl font-bold pr-5'>First Name</div>
                            <div className='text-2xl'>Woohoo</div>
                        </div>
                        <div className='flex'>
                            <div className='text-2xl font-bold pr-5'>Last Name</div>
                            <div className='text-2xl'>Yeah</div>
                        </div>
                    </div>
                </div>
                <p className='text-red-500 text-center tex-base'>
                    Staff will check attendee's ID card or passport for entry. Please make sure that the name on the ticket is match the name of the person using it. You can change personal information in your profile at any time.
                </p>
            </div>
        </div>
    )
}

export default Component1