import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import { signIn } from 'next-auth/react';


const createevent = () => {
    return (
        <button onClick={() => signIn()} className="font-montserrat text-xl">Event Organizer</button>
    )
}

export default createevent