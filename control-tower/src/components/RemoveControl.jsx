import React from 'react'
import { BorderedButton } from './BorderedButton'

export const RemoveControl = ({ type, onRemove }) => {
    return (
        <BorderedButton onClick={() => onRemove(type)}>
            Remove Activity
        </BorderedButton>
    )
}