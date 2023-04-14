import { useEffect, useState } from "react"

export const useGpt = () => {
    const [response, setResponse] = useState('')
    const [isComplete, setIsComplete] = useState(true)

    useEffect(() => {
        getResponse()

        chrome.runtime.onMessage.addListener(({ task, data }) => {
            if(task === 'updateResponse') {
                setIsComplete(false)
                setResponse(data)
            } else if(task === 'completeResponse') {
                setIsComplete(true)
            }
        })
    }, [])

    const getResponse = async () => {
        const message = await chrome.runtime.sendMessage({ task: 'response' })
        setResponse(message)
    }

    const generateResponse = async (prompt) => {
        setIsComplete(false)
        await chrome.runtime.sendMessage({ task: 'generateResponse', data: prompt })
    }

    const clearResponse = () => {
        setResponse('')
    }

    const interrupt = async () => {
        await chrome.runtime.sendMessage({ task: 'interrupt' })
    }

    return {
        response,
        isComplete,
        generateResponse,
        clearResponse,
        interrupt
    }
}