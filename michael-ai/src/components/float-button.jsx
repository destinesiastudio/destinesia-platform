import React from 'react'
import styled from 'styled-components'
import thumbtackIcon from '../assets/thumbtack-solid.svg'

export const FloatButton = () => {
    const toggleFloat = async () => {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
            await chrome.runtime.sendMessage({ task: 'toggleFloat', data: tab.id })
            window.close()
        } catch {
            console.log('Tab querying failed')
        }
    }

    return (
        <AbsoluteButton onClick={() => toggleFloat()}>
            <img height='20px' width='20px' src={thumbtackIcon} />
        </AbsoluteButton>
    )
}

const AbsoluteButton = styled.button`
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 82px;
    height: 20px;
    width: 20px;
    border: none;
    background: none;
`