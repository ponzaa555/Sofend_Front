import React from "react";
import Image from "next/image";

const Component3 = () => {
    return (
        <div className=''>
            <div className='mx-56 pt-5 pb-8'>
                <Image className='' src="/images/events/Timeline3rd.png" width={500} height={500} style={{ width: '100%', height: '100%' }} alt="Timeline1stStep"/>
            </div>
            <div className='text-center font-black text-2xl py-36'>
                <p >Congratulations!</p>
                <p>You can access all the ticket at My Ticket menu.</p>
                <p>Enjoy your event!</p>
            </div>
        </div>
    )
}

export default Component3