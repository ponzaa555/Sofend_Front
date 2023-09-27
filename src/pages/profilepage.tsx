import React, {useEffect, useState} from 'react'
import Navbar from '~/components/navbar'
import Profilepage from '~/components/events/profilepon'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import toast, {Toaster} from "react-hot-toast";

interface edit_profile {
    firstname : string;
    lastname : string;
    email : string;
    telephoneNumber : string;
}

const profilepage = ({}) => {

    const {data:session} = useSession()
   

    // console.log("page: ",session)
    

  
    // console.log("data1: ",data1)
   
    return(
        <div className= 'bg-slate-100 h-screen relative'>
            <div className='h-16'>
                <Navbar/>
            </div>
            <div className=' flex justify-center h-24 pt-9'>
                <div className='flex w-[18%]'>
                    <h1 className='text-4xl font-bold  '>Hello, </h1>
                    <h1 className='text-4xl font-bold '>Woohoo</h1>
                </div>
                <div className=' w-3/5'>
                </div>
                <div className='text-4xl'></div>
            </div>
            <Profilepage 
                Name = {session?.user?.name}
                Gmail = {session?.user?.email as string}
                Fname = {session?.user?.name?.split(" ")[0] as string}
                Lname = {session?.user?.name?.split(" ")[1] as string}
                Id = {session?.user.userID as string }
            />
            <div className=' absolute bottom-0 inset-x-24 pb-3 '>
                <div className='flex justify-center text-3xl font-bold font-montserrat'>
                    EventBud
                </div>
                <div className='flex justify-center text-sm font-montserrat' >
                    all right reserved
                </div>
            </div>
           
        </div>
    )
}
export default profilepage