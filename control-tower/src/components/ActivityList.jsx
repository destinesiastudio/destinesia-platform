import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const ActivityList = () => {
    const [activities, setActivities] = useState([])

    useEffect(() => {
        initialiseActivities()
        chrome.runtime.onMessage.addListener(handleControlsChange)
        return () => chrome.runtime.onMessage.removeListener(handleControlsChange)
    }, [])

    const initialiseActivities = async () => {
        const controls = await chrome.runtime.sendMessage({ task: 'getControls' })
        const tabs = await chrome.tabs.query({})

        const tabLookup = tabs.reduce((lookup, tab) => ({ ...lookup, [tab.id]: tab }))
        const refresh = controls.refresh.map(id => `Refresh - ${tabLookup[id].title}`)

        setActivities(([ ...refresh ]))
    }

    const handleControlsChange = async ({ task, data }, sender) => {
        if(task === 'controlsChange') {
            console.log('controlsChange', data)
            const tabs = await chrome.tabs.query({})

            const tabLookup = tabs.reduce((lookup, tab) => ({ ...lookup, [tab.id]: tab }))
            const refresh = data.refresh.map(id => `Refresh - ${tabLookup[id].title}`)

            setActivities(([ ...refresh ]))
        }
    }

    return activities.length !== 0 ? (
        <List>
            {activities.map((activity, i) => 
                <ListItem key={i}>{ activity }</ListItem>
            )}
        </List>
    ) : (
        <List>
            <ListItem>No activities</ListItem>
        </List>
    )
}

const List = styled.ol`
    border: 1px solid lightgrey;
    border-radius: 4px;
    list-style: none;
    padding: 12px;
    margin: 12px;
`

const ListItem = styled.li`

`