import React from 'react'
import { DialogProvider } from '@components/dialog-provider'
import { ChatWindow } from '@components/chat-window'
import { ChatInput } from '@components/chat-input'
import { ExitButton } from '@components/exit-button'
import { FloatButton } from '@components/float-button'

export default () => {
    return (
        <DialogProvider>
            <ExitButton />
            <FloatButton />
            <ChatWindow />
            <ChatInput />
        </DialogProvider>
    )
}