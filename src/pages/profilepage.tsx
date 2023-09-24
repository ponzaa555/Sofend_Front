import React, {useEffect, useState} from 'react'
import Navbar from '~/components/navbar'
import Profilepage from '~/components/events/profilepon'
import { useSession } from 'next-auth/react'


const profilepage = ({}) => {

    const {data:session} = useSession()


   
    return(
        <div className= 'bg-slate-100 h-screen'>
            <div>
                <Navbar/>
            </div>
            <Profilepage 
            Name = {session?.user?.name as string}
            Gmail = {session?.user?.email as string}
            />
        </div>
       
    )
}
export default profilepage