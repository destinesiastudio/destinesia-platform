import React from 'react'
import { TabIdentifier } from '@components/TabIdentifier'
import { ActivityList } from '@components/ActivityList'
import { ControlList } from '@components/ControlList'

export const App = () => {
    return (
        <>
            <TabIdentifier />
            <ControlList />
            <ActivityList />
        </>
    )
}