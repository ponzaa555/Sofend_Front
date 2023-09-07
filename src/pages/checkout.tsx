import React from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Component1 from '../components/Checkout/Checkout1stStep'
import Component2 from '../components/Checkout/Checkout2ndStep'
import Component3 from '../components/Checkout/Checkout3rdStep'
import Link from 'next/link'

function ButtonCheckout(step:Number, handleNext:any, handleBack:any, router:any) {
    switch (step) {
        case 1: 
            return <div className='flex justify-between mx-auto md:items-center md:px-8 pb-10'>
                        <button className='border-2 border-black rounded-md text-2xl px-14 hover:bg-black hover:text-white py-2'
                        onClick={handleBack}>
                            Cancel
                        </button>
                        <button className='border-2 border-black rounded-md text-2xl text-white bg-black px-32 hover:bg-white hover:text-black py-2'
                        onClick={handleNext}>
                            Next
                        </button>
                    </div>
        case 2:
            return <div className='flex justify-between mx-auto md:items-center md:px-8 pb-10'>
                        <button className='border-2 border-black rounded-md text-2xl px-14 hover:bg-black hover:text-white py-2'
                        onClick={handleBack}>
                            Back
                        </button>
                        <button className='border-2 border-black rounded-md text-2xl text-white bg-black px-32 hover:bg-white hover:text-black py-2'
                        onClick={handleNext}>
                            Proceed
                        </button>
                    </div>
        case 3:
            return <div className='flex justify-center mx-auto md:items-center md:px-8 pb-10'>
                        <Link href='/main'>
                            <button className='border-2 border-black rounded-md text-2xl text-white bg-black px-32 hover:bg-white hover:text-black py-2 mr-10'>
                                My Ticket
                            </button>
                        </Link>
                        <Link href='/main'>
                            <button className='border-2 border-black rounded-md text-2xl px-14 hover:bg-black hover:text-white py-2'>
                                Home
                            </button>
                        </Link>
                    </div>
        default:
            return null;
    }
}

const checkout = () => {
    
    const router = useRouter()
    const [step, setStep] = useState(1)

    // function to handle next button.
    const handleNext = () => {
        setStep(step + 1)
    }
    
    // function to handle back button and cancel button.
    // in case cancel button, it will go back to event detail.
    const handleBack = () => {
        setStep(step - 1)
        if (step === 1) {
            return router.push('/main')
        }
    }

    // function to handle component by step.
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
        <div className='bg-[#F9F9F9] h-full'>  
            {/* step 1: Timeline 1
                        Review Ticket Information
                step 2: Timeline 2
                        Payment
                step 3: Timeline 3
                        Congratulations*/}
            {/* timeline steps and Ticket Summary*/}
            {handleComponent()}
            {/*Button Cancel and Next*/}
            {ButtonCheckout(step, handleNext, handleBack, router)}
        </div>
    </div>
  )
}

export default checkout