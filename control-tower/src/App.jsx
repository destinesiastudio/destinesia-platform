import React from 'react'
import { TabIdentifier } from '@components/TabIdentifier'
import { ActivityList } from '@components/ActivityList'
import { ActivityControls } from '@components/ActivityControls'
import { ExitButton } from '@components/ExitButton'

export const App = () => {
    return (
        <>
            <ExitButton />
            <TabIdentifier />
            <ActivityControls />
            <ActivityList />
        </>
    )
}