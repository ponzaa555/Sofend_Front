import React from 'react'
import Link from 'next/link'
import PersonCircleBlack from './icon/PersonCircleBlack';
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import { signIn } from 'next-auth/react';


const profile = () => {
    const {data:session} = useSession();
 
    if (session){
        return (
            <div>
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    <Link href="/myticket" className="font-montserrat font-bold text-xl">
                            <p>My Ticket</p>
                    </Link>
                    <ul className="items-center justify-center space-y-8 md:flex md:space-x-2 md:space-y-0">
                        <Link href="/profilepage">
                            <PersonCircleBlack/>
                        </Link>
                        <button className='font-medium'
                            onClick={() => signOut({callbackUrl: '/main'})}
                        >Sign out</button>
                    </ul>
                </ul> 
            </div>
        )
    }

    return (
        <button onClick={() => signIn()} className="font-montserrat font-bold text-xl">Sign In</button>
    )
}

export default profile
