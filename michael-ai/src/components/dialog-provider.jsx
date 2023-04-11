import React, { createContext, useEffect, useState } from 'react'
import { useStream } from '@hooks/useStream'

export const DialogContext = createContext()

export const DialogProvider = props => {
    const auth = `Bearer ${process.env.TOKEN}`
    const user = process.env.USER
    const { response, generateResponse, clearResponse, interrupt } = useStream(
        `${process.env.BASE_URL}/gpt?user=${process.env.USER}`,
        `${process.env.BASE_URL}/interrupt?user=${process.env.USER}`
    )
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState([])

    const update = content => {
        if(response !== '') {
            setDialog(p => [...p, { role: 'assistant', content: ` ${response}`.slice(1) }, { role: 'user', content }])
        } else {
            setDialog(p => [...p, { role: 'user', content }])
        }
        clearResponse()        
        getAnswer(content)
    }

    const clear = () => {
        delHistory(dialog)
        setDialog([])
        clearResponse()
    }

    const getAnswer = async prompt => {
        setLoading(true)
        await generateResponse(prompt)
        setLoading(false)
    }

    const getHistory = async () => {
        const res = await fetch(
            process.env.BASE_URL + `/history?user=${user}`,
            { headers: { 'Authorization': auth } }
        )
        const { messages } = await res.json()

        messages && setDialog(messages.map(el => JSON.parse(el)))
    }

    const delHistory = async current => {
        setLoading(true)

        try {
            const res = await fetch(
                process.env.BASE_URL + `/history?user=${user}`,
                { headers: { 'Authorization': auth }, method: 'DELETE' }
            )

            if(res.status !== 200) {
                setDialog(current)
            }
        } catch {
            setDialog(current)
        }

        setLoading(false)
    }

    const interruptGpt = async () => {
        await interrupt()
        setLoading(false)
    }

    useEffect(() => {
        getHistory()
    }, [])

    return (
        <DialogContext.Provider
            value={{
                list: dialog,
                response,
                loading,
                update,
                clear,
                interrupt: interruptGpt
            }}
        >
            {/* <Stream /> */}
            {props.children}
        </DialogContext.Provider>
    )
}