import React from 'react'

interface jsonCreateNewTicketTypes {
    Name : string;
    QuantityAvailable : string;
    StartDate : string;
    StartTime : string;
    EndDate : string;
    EndTime : string;
    TicketPrice : string;
}

const ContentCreateNewTicketTypes = () => {
    const handleOnChange = (e:React.FocusEvent) => {
        e.preventDefault()
        const Name = document.getElementById('tt-name').value
        const QuantityAvailable = document.getElementById('tt-qa').value
        const StartDate = document.getElementById('tt-start-date').value
        const StartTime = document.getElementById('tt-start-time').value
        const EndDate = document.getElementById('tt-end-date').value
        const EndTime = document.getElementById('tt-end-time').value
        const TicketPrice = document.getElementById('tt-ticketprice').value
        
        const testoutput:jsonCreateNewTicketTypes = {
            Name : Name,
            QuantityAvailable : QuantityAvailable,
            StartDate : StartDate,
            StartTime : StartTime,
            EndDate : EndDate,
            EndTime : EndTime,
            TicketPrice : TicketPrice
        }
        console.log(testoutput)
    }



    return (
        <div>
            <form onSubmit={handleOnChange} >
                <h2 className='font-bold text-3xl mb-4'>Create New Ticket Type</h2>
                {/* Details */}
                <h2 className='font-bold text-3xl mb-4'>Details</h2>
                <div className='flex flex-row gap-10'>
                    <div className='w-2/3 flex flex-row gap-9'>
                        <div className='flex flex-col justify-start w-full'> 
                            <label htmlFor="tt-name" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
                            <input type="text" id='tt-name' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2 ' required/>
                            <label htmlFor="tt-qa" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Quantity Available</label>
                            <input type="text" id='tt-qa' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/3 justify-start'>
                        <div>
                            <h3 className='font-bold text-lg mb-2'>Quantity Available</h3>
                            <p className='mb-4'>Number of available tickets for sale of this ticket type.</p>
                        </div>
                    </div>
                </div>
                
                {/* Sales Period  */}
                <h2 className='font-bold text-3xl mb-4 mt-16'>Sales Period</h2>
                <div className='flex flex-row gap-10'>
                    <div className='flex flex-col justify-start w-2/3'>
                        <div className='flex flex-row justify-start gap-7'>
                        <div className='flex flex-col justify-start w-7/12'>
                            <label htmlFor="tt-start-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Start at date</label>
                            <input type="date" id='tt-start-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                        </div>
                        <div className='flex flex-col justify-start w-5/12'>
                            <label htmlFor="tt-start-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Start time</label>
                            <input type="time" id='tt-start-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                        </div>
                        </div>
                        <div className='flex flex-row justify-start gap-7'>
                        <div className='flex flex-col justify-start w-7/12'>
                            <label htmlFor="tt-end-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End at Date</label>
                            <input type="date" id='tt-end-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                        </div>
                        <div className='flex flex-col justify-start w-5/12'>
                            <label htmlFor="tt-end-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End Time</label>
                            <input type="time" id='tt-end-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/3 justify-start'>
                        <div>
                        <h3 className='font-bold text-lg mb-2'>Sales Period</h3>
                        <p>Providing accurate date and time of sales period is crucial.12:00 PM - Midday12:00 AM - Midnight</p>
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <h2 className='font-bold text-3xl mb-4 mt-16'>Pricing</h2>
                <div className='flex flex-row gap-10'>
                    <div className='w-2/3 flex flex-row gap-9'>
                        <div className='flex flex-col justify-start w-full'>
                            <label htmlFor="tt-ticketprice" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Ticket Price (Baht)</label>
                            <input type="text" id='tt-ticketprice' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2 ' required/>
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
                    <button type='button' className='text-black border-2 border-black font-bold text-lg w-52 h-10 bg-white rounded mr-7 hover:text-white hover:bg-black'>Cancel</button>
                    <button type='submit' className='text-white font-bold text-lg w-52 h-10 border-2 border-black bg-black rounded mr-7 hover:text-black hover:bg-white'>Save</button>
                </div>
            </form>    
        </div>
    )
}

export default ContentCreateNewTicketTypes