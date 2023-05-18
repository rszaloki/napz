"use client"

import { useSession } from "next-auth/react"

export const UserNav = () => {
    const session  = useSession();
    if(!session || session.status === 'loading') {
        return null;
    }
    if(session && session.status === 'unauthenticated') {
        return <div className="flex space-x-2"><a href="">Sign in</a><a href="/signup">Sign up</a></div>
    }
    return <div>{JSON.stringify(session)}</div>
}