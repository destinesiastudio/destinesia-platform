import { useEffect, useState } from "react"

export const useGpt = () => {
    const [response, setResponse] = useState('')
    const [isComplete, setIsComplete] = useState(true)

    useEffect(() => {
        chrome.runtime.onMessage.addListener(({ task, data }) => {
            if(task === 'updateResponse') {
                setIsComplete(false)
                setResponse(data)
            } else if(task === 'completeResponse') {
                setIsComplete(true)
            }
        })
    }, [])

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