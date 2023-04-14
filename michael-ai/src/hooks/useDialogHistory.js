import { useEffect, useState } from "react"

export const useDialogHistory = () => {
    const [dialog, setDialog] = useState([])

    useEffect(() => {
        getHistory()
    }, [])

    const getHistory = async () => {
        const messages = await chrome.runtime.sendMessage({ task: 'history' })
        messages && setDialog(messages)
    }

    const delHistory = async () => {
        await chrome.runtime.sendMessage({ task: 'delHistory' })
    }

    const addDialog = newDialogs => {
        setDialog(p => [...p, ...newDialogs]) 
    }

    const clear = () => {
        delHistory()
        setDialog([])
    }

    return {
        dialog,
        addDialog,
        clear,
    }
}