import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const TabIdentifier = () => {
    const [title, setTitle] = useState('')
    
    useEffect(() => {
        buildTitle()
        chrome.runtime.onMessage.addListener(handleActivitiesChange)
        return () => chrome.runtime.onMessage.removeListener(handleActivitiesChange)
    }, [])

    const buildTitle = async () => {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
            setTitle(tab.title)
        } catch {
            console.log('Tab querying failed')
        }
    }

    const handleActivitiesChange = async ({ task, data }, sender) => {
        if(task !== 'activitiesChange') {
            return
        }

        await buildTitle()
    }

    return (
        <TitleText>{ title }</TitleText>
    )
}

const TitleText = styled.span`
    padding: 12px;
    text-align: center;
`