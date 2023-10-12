import React, { useState, useEffect } from 'react'
import ContentTicketTypes  from './ContentTicketTypes'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { getEventDetail } from '~/service/api';

interface createNewTicketTypes {
    className : string;
    amountOfSeat : number;
    rowNo : number;
    columnNo : number;
    pricePerSeat : number;
    validDatetime : string;
    expiredDatetime : string;
}

const ContentCreateNewTicketTypes = () => {
    const [handleCancelButton, sethandleCancelButton] = useState(false)
    const [handleTicketType, sethandleTicketType] = useState(0)
    const [getfinish, setgetfinish] = useState(false);

    const router = useRouter()
    const { id } = router.query;
    const eventid = id as string
    const {data:session} = useSession()
    console.log("session: ",session)
    const eoid = session?.user?.userID as string


    const handleButton = () => {
        sethandleCancelButton(true)
    }

    useEffect(() => {
        console.log(id);
        if (id) {
            console.log(id);
            getEventDetail(id as string)
                .then(data => {
                    setgetfinish(true);
                    // 0 = zone, 1 = seat
                    if (data.ticketType == "Seat") {
                        sethandleTicketType(1)
                    }
                    else if (data.ticketType == "Classed") {
                        sethandleTicketType(0)
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        };
    }, [id]);

    

    const handleCreateNewTicketType = async (e:React.FormEvent) => {
        toast.loading(`Creating New Ticket Type...`)
        const createURL = `https://eventbud-jujiu2awda-uc.a.run.app/eo_create_ticket_type/${eoid}/${eventid}`;
        console.log('createURL', createURL);

        const Name = document.getElementById('tt-name').value
        const TicketPrice = document.getElementById('tt-ticketprice').value
        const validDatetime = document.getElementById('tt-valid-date').value + 'T' + document.getElementById('tt-valid-time').value
        const expiredDatetime = document.getElementById('tt-expired-date').value + 'T' + document.getElementById('tt-expired-time').value
        // console.log('validDatetime', validDatetime);
        // console.log('expiredDatetime', expiredDatetime);
        let QuantityAvailable = 0
        let NumberOfRows = 0
        let NumberOfCols = 0
        
        // 0 = zone, 1 = seat
        if (handleTicketType == 0) {
            QuantityAvailable = document.getElementById('tt-qa').value
        }
        else {
            NumberOfRows = document.getElementById('tt-num-row').value
            NumberOfCols = document.getElementById('tt-num-col').value
            QuantityAvailable = NumberOfRows * NumberOfCols
        }
        
        const jsonCreateNewTicketTypes:createNewTicketTypes = {
            className : Name,
            amountOfSeat : QuantityAvailable,
            rowNo : NumberOfRows,
            columnNo : NumberOfCols,
            pricePerSeat : TicketPrice,
            validDatetime : validDatetime,
            expiredDatetime : expiredDatetime
        }
        console.log('jsonCreateNewTicketTypes: ', jsonCreateNewTicketTypes)

        e.preventDefault()
        const response = await fetch(createURL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonCreateNewTicketTypes)
        });
        const res = await response.json();
        console.log('res', res);
        if (response.ok) {
            toast.remove()
            toast.success(`Create Success`)
            sethandleCancelButton(true)
        }
        else {
            toast.remove()
            toast.error(`Failed (${res.detail})`)
        }
    }

    return (
        <>  { getfinish == true ? 
                handleCancelButton == false ?
                    <div>
                        <Toaster />
                        <form onSubmit={handleCreateNewTicketType} >
                            <h2 className='font-bold text-3xl mb-4'>Create New Ticket Type</h2>
                            {/* Details */}
                            <h2 className='font-bold text-3xl mb-4'>Details</h2>
                            <div className='flex flex-row gap-10'>
                                <div className='w-2/3 flex flex-row gap-9'>
                                    <div className='flex flex-col justify-start w-full'> 
                                        <label htmlFor="tt-name" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
                                        <input type="text" id='tt-name' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2 ' required/>
                                        { handleTicketType == 0 ?
                                            <>
                                                <label htmlFor="tt-qa" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Quantity Available</label>
                                                <input type="number" id='tt-qa' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                                            </>:
                                            <div className='flex flex-row justify-start gap-7'>
                                                <div className='flex flex-col justify-start w-1/2'>
                                                    <label htmlFor="tt-num-row" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Number of rows</label>
                                                    <input type="number" id='tt-num-row' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                                                </div>
                                                <div className='flex flex-col justify-start w-1/2'>
                                                    <label htmlFor="tt-num-col" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Number of columns</label>
                                                    <input type="number" id='tt-num-col' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                                                </div>
                                            </div>  
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col w-1/3 justify-start'>
                                { handleTicketType == 0 ? 
                                    <div>
                                        <h3 className='font-bold text-lg mb-2'>Quantity Available</h3>
                                        <p className='mb-4'>Number of available tickets for sale of this ticket type.</p>
                                    </div>:
                                    <div>
                                        <h3 className='font-bold text-lg mb-2'>Number of rows & columns</h3>
                                        <p className='mb-4'>Number of rows and column available in this ticket type.</p>
                                    </div>
                                }
                                </div>
                            </div>                   

                            {/* Pricing */}
                            <h2 className='font-bold text-3xl mb-4 mt-16'>Pricing</h2>
                            <div className='flex flex-row gap-10'>
                                <div className='w-2/3 flex flex-row gap-9'>
                                    <div className='flex flex-col justify-start w-full'>
                                        <label htmlFor="tt-ticketprice" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Ticket Price (Baht)</label>
                                        <input type="number" id='tt-ticketprice' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2 ' required/>
                                    </div>
                                </div>
                                <div className='flex flex-col w-1/3 justify-start'>
                                    <div>
                                        <h3 className='font-bold text-lg mb-2'>Pricing</h3>
                                        <p className='mb-4'>The Ticket Pricing section offers potential attendees a clear understanding of the pricing structure.</p>
                                    </div>
                                </div>
                            </div> 

                            {/* Valid Date-Time */}
                            <h2 className='font-bold text-3xl mb-4 mt-8'>Valid Date-Time</h2>
                            <div className='flex flex-row gap-10'>
                            <div className='flex flex-col justify-start w-2/3'>
                                <div className='flex flex-row justify-start gap-7'>
                                <div className='flex flex-col justify-start w-7/12'>
                                    <label htmlFor="tt-valid-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Valid from date</label>
                                    <input type="date" id='tt-valid-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                                </div>
                                <div className='flex flex-col justify-start w-5/12'>
                                    <label htmlFor="tt-valid-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Time valid</label>
                                    <input type="time" id='tt-valid-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                                </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-1/3 justify-start'>
                                <div>
                                    <h3 className='font-bold text-lg mb-2'>Valid Date-Time</h3>
                                    <p className='mb-4'>It tells the system when your event tickets are valid, simply when staff can start scanning your customer ticket and let them in the event. 12:00 PM - Midday 12:00 AM - Midnight</p>
                                </div>
                            </div>
                            </div>


                            {/* Expired Date-Time */}
                            <h2 className='font-bold text-3xl mb-4 mt-8'>Expired Date-Time</h2>
                            <div className='flex flex-row gap-10'>
                            <div className='flex flex-col justify-start w-2/3'>
                                <div className='flex flex-row justify-start gap-7'>
                                <div className='flex flex-col justify-start w-7/12'>
                                    <label htmlFor="tt-expired-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Expired date</label>
                                    <input type="date" id='tt-expired-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                                </div>
                                <div className='flex flex-col justify-start w-5/12'>
                                    <label htmlFor="tt-expired-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Expired Time</label>
                                    <input type="time" id='tt-expired-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                                </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-1/3 justify-start'>
                                <div>
                                    <h3 className='font-bold text-lg mb-2'>Expired Date-Time</h3>
                                    <p className='mb-4'>specify when tickets are no longer valid, regardless of whether they've been used or not. It sets the expiration time for tickets. 12:00 PM - Midday 12:00 AM - Midnight</p>
                                </div>
                            </div>
                            </div>
                                                
                            <div className='flex flew-row justify-between w-2/3 mt-16'>
                                <button type='button' onClick={handleButton} className='text-black border-2 border-black font-bold text-lg w-52 h-10 bg-white rounded mr-7 hover:text-white hover:bg-black'>Cancel</button>
                                <button type='submit' className='text-white font-bold text-lg w-52 h-10 border-2 border-black bg-black rounded mr-7 hover:text-black hover:bg-white'>Save</button>
                            </div>
                        </form>    
                    </div> 
                    : <ContentTicketTypes/>
                : 
                <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="font-montserrat">Loading...</span>
                </div>
            }
        </>
    )
}

export default ContentCreateNewTicketTypes