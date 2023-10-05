import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';

const createevent = () => {
    const {data:session} = useSession();

    if (session) {
        <a href="/auth/signinEO">
            <button className="font-montserrat text-xl"
            onClick={() => signOut({callbackUrl: '/main'})}
            >Event Organizer</button>
        </a>
    }

    return (
        <a href="/auth/signinEO">
            <button className="font-montserrat text-xl">Event Organizer</button>
        </a>
    )
}

export default createevent