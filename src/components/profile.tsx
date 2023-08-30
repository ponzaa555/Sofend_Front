import React from 'react'
import { useSession } from 'next-auth/react'




const profile = () => {
    const {data:session} = useSession();
 
    if (session){
        const {user} = session;
        return (
            <div>
                <h1>Profile</h1>
                <p>{user.email}</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>You are not signed in</p>
        </div>
    )
}

export default profile