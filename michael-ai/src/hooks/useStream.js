import { useState } from "react"

export const useStream = (url, interruptUrl) => {
    const [response, setResponse] = useState('')

    const generateResponse = async (prompt) => {
        const res = await fetch(url, {
            method: "POST",
            // signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        })

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        // This data is a ReadableStream
        const data = res.body;
        if (!data) {
            console.log('not a stream')
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            setResponse((prev) => prev + chunkValue)
        }
    }

    const clearResponse = () => {
        setResponse('')
    }

    const interrupt = async () => {
        await fetch(interruptUrl, { method: "POST" })
    }

    return {
        response,
        generateResponse,
        clearResponse,
        interrupt
    }
}