import React from "react";

const ComponentSend1 = () => {
    return(
        <>
        <div className="bg-[#F9F9F9] rounded-md basis-2/4 p-8 h-[375px]"> 
            <div className="flex flex-col justify-center items-center gap-8">
                <div className="">
                    <div className="font-montserrat text-xl text-red-600">After sending this ticket, it will belong to them and removed out of your ‘My Ticket’ menu.</div>
                    <div className="font-montserrat text-xl font-bold text-red-600">This action cannot be undone.</div>
                </div>
                <div className="self-start">
                    <div className="flex flex-row">
                        <p className="font-montserrat font-bold text-black text-xl">Your friend’s email</p>
                        <span className="text-red-600 ml-1 text-lg font-bold">*</span>
                    </div>
                    <form className="">
                        <input className="border-2 border-gray-300 rounded-md pl-2 w-[22rem] py-1" type="text" placeholder=""></input>
                    </form>
                </div>
                <div className="flex flex-row justify-between">
                    <button className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold py-2 rounded mt-2 mb-2 box-content h-6 w-32 mr-5 font-montserrat">cancel</button>
                    <button className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold py-2 rounded mt-2 mb-2 box-content h-6 w-32 mr-5 font-montserrat">send</button>
                </div>
            </div>
        </div>
        </>
    )
    }

    export default ComponentSend1;