import React, { useState } from 'react'
import ContentTicketTypes  from './ContentTicketTypes'
import { useRouter } from 'next/router'

interface createNewTicketTypes {
    Name : string;
    QuantityAvailable : string;
    NumberOfRows : string;
    NumberOfCols : string;
    TicketPrice : string;
}

const ContentCreateNewTicketTypes = () => {
    const [handleCancelButton, sethandleCancelButton] = useState(false)
    const [handleTicketType, sethandleTicketType] = useState(0)
    const eoid = "rajadamnern"
    const eventid = "011f18a228"
    // const router = useRouter()
    // const { id } = router.query;
    // const eventid = id as string



    const handleButton = () => {
        sethandleCancelButton(true)
    }

    // 0 = zone, 1 = seat
    // if (tickettype == seat) {
    //     sethandleTicketType(1)
    // }

    const handleCreateNewTicketType = async (e:React.FormEvent) => {
        const createURL = `https://eventbud-jujiu2awda-uc.a.run.app/eo_create_ticket_type/${eoid}/${eventid}`;
        console.log('createURL', createURL);

        const Name = document.getElementById('tt-name').value
        const TicketPrice = document.getElementById('tt-ticketprice').value
        let QuantityAvailable = ''
        let NumberOfRows = ''
        let NumberOfCols = ''
        
        // 0 = zone, 1 = seat
        if (handleTicketType == 0) {
            QuantityAvailable = document.getElementById('tt-qa').value
        }
        else {
            NumberOfRows = document.getElementById('tt-num-row').value
            NumberOfCols = document.getElementById('tt-num-col').value
        }
        
        const jsonCreateNewTicketTypes:createNewTicketTypes = {
            Name : Name,
            QuantityAvailable : QuantityAvailable,
            NumberOfRows : NumberOfRows,
            NumberOfCols : NumberOfCols,
            TicketPrice : TicketPrice
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
            console.log('OK!')
        }
        else {
            console.log('FAIL!')
        }
    }

    return (
        <>
            { handleCancelButton == false ?
                <div>
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
                        <div className='flex flew-row justify-between w-2/3 mt-16'>
                            <button type='button' onClick={handleButton} className='text-black border-2 border-black font-bold text-lg w-52 h-10 bg-white rounded mr-7 hover:text-white hover:bg-black'>Cancel</button>
                            <button type='submit' className='text-white font-bold text-lg w-52 h-10 border-2 border-black bg-black rounded mr-7 hover:text-black hover:bg-white'>Save</button>
                        </div>
                    </form>    
                </div> 
                : <ContentTicketTypes/>
            }
        </>
    )
}

export default ContentCreateNewTicketTypes