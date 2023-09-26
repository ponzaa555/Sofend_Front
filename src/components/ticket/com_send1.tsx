import React from "react";
import ComponentSend2 from "./com_send2";
import { useState } from "react";
import Link from "next/link";

const ComponentSend1 = () => {

    const [Send, setSend] = useState(false);

    const onSubmit = () => {
        setSend(true);
    }

    const cancelHandle = () => {
        <Link href="/myticket"></Link>
    }

    return (
        <>
            {Send ? <ComponentSend2 /> :
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
                            {/* <form className="">
                                <input className="border-2 border-gray-300 rounded-md pl-2 w-[22rem] py-1" type="email" placeholder="" required></input>
                            </form> */}
                            <form onSubmit={onSubmit}>
                                <input className="border-2 border-gray-300 rounded-md pl-2 w-[22rem] py-2" type="email" placeholder="Email" id='email_signUp'
                                    // value={info.email}
                                    // onChange={e => setInfo({...info, email: e.target.value})}
                                    name="email"
                                    required
                                />
                                <button type="submit" className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold py-2 rounded mt-2 mb-2 box-content w-[21.75rem]
                             mr-5 font-montserrat">send</button>
                            </form>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default ComponentSend1;