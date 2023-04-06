import React from 'react'
import { DialogProvider } from '@components/dialog-provider'
import { ChatWindow } from '@components/chat-window'
import { ChatInput } from '@components/chat-input'
import { ExitButton } from '@components/exit-button'

export default () => {
    return (
        <DialogProvider>
            <ExitButton />
            <ChatWindow />
            <ChatInput />
        </DialogProvider>
    )
}