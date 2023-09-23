import React, {useEffect, useState} from 'react'
import Navbar from '~/components/navbar'
import Profilepage from '~/components/events/profilepon'



const profilepage = () => {
    
    return(
        <div className= 'bg-slate-100 h-screen'>
            <div className=' shadow-lg'>
                <Navbar/>
            </div>
            <Profilepage/>
        </div>
       
    )
}
export default profilepage