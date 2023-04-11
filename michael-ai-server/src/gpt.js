import { createParser } from "eventsource-parser"
import { chatHistory, updateChatHistory } from "./history"

export 

const addHistory = async (user, prompt) => {
    const configuration = { role: 'system', content: 'You are a helpful assistant.' }

    const history = await chatHistory(user)

    if(!history) {
        return [
            configuration,
            { role: 'user', content: prompt }
        ]
    }

    return [
        configuration,
        ...history.map(el => JSON.parse(el)),
        { role: 'user', content: prompt }
    ]
}

const saveToHistory = async (user, prompt, fullMessage) => {
    await updateChatHistory(
        user,
        [
            { role: 'user', content: prompt },
            { role: 'assistant', content: fullMessage }
        ]
    )
}

export const openAIStream = async (user, prompt, socket, signal) => {
    const messages = await addHistory(user, prompt)

    const payload = {
        model: "gpt-4",
        messages,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 3000,
        stream: true,
        n: 1,
    }

    // const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let counter = 0
    let fullMessage = ''

    function onParse(event) {
        if (event.type === "event") {
            const data = event.data;
            // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
            if (data === "[DONE]") {
                socket.end()
                return
            }
            try {
                const json = JSON.parse(data);
                const text = json.choices[0].delta?.content || "";
                if (counter < 2 && (text.match(/\n/) || []).length) {
                    // this is a prefix character (i.e., "\n\n"), do nothing
                    return
                }
                // const queue = encoder.encode(text)
                fullMessage += text
                socket.write(text)
                counter++
            } catch (e) {
                // maybe parse error
                socket.error(e)
            }
        }
    }

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
            },
            signal,
            method: "POST",
            body: JSON.stringify(payload),
        })

        // stream response (SSE) from OpenAI may be fragmented into multiple chunks
        // this ensures we properly read chunks and invoke an event for each SSE event stream
        const parser = createParser(onParse)
        // https://web.dev/streams/#asynchronous-iteration
        for await (const chunk of res.body) {
            parser.feed(decoder.decode(chunk))
        }

        await saveToHistory(user, prompt, fullMessage)
    } catch(e) {
        if(e instanceof DOMException) {
            console.log('Interrupted by frontend')
        } else {
            console.error(e)
        }
    }    
}