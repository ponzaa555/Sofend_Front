import React from "react";

const Component3 = () => {
    return (
        <div className=''>
            {/* timeline steps*/}
            <div className='relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg '>
                <div
                    className="relative z-10 flex text-sm font-medium text-white w-3/4 max-w-4xl m-auto items-center  py-6"
                >   
                    <li
                        className="flex items-center gap-2 p-2"
                    >
                        <span
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#54D260] text-6xl text-center font-montserrat font-bold w-28 h-28`}
                        >1
                        </span>
                    </li>
                    <div className="w-full h-0 border-2 border-green-400 border-dashed"></div>
                    <li
                        className="flex items-center gap-2 p-2"
                    >
                        <span
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#54D260] text-6xl text-center font-montserrat font-bold w-28 h-28`}
                        >2
                        </span>
                    </li>
                    <div className="w-full h-0 border-2 border-green-400 border-dashed"></div>
                    <li
                        className="flex items-center gap-2 p-2"
                    >
                        <span
                            className={`flex justify-center items-center rounded-full border-2 border-[#54D260] bg-[#54D260] text-6xl text-center font-montserrat font-bold w-28 h-28`}
                        >3
                        </span>
                    </li>
                </div>
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