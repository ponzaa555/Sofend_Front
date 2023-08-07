import React from 'react';
import Close from '../icon/Close';

export default function Mymodal({visible,onClose}) {
    if(!visible) return null;

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className='bg-white p-2 rounded-md w-96 h-96'>
                <button className='grid justify-items-end' onClick={onClose}><Close></Close></button>
                <div className='grid grid-rows-2 place-items-center'>
                    <div className="w-20 h-20 overflow-hidden rounded-full border border-gray-300 mb-2 mt-2 ml-5">
                        <img src='https://s-media-cache-ak0.pinimg.com/originals/45/8b/be/458bbe24f9c6f35c2148e30a926976c8.jpg'/>
                    </div>
                    <div className="font-montserrat font-bold">Live Nation Tero</div>
                </div>
                <div className='grid grid-rows-3 justify-around'>
                <div className='grid grid-cols-2'>
                    <div className="font-montserrat font-bold">Facebook</div>
                    <div className="font-montserrat">Live Nation Tero</div>
                </div>
                <div className='grid grid-cols-2'>
                    <div className="font-montserrat font-bold">Website</div>
                    <p className="font-montserrat">livenationtero.co.th</p>
                </div>
                <div className='grid grid-cols-2'>
                    <div className="font-montserrat font-bold">Email</div>
                    <p className="font-montserrat">info@livenation.co.th</p>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}