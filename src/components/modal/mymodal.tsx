import React from 'react';
import Close from '../icon/Close';

export default function Mymodal({visible,onClose,organizerName}) {
    if(!visible) return null;

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className='bg-white p-2 rounded-md w-96 h-96'>
                <div className='grid justify-items-end'>
                <button onClick={onClose}><Close></Close></button>
                </div>
                <div className='grid grid-rows-2 place-items-center'>
                    <div className="w-20 h-20 overflow-hidden rounded-full border border-gray-300 mb-2 mt-2 ml-5">
                        <img src='../images/events/profileblack.png'/>
                    </div>
                    <div className="font-montserrat font-bold">{organizerName}</div>
                </div>
                <div className='flex flex-cols-2 justify-evenly gap-4'>
                    <div className="font-montserrat font-bold">Email</div>
                    <p className="font-montserrat">info@livenation.co.th</p>
                </div>
                </div>
            </div>
        </>
    );
}