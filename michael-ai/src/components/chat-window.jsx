import React, { useContext } from 'react'
import styled from 'styled-components'
import { DialogContext } from './dialog-provider'
import { ResponseLoading } from './response-loading'

export const ChatWindow = () => {
    const { list, loading } = useContext(DialogContext)

    return (
        <DialogList>
            {loading ?
                <DialogListLoading>
                    <ResponseLoading />
                </DialogListLoading>
            : null}
            {list.slice().reverse().map(({ role, content }, i) => 
                <DialogListItem key={i} role={role}>
                    { content }
                </DialogListItem>
            )}
        </DialogList>
    )
}

const DialogList = styled.div`
    flex: 1;
    width: 100%;
    background: rgb(47, 48, 49);
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
`

const DialogListItem = styled.div`
    align-self: ${props => props.role === 'assistant' ? 'flex-start' : 'flex-end' };
    padding: 8px;
    margin: 12px;
    max-width: 66%;
    border-radius: 4px;
    white-space: pre-line;

    background: white;
    box-shadow: 0 8px 8px -4px rgb(226, 222, 219);
`

const DialogListLoading = styled(DialogListItem)`
    align-self: flex-start;
    padding-right: 48px;
    display: grid;
    place-content: center;
`