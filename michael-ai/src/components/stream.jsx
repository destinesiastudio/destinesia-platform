import React, { useEffect, useState } from 'react'

export const Stream = () => {
    const [response, setResponse] = useState()
    const [listening, setListening] = useState()
    // useEffect(() => {
    //     const events = new EventSource("http://localhost:8080/api/generate")
    //     if(!listening) {
    //         events.onmessage = event => {
    //             setResponse(event.data)
    //             console.log('parsedData', event.data)
    //         }

    //         setListening(true)
    //     }
    // }, [listening, response])

    // const generateResponse = () => {
    //     setResponse('')

    //     const events = new EventSource("http://localhost:8080/api/generate")
    //     if(!listening) {
    //         events.onmessage = event => {
    //             const parsedData = JSON.parse(event.data)
    //             setResponse(parsedData)
    //             console.log('parsedData', parsedData)
    //         }

    //         setListening(true)
    //     }
    // }

    useEffect(() => {
        generateResponse()
    }, [])

    const generateResponse = async () => {
        console.log('generateResponse')
        setResponse("");

        const response = await fetch("http://localhost:8080/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: 'Good day to you sir!'
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
            console.log('not a stream')
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setResponse((prev) => prev + chunkValue);
        }
    }

    return (
        <div>{response}</div>
    )
}