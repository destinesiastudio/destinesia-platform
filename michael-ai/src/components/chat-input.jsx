import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { DialogContext } from './dialog-provider'
import { BorderedButton } from './bordered-button'
import { BorderedInput } from './bordered-input'
import recycleIcon from '../assets/recycle-solid.svg'
import { useTranslation } from 'react-i18next'

export const ChatInput = () => {
    const { t } = useTranslation()
    const { list, loading, update, clear, interrupt, response } = useContext(DialogContext)
    const [text, setText] = useState('')

    const submit = () => {
        update(text)
        setText('')
    }

    return (
        <View>
            <InputBox
                placeholder={t('say something...')}
                draggable='false'
                minRows='2'
                value={text}
                onKeyDown={e => {
                    if(e.key === 'Enter' && !loading) {
                        e.preventDefault()
                        e.stopPropagation()
                        submit()
                    }
                }}
                onChange={e => setText(e.target.value)}
            />
            <BorderedButton onClick={() => loading && response !== '' ? interrupt() : submit()}>
                { loading && response !== '' ? t('Stop') : t('Send') }
            </BorderedButton>
            <ClearButton disabled={loading || list.length === 0} onClick={() => clear()}>
                <img height='24px' width='24px' src={recycleIcon} />
            </ClearButton>
        </View>
    )
}

const View = styled.div`
    display: flex;
    flex-direction: row;
    background: rgb(47, 48, 49);
`

const InputBox = styled(BorderedInput)`
    flex: 1;
`

const ClearButton = styled.button`
    cursor: ${({ disabled }) => disabled ? 'normal' : 'pointer' };
    filter: ${({ disabled }) => disabled ? 'grayscale(0.9)' : 'grayscale(0)' };
    padding: 0 14px;
    margin: 2.5px 4px;
    background: none;
    border: solid 4px transparent;

    & > img {
        border-radius: 4px;
    }

    &:hover {
        border-color: rgba(0,0,0,0.07);
        border-radius: 4px;
    }
`