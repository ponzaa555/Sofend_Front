import React, { useEffect, useRef } from "react";
import Head from 'next/head'
import Navbar from '../components/navbar'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Checkout1stStep from '../components/Checkout/Checkout1stStep'
import Checkout2ndStep from '../components/Checkout/Checkout2ndStep'
import Checkout3rdStep from '../components/Checkout/Checkout3rdStep'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { c, d } from "msw/lib/glossary-de6278a9";

interface postNewTicket {
    eventID: string;
    userID: string;
    className: string;
    seatNo: string[];
}


function ButtonCheckout(step: Number, handleNext: any, handleBack: any, handlePostNewTicketType: any, disableProceedButton: boolean) {
    switch (step) {
        case 1:
            return <div className='flex justify-between mx-auto lg:max-w-7xl md:items-center md:px-8'>
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
            return <div className='flex justify-between mx-auto lg:max-w-7xl md:items-center md:px-8'>
                <button className='border-2 border-black rounded-md text-2xl px-14 hover:bg-black hover:text-white py-2'
                    onClick={handleBack}>
                    Back
                </button>
                <button className='border-2 border-black rounded-md text-2xl text-white bg-black px-32 hover:bg-white hover:text-black py-2 disabled:bg-slate-50 disabled:text-slate-200 disabled:border-slate-200 disabled:shadow-none'
                    onClick={handlePostNewTicketType} disabled={disableProceedButton == true}>
                    Proceed
                </button>
            </div>
        case 3:
            return <div className='flex justify-center mx-auto lg:max-w-7xl md:items-center md:px-8'>
                <Link href='/myticket'>
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

type EventData = {
    eventID: string,
    eventName: string,
    startDateTime: string,
    endDateTime: string,
    posterImage: string,
    zone: string,
    nameOfZone: string,
    seat: string[],
    amount: number,
    price: number,
    location: string,
    checkoutTime: Date,
}

const Checkout: React.FC = ({ }) => {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const { data: session } = useSession();
    const [eventData, setEventData] = useState<EventData>()
    const [loading, setLoading] = useState(false)
    const [disableProceedButton, setDisableProceedButton] = useState(false)

    useEffect(() => {
        setLoading(false)
        setEventData(JSON.parse(localStorage.getItem('dataEventDetailToCheckout')!))
        setLoading(true)
    }, [])

    const handlePostNewTicketType = async (e: React.FormEvent) => {
        setDisableProceedButton(true)
        toast.loading(`Creating New Ticket...`)
        const postURL = `https://eventbud-jujiu2awda-uc.a.run.app/post_ticket`;
        console.log('postURL', postURL);

        const eventID = eventData?.eventID
        const userID = session?.user?.userID as string
        let className = ""
        const amount = eventData?.amount
        let seat = eventData?.seat

        if (eventData?.zone != "") {
            className = eventData?.zone!
            for (let i = 1; i < amount!; i++) {
                seat?.push("");
            }
        }
        else {
            className = eventData?.nameOfZone!
            seat = eventData?.seat
        }

        console.log(seat)

        const jsonPostNewTicket: postNewTicket = {
            eventID: eventID!,
            userID: userID,
            className: className,
            seatNo: seat!,
        }
        console.log('jsonPostNewTicket: ', jsonPostNewTicket)

        e.preventDefault()
        const response = await fetch(postURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonPostNewTicket)
        });
        const res = await response.json();
        console.log('res', res);
        if (response.ok) {
            toast.remove()
            toast.success(`Success!`)
        }
        else {
            toast.remove()
            toast.error(`Fail!`)
        }
        setStep(step + 1)
    }


    // function to handle next button.
    const handleNext = () => {
        setStep(step + 1)
        console.log(step)

        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }

    /* function to handle back button and cancel button.
        in case cancel button, it will go back to event detail. */
    const handleBack = () => {
        setStep(step - 1)
        if (step === 1) {
            return router.back()
        }

        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }

    // function to handle component by step and pass data to component.
    const handleComponent = (session: any) => {

        switch (step) {
            case 1:
                return (
                    <Checkout1stStep
                        eventName={eventData!.eventName}
                        startDateTime={eventData!.startDateTime}
                        endDateTime={eventData!.endDateTime}
                        posterImage={eventData!.posterImage}
                        zone={eventData!.zone}
                        nameOfZone={eventData!.nameOfZone}
                        seat={eventData!.seat}
                        amount={eventData!.amount}
                        price={eventData!.price}
                        location={eventData!.location}
                        Firstname={session?.user?.name?.split(/[' ']/)[0] as string}
                        Lastname={session?.user?.name?.split(/[' ']/)[1] as string}
                    />
                );
            case 2:
                return (
                    <Checkout2ndStep
                        eventID={eventData!.eventID}
                        eventName={eventData!.eventName}
                        startDateTime={eventData!.startDateTime}
                        endDateTime={eventData!.endDateTime}
                        posterImage={eventData!.posterImage}
                        zone={eventData!.zone}
                        nameOfZone={eventData!.nameOfZone}
                        seat={eventData!.seat}
                        amount={eventData!.amount}
                        price={eventData!.price}
                        location={eventData!.location}
                    />
                );
            case 3:
                return <Checkout3rdStep />
            default:
                return null;
        }
    };

    const Ref = useRef(null);

    // The state for our timer
    const currentTime = new Date();
    const deadTime = eventData?.checkoutTime;
    console.log('deadTime', deadTime)

    const [duration, setDuration] = useState(0);
    const [timer, setTimer] = useState(duration);
    useEffect(() => {
        if (eventData && eventData.checkoutTime) {
            const checkoutTime = new Date(eventData.checkoutTime);
            clearTimer(checkoutTime);

            // Calculate and set the duration
            const currentTime = new Date();
            const timeDifference = checkoutTime - currentTime;
            setDuration(timeDifference);
            if (checkoutTime < currentTime) {
                { handlecancle() }
                toast.error(`Time out!`)
                router.push('/main');
            }
        }
        console.log('duration', duration)
    }, [eventData]);


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {

            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e: any) => {
        setTimer(duration);
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 900);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    useEffect(() => {
        if (timer === '14:50' && step !== 3) {
            { handlecancle() }
            toast.error(`Time out!`)
            router.push('/main');
        }
    }, [timer])

    const handlecancle = async () => {
        console.log('eventData?.nameOfZone', eventData?.nameOfZone)
        if(eventData?.nameOfZone != "") {
        const postURL = `https://eventbud-jujiu2awda-uc.a.run.app/cancel_reserve_ticket`;
        console.log('postURL', postURL);

        const eventID = eventData?.eventID
        const userID = session?.user?.userID as string
        let className = ""
        const amount = eventData?.amount
        let seat = eventData?.seat

        if (eventData?.zone != "") {
            className = eventData?.zone!
            for (let i = 1; i < amount!; i++) {
                seat?.push("");
            }
        }
        else {
            className = eventData?.nameOfZone!
            seat = eventData?.seat
        }


        const jsonPostNewTicket: postNewTicket = {
            eventID: eventID!,
            userID: userID,
            className: className,
            seatNo: seat!,
        }
        console.log('jsonPostNewTicket: ', jsonPostNewTicket)
        const response = await fetch(postURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonPostNewTicket)
        });
        const res = await response.json();
        console.log('res', res);}
    }

    return (
        <div className='font-montserrat'>
            <Head>
                {/* import font to page */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            {loading == true ?
                <div className='bg-[#F9F9F9] h-full min-h-full pb-10'>
                    <Toaster />
                    {/* step 1: Timeline 1
                            Review Ticket Information
                    step 2: Timeline 2
                            Payment
                    step 3: Timeline 3
                            Congratulations*/}

                    {/* timeline steps and Ticket Summary*/}
                    {/* {handleComponent(parsedData!, session)} */}
                    <div className='flex flex-row justify-center items-center font-montserrat font-bold text-3xl'>
                        {(step == 3) ?
                            null : (timer != 0) ? <div className="mt-5">{timer}</div> : <svg aria-hidden="true" className="mt-6 w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        }
                    </div>
                    {handleComponent(session)}

                    {/*Button Cancel and Next*/}
                    {ButtonCheckout(step, handleNext, handleBack, handlePostNewTicketType, disableProceedButton)}
                </div> :
                <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="font-montserrat">Loading...</span>
                </div>
            }
        </div>
    )
}

export default Checkout
