import React, {useEffect, useState} from 'react'
import Navbar from '~/components/navbar'
import Profilepage from '~/components/events/profilepon'
import { useSession } from 'next-auth/react'


const profilepage = () => {

    const {data:session} = useSession()

   
    return(
        <div className= 'bg-slate-100 h-screen'>
            <div className=' shadow-lg'>
                <Navbar/>
            </div>
            <Profilepage Name = {session?.user?.name as string}/>
        </div>
       
    )
}
export default profilepage