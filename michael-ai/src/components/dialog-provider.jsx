import React, { createContext, useEffect, useState } from 'react'
import { useGpt } from '@hooks/useGpt'
import { useDialogHistory } from '@hooks/useDialogHistory'

export const DialogContext = createContext()

export const DialogProvider = props => {
    const { dialog, addDialog, clear: clearHistory } = useDialogHistory()
    const { response, generateResponse, clearResponse, interrupt: interruptGpt, isComplete } = useGpt()
    const [loading, setLoading] = useState(false)

    useEffect(() => setLoading(!isComplete), [isComplete])

    const update = async content => {
        if(response !== '') {
            addDialog([{ role: 'assistant', content: ` ${response}`.slice(1) }, { role: 'user', content }])
        } else {
            addDialog([{ role: 'user', content }])
        }

        clearResponse()
        
        setLoading(true)
        await generateResponse(content)
    }

    const clear = () => {
        setLoading(true)
        clearHistory()
        setLoading(false)
        clearResponse()
    }

    const interrupt = async () => {
        await interruptGpt()
        setLoading(false)
    }

    return (
        <DialogContext.Provider
            value={{
                list: dialog,
                response,
                loading,
                update,
                clear,
                interrupt
            }}
        >
            {props.children}
        </DialogContext.Provider>
    )
}