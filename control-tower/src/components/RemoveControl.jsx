import React from 'react'

export const RemoveControl = ({ type, onRemove }) => {
    return (
        <button onClick={() => onRemove(type)}>
            Remove Refresh
        </button>
    )
}