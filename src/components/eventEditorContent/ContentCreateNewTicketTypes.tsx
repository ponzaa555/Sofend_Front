import React from 'react'

interface NewTicketTypesInfo {
    name: string;
    quantityAvailable: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    ticketPrice: string;
}

const ContentCreateNewTicketTypes = () => {
    // const jsonNewTicketTypesInfo: NewTicketTypesInfo = {
    //     name: ...;
    //     quantityAvailable: ...;
    //     startDate: ...;
    //     endDate: ...;
    //     startTime: ...;
    //     endTime: ...;
    //     ticketPrice: ...;
    // }

    return (
        <div>
            <div className='text-xl font-bold pb-2'>
                Create New Ticket Type
            </div>
            <div className='text-xl font-bold py-2'>
                Details
            </div>
            <div className='flex justify-between'>
                <div className='w-2/3 pr-10 pb-2'>
                    <div className='flex'>
                        <p>Name</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div className='pb-2'>
                        <input type="text" className='border border-black rounded-md w-full px-4'/>
                    </div>
                    <div className='flex'>
                        <p>Quantity Available</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div>
                        <input type="text" className='border border-black rounded-md w-full px-4'/>
                    </div>
                </div>
                <div className='w-1/3'>
                    <p className='font-bold'>Quantity Available</p>
                    <p>Number of available tickets for sale of this ticket type.</p>
                </div>
            </div>
            <div className='text-xl font-bold py-2'>
                Sales Period
            </div>
            <div className='flex justify-between pb-2'>
                <div className='flex w-2/3'>
                    <div className= 'w-2/3 pr-6'>
                        <div className='flex'>
                            <p>Start at date</p>
                            <p className='text-red-600'>*</p>
                        </div>
                        <div className='pb-2'>
                            <input type="text" className='border border-black rounded-md w-full px-4'/>
                        </div>
                        <div className='flex'>
                            <p>End at date</p>
                            <p className='text-red-600'>*</p>
                        </div>
                        <div>
                            <input type="text" className='border border-black rounded-md w-full px-4'/>
                        </div>
                    </div>
                    <div className='w-1/3 pr-10'>
                        <div className='flex'>
                            <p>Start time</p>
                            <p className='text-red-600'>*</p>
                        </div>
                        <div className='pb-2'>
                            <input type="text" className='border border-black rounded-md w-full px-4'/>
                        </div>
                        <div className='flex'>
                            <p>End time</p>
                            <p className='text-red-600'>*</p>
                        </div>
                        <div>
                            <input type="text" className='border border-black rounded-md w-full px-4'/>
                        </div>
                    </div>
                </div>
                <div className='w-1/3'>
                    <p className='font-bold'>Sales Period</p>
                    <p>Providing accurate date and time of sales period is crucial.12:00 PM - Midday12:00 AM - Midnight</p>
                </div>
            </div>
            <div className='text-xl font-bold py-2'>
                Pricing
            </div>
            <div className='flex justify-between'>
                <div className='w-2/3 pr-10'>
                    <div className='flex '>
                        <p>Ticket Price (Baht)</p>
                        <p className='text-red-600'>*</p>
                    </div>
                    <div className='pb-16'>
                        <input type="text" className='border border-black rounded-md w-full px-4'/>
                    </div>
                    <div className='flex justify-between'>
                        <button className='border border-black rounded-lg text-l text-black bg-white hover:bg-black hover:text-white w-2/12 py-1'>
                            <h1 className='font-montserrat font-bold '>Cancel</h1>
                        </button>
                        <button className='border border-black rounded-lg text-l text-white bg-black hover:bg-white hover:text-black w-3/12'>
                            <h1 className='font-montserrat font-bold '>Save</h1>
                        </button>
                    </div>
                </div>
                <div className='w-1/3'>
                    <p className='font-bold'>Pricing</p>
                    <p>The Ticket Pricing section offers potential attendees a clear understanding of the pricing structure.</p>
                </div>
            </div>
            <div className='pb-1 pt-20'>
                <div className='flex justify-center text-3xl font-bold font-montserrat'>
                    EventBud
                </div>
                <div className='flex justify-center text-sm font-montserrat' >
                    all right reserved
                </div>
            </div>
        </div>
    )
}

export default ContentCreateNewTicketTypes