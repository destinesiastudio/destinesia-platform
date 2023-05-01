import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const TabIdentifier = () => {
    const [title, setTitle] = useState('')
    
    useEffect(() => {
        getTabTitle()
        chrome.runtime.onMessage.addListener(getTabTitle)
        return () => chrome.runtime.onMessage.removeListener(getTabTitle)
    }, [])

    const getTabTitle = async () => {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
            setTitle(tab.title)
        } catch {
            console.log('Tab querying failed')
        }
    }

    return (
        <TitleText>{ title }</TitleText>
    )
}

const TitleText = styled.span`
    padding: 12px;
    text-align: center;
`