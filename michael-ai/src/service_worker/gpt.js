import { addDialog } from "./dialog-history"

let _response = ''

export const response = () => {
    return _response
}

export const generateResponse = async prompt => {
    if(_response !== '') {
        addDialog([{ role: 'assistant', content: ` ${_response}`.slice(1) }, { role: 'user', content: prompt }])
    } else {
        addDialog([{ role: 'user', content: prompt }])
    }

    clearResponse()

    const res = await fetch(
        `${process.env.BASE_URL}/gpt?user=${process.env.USER}`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        }
    )

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    // This data is a ReadableStream
    const data = res.body;
    if (!data) {
        console.log('not a stream')
        return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        _response += chunkValue

        try {
            await chrome.runtime.sendMessage({ task: 'updateResponse', data: _response })
        } catch {}
    }

    try {
        await chrome.runtime.sendMessage({ task: 'completeResponse' })
    } catch {}
    
    addAssistantDialog(_response)
}

export const interrupt = async () => {
    await fetch(
        `${process.env.BASE_URL}/interrupt?user=${process.env.USER}`,
        { method: "POST" }
    )
}

const clearResponse = () => {
    _response = ''
}