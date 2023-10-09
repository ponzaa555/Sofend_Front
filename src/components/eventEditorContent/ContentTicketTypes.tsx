import React, { useState } from 'react';
import ContentCreateNewTicketTypes from './ContentCreateNewTicketTypes';

const ContentTicketTypes = () => {
    const [handleCreateNewTicketType, sethandleCreateNewTicketType] = useState(false)

    const handleButton = () => {
        sethandleCreateNewTicketType(true)
    }

  return (
        <>
            { handleCreateNewTicketType == false ?
                <>
                    <div className="divide-y-2">
                    <div className="flex justify-between my-5">
                        <div className="font-bold text-4xl">Ticket Types</div>
                        <button className="bg-black text-white border-2 border-black hover:bg-white hover:text-black font-bold text-base py-2 px-4 rounded-lg"
                            onClick={handleButton}>
                            create new ticket type
                        </button>
                    </div>
                    <div>
                        <ul className="flex flex-row justify-between my-5 mx-20 font-bold text-xl">
                        <li>Name</li>
                        <li></li>
                        <li>Price</li>
                        <li>Sold</li>
                        <li>Quota</li>
                        </ul>
                    </div>
                    <div></div>
                    </div>
                    <div className="flex flex-grow flex-col text-center my-5">
                        <div className="font-bold text-4xl">EventBud</div>
                        <div className="">all right reserved</div>
                    </div>
                </>
                : <ContentCreateNewTicketTypes/>
            }
        </>
    )
}

export default ContentTicketTypes;
