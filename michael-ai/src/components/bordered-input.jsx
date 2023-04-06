import React from 'react'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

export const BorderedInput = props => {
    return (
        <InputWrapper style={props.style} className={props.className}>
            <InputCore {...props} />
        </InputWrapper>
    )
}

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: linear-gradient(to right, rgba(155, 53, 21, 0.3), rgba(155, 53, 21, 0.8));
    padding: 3px;
    margin: 4px;
    border-radius: 4px;
`

const InputCore = styled(TextareaAutosize)`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgb(47, 48, 49);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    border: none;
`