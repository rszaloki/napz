"use server"

export const greeting = async () => {
    console.log('hello!');
    
    return {data:'hello', ts: Date.now()}
}