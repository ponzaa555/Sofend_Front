import React from "react";
import Image from "next/image";

const Component2 = () => {
    return (
        <div className=''>
            <div className='mx-56 pt-5 pb-8'>
                <Image className='' src="/images/events/Timeline2nd.png" width={500} height={500} style={{ width: '100%', height: '100%' }} alt="Timeline1stStep"/>
            </div>
            <div className='font-montserrat mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className='text-2xl font-bold'>
                    <h1>Payment</h1>
                </div>
            </div>
        </div>
    )
}

export default Component2