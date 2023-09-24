import Link from 'next/link'
import React from 'react'

interface TicketClassProps {
    nameOfZone: string;
    pricePerSeat: number;
    amountOfSeat: number;
}


const genTicketClass:React.FC<TicketClassProps> = ({nameOfZone,pricePerSeat,amountOfSeat}) => {
    //logic for check available
    const isAvailable = true

    return (
                <Link href='/' className='flex flex-row w-fit gap-2'>
                    <svg height="50" width="50">
                        <circle cx="25" cy="25" r="21" fill={isAvailable? "green":"red"} />
                    </svg>
                    <div className='font-montserrat font-bold flex flex-col justify-start'>
                        <h1 className={``}>{`${nameOfZone}-${pricePerSeat}฿`}</h1>
                        <h2 className={isAvailable? "text-green-500":"text-red-500"}>
                            {isAvailable? "Available":"SOLD OUT"}
                        </h2>
                    </div>
                </Link>
    )
}

export default genTicketClass