"use client"

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import { FormEventHandler } from "react";

export const UserNav = () => {
    const session = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut()
        router.push('/')
    }

    const handleSignIn:FormEventHandler = (e) => {
        e.preventDefault();
        const responseBody: Record<string, FormDataEntryValue> = {}        
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        formData.forEach((value, property:string) => responseBody[property] = value);
        console.log(JSON.stringify(responseBody))
    }    

    if (!session || session.status === 'loading') {
        return null;
    }
    if (session && session.status === 'unauthenticated') {
        return <div className="flex space-x-2">
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost rounded-btn">Sign in</label>
                <form tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow-xl" onSubmit={handleSignIn}>
                    <div className="card-body">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Your email address</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered w-full max-w-xs input-sm" name="email" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Your password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered w-full max-w-xs input-sm" name="password" />
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Sign in!</button>
                    </div>
                </form>
            </div>
            <a className="btn btn-ghost rounded-btn" href="/signup">Sign up</a></div>
    }
    return <button className="btn btn-ghost" onClick={() => handleSignOut()}>Sign out</button>
}