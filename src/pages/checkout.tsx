import React from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from "next/image";
import Component1 from '../components/Checkout/Checkout1stStep'
import Component2 from '../components/Checkout/Checkout2ndStep'
import Component3 from '../components/Checkout/Checkout3rdStep'

const checkout = () => {
    
    const router = useRouter()
    const [step, setStep] = useState(1)

    const handleNext = () => {
        setStep(step + 1)
    }
    
    const handleBack = () => {
        setStep(step - 1)
        if (step === 1) {
            return router.push('/main')
        }
    }

    const handleComponent = () => {
        switch (step) {
            case 1:
                return <Component1/>
            case 2:
                return <Component2/>
            case 3:
                return <Component3/>
            default:
                return null;
        }
    };

    return (
    <div className='font-montserrat'>
        <Head>
            {/* import font to page */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = 'anonymous'/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = 'anonymous'/>
            <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
        </Head>
        <Navbar/>
        <div className='bg-[#F9F9F9]'>  
            {/* timeline steps*/}
            {/* <div className='relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-green-400'>
                <ol
                    className="relative z-10 flex justify-evenly text-sm font-medium text-white"
                >
                    <li
                        className="flex items-center gap-2 bg-white p-2"
                    >
                        <span
                            className="p-10 rounded-full border-2 border-[#54D260] bg-[#54D260] text-[50px] text-center  font-montserrat font-bold"
                        >1
                        </span>
                    </li>
                    <li
                        className="flex items-center gap-2 bg-white p-2"
                    >
                        <span
                            className={`p-10 rounded-full border-2 ${step >= 2? "bg-[#54D260] text-white":"bg-white text-[#54D260]"} border-[#54D260] text-4xl text-center font-montserrat font-bold`}
                        >2
                        </span>
                    </li>
                    <li
                        className="flex items-center gap-2 bg-white p-2"
                    >
                        <span
                            className={`p-10 rounded-full border-2 ${step >= 3? "bg-[#54D260] text-white":"bg-white text-[#54D260]"} border-[#54D260] text-[40px] text-center font-montserrat font-bold`}
                        >3
                        </span>
                    </li>
                </ol>
            </div> */}
            {handleComponent()}
            {/*Ticket Summary*/}
            <div className='font-montserrat mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className='text-[27px] font-bold'>
                    <h1>Review Ticket Information</h1>
                </div>
                <div className='flex flex-row-2 justify-between mt-6'>
                    <div className='w-60 rounded-md'>
                        <img className=' border-gray-300 rounded-md' src='https://th.bing.com/th/id/OIP.gWyiEiX-q58hancFtVWMagHaKC?pid=ImgDet&rs=1'></img>
                    </div>
                    <div className='flex flex-col justify-evenly w-full pl-8'>
                        <div className='text-black font-kanit font-bold text-[22px] mb-3'>THE WORLD OF STUDIO GHIBLI'S ANIMATION EXHIBITION BANGKOK 2023</div>
                        <div className='flex'>
                            <div className='text-black font-montserrat text-[17px] mb-3 pr-8'>1st July 2023 - 31 December 2023</div>
                            <div className='text-black font-montserrat text-[17px] mb-3'>11:00-21:00</div>
                        </div>
                        <div className='text-black font-montserrat text-[17px] mb-7'>Central World Live at Central World Fl.8</div>
                        <div className='flex justify-between bg-[#EFEFEF] p-7'>
                            <div className='text-black font-bold font-montserrat text-[27px] my-4 text-left'>Normal x1</div>
                            <div className='text-black font-bold font-montserrat text-[27px] my-4 text-right pr-5'>650 ฿</div>
                        </div>
                    </div>
                </div>
                <div className='mx-auto md:items-center md:px-8 mb-10 border-2 border-gray-300 rounded-md p-10 mt-3'>
                    <div className='flex justify-evenly'>
                        <div className='flex'>
                            <div className='text-[22px] font-bold pr-5'>First Name</div>
                            <div className='text-[22px]'>Woohoo</div>
                        </div>
                        <div className='flex'>
                            <div className='text-[22px] font-bold pr-5'>Last Name</div>
                            <div className='text-[22px]'>Yeah</div>
                        </div>
                    </div>
                </div>
                <p className='text-red-500 text-center tex-[17px]'>
                    Staff will check attendee's ID card or passport for entry. Please make sure that the name on the ticket is match the name of the person using it. You can change personal information in your profile at any time.
                </p>
            </div>
            {/*Button Cancel and Next by San*/}
            <div>
                <button
                onClick={handleBack}>
                    Cancel
                </button>
                <button 
                onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}

export default checkout