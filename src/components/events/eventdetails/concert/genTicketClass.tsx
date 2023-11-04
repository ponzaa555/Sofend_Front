import Link from 'next/link'
import React from 'react'
import {useRouter} from 'next/router'


interface TicketClassProps {
    nameOfZone: string;
    pricePerSeat: number;
    amountOfSeat: number;
    onSelect: () => void;
    isAvailable: boolean;
}


const genTicketClass:React.FC<TicketClassProps> = ({nameOfZone,pricePerSeat,amountOfSeat,onSelect,isAvailable}) => {
    //logic for check available
    const router = useRouter()
    const {id} = router.query as {id:string}
    const handleClick = () => {
        if(isAvailable){
            onSelect();
        }
        else{
            return;
        }
    }

    return (
                <div onClick={handleClick} className='flex flex-row w-fit gap-2 hover:cursor-pointer'>
                    <svg height="50" width="50">
                        <circle cx="25" cy="25" r="21" fill={isAvailable? "green":"red"} />
                    </svg>
                    <div className='font-montserrat font-bold flex flex-col justify-start'>
                        <h1 className={``}>{`${nameOfZone}-${pricePerSeat}฿`}</h1>
                        <h2 className={isAvailable? "text-green-500":"text-red-500"}>
                            {isAvailable? "Available":"SOLD OUT"}
                        </h2>
                    </div>
                </div>
    )
}

export default genTicketClass