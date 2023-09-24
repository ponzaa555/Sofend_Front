import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { sign } from 'crypto';


const profile = () => {
    const {data:session} = useSession();
 
    if (session){
        return (
            <div>
                <h1>{session.user?.email}</h1>
                <button
                    onClick={() => signOut()}
                >Sign out</button>
            </div>
        )
    }

    return (
        <button onClick={() => signIn()} className="font-montserrat font-bold text-xl">Sign In</button>
    )
}

export default profile