'use client';

import { useUser } from "@/hooks/models";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from "react";

export const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { create: signup } = useUser();
    const router = useRouter();

    async function onSignup(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await signup({ data: { email, password } });
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
        await signIn('credentials', { redirect: false, email, password });
        await router.push('/');
    }

    if(loading) {
        return null;
    }

    return (
        <form className="mt-16 flex flex-col gap-8 text-2xl" onSubmit={(e) => void onSignup(e)}>
            <div>
                <label htmlFor="email" className="inline-block w-32 text-white">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    className="ml-4 w-72 rounded border p-2"
                />
            </div>
            <div>
                <label htmlFor="password" className="inline-block w-32 text-white ">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    className="ml-4 w-72 rounded border p-2"
                />
            </div>
            <input
                type="submit"
                value="Create account"
                className="cursor-pointer rounded border border-gray-500 py-4 text-white"
            />
        </form>)
}