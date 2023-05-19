'use client';

import { useUser } from "@/hooks/models";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from "react";

export const SignupForm = () => {
    const [loading, setLoading] = useState(false);
    const { create: signup } = useUser();
    const router = useRouter();

    async function onSignup(e: FormEvent) {
        e.preventDefault();
        const data: Record<'email' | 'password', string> = { email: '', password: '' }
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        formData.forEach((value, property: 'email' | 'password' | string) => {
            if (property === 'email') {
                data.email = value.toString();
            }
            if (property === 'password') {
                data.password = value.toString();
            }
        });
        setLoading(true);
        try {
            await signup({ data });
        } catch (err: any) {
            console.error(err);
            if (err.info?.prisma && err.info?.code === 'P2002') {
                // P2002 is Prisma's error code for unique constraint violations
                alert('User alread exists');
            } else {
                alert('An unknown error occurred');
            }
            return;
        }

        // signin to create a session
        await signIn('credentials', { redirect: false, ...data });
        router.push('/');
    }

    if (loading) {
        return null;
    }

    return (
        <div className="flex justify-center">
            <form tabIndex={0} className="dropdown-content card card-compact w-64 p-2" onSubmit={onSignup}>
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
                    <button className="btn btn-primary">Sign up!</button>
                </div>
            </form>
        </div>
    )
}