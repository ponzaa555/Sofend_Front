import React from 'react'

// type Props = {}

const ContentTicketTypes = () => {
    return (
        <div>
            <div className='text-xl font-bold'>
                Create New Ticket Type
            </div>
            <div className='text-xl font-bold'>
                Details
            </div>
            <div className='flex justify-between'>
                <div>
                    <div className='flex'>
                        <p>Name</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div>
                        <input type="text" className='border-2 border-black rounded-md'/>
                    </div>
                    <div className='flex'>
                        <p>Quantity Available</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div>
                        <input type="text" className='border-2 border-black rounded-md'/>
                    </div>
                </div>
                <div>
                    <p className='font-bold'>Quantity Available</p>
                    <p>Number of available tickets for sale of this ticket type.</p>
                </div>
            </div>
            <div className='text-xl font-bold'>
                Sales Period
            </div>
            <div className='flex justify-between'>
                <div>
                    <div className='flex'>
                        <p>Start at date</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div>
                        <input type="text" className='border-2 border-black rounded-md'/>
                    </div>
                    <div className='flex'>
                        <p>End at date</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div>
                        <input type="text" className='border-2 border-black rounded-md'/>
                    </div>
                </div>
                <div>
                    <div className='flex'>
                        <p>Start time</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div>
                        <input type="text" className='border-2 border-black rounded-md'/>
                    </div>
                    <div className='flex'>
                        <p>End time</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div>
                        <input type="text" className='border-2 border-black rounded-md'/>
                    </div>
                </div>
                <div>
                    <p className='font-bold'>Sales Period</p>
                    <p>Providing accurate date and time of sales period is crucial.12:00 PM - Midday12:00 AM - Midnight</p>
                </div>
            </div>
            <div className='text-xl font-bold'>
                Pricing
            </div>
            <div className='flex justify-between'>
                <div>
                    <div className='flex'>
                        <p>Ticket Price (Baht)</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div>
                        <input type="text" className='border-2 border-black rounded-md'/>
                    </div>
                </div>
                <div>
                    <p className='font-bold'>Pricing</p>
                    <p>The Ticket Pricing section offers potential attendees a clear understanding of the pricing structure.</p>
                </div>
            </div>
            <div className='flex justify-between'>
                <button className='border-2 border-black rounded-lg text-l text-black bg-white hover:bg-black hover:text-white py-2 px-2'>
                    <h1 className='font-montserrat font-bold '>Cancel</h1>
                </button>
                <button className='border-2 border-black rounded-lg text-l text-white bg-black hover:bg-white hover:text-black py-2 px-2'>
                    <h1 className='font-montserrat font-bold '>Save</h1>
                </button>
            </div>
        </div>
    )
}

export default ContentTicketTypes