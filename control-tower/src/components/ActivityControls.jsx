import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RefreshControl } from './RefreshControl'
import { RemoveControl } from './RemoveControl'

export const ActivityControls = () => {
    const [controls, setControls] = useState({})

    useEffect(() => {
        initialiseControls()
    }, [])

    const initialiseControls = async () => {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
            const controls = await chrome.runtime.sendMessage({ task: 'getActivities' })
            setControls({
                refresh: controls.refresh.findIndex(id => tab.id === id) !== -1
            })
        } catch {
            console.log('Tab querying failed')
        }
    }

    const removeRefresh = async () => {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
            await chrome.runtime.sendMessage({ task: 'delRefresh', data: { tabId: tab.id } })
        } catch {
            console.log('Tab querying failed')
        }
    }

    return (
        <View>
            { !controls.refresh ? (
                <RefreshControl
                    onActivate={(isActive) => setControls(p => ({ ...p, refresh: isActive }))}
                />
            ) : (
                <RemoveControl
                    type='refresh'
                    onRemove={async () => {
                        await removeRefresh()
                        setControls(p => ({ ...p, refresh: false }))
                    }}
                />
            ) }
        </View>
    )
}

const View = styled.div`
    padding: 12px;
`