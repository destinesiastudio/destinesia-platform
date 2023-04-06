import React, { createContext, useEffect, useState } from 'react'

export const DialogContext = createContext()

export const DialogProvider = props => {
    const auth = `Bearer ${process.env.TOKEN}`
    const user = process.env.USER
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState([])

    const update = content => {
        setDialog(p => [...p, { role: 'user', content }])
        getAnswer(content)
    }

    const clear = () => {
        delHistory(dialog)
        setDialog([])
    }

    const getAnswer = async prompt => {
        setLoading(true)

        const res = await fetch(
            process.env.BASE_URL + `/gpt?user=${user}`, 
            {
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: 'POST',
                body: JSON.stringify({ prompt })
            }
        )
        const content = await res.text()

        setLoading(false)
        setDialog(p => [...p, { role: 'assistant', content }])
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

    useEffect(() => {
        getHistory()
    }, [])

    return (
        <DialogContext.Provider
            value={{
                list: dialog,
                loading,
                update,
                clear
            }}
        >
            {props.children}
        </DialogContext.Provider>
    )
}