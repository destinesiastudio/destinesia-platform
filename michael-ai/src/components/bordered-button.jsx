import React from 'react'
import styled from 'styled-components'

export const BorderedButton = props => {
    return (
        <ButtonWrapper {...props}>
            <ButtonCore>
                { props.children }
            </ButtonCore>
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled.button`
    cursor: ${({ disabled }) => disabled ? 'normal' : 'pointer' };
    display: flex;
    flex-direction: column;
    background: ${({ disabled }) => disabled ? 'lightgrey' : 'linear-gradient(to right, rgb(155, 53, 21), orange)' };
    opacity: ${({ disabled }) => disabled ? '0.3' : '1' };
    padding: 3px;
    margin: 4px;
    border-radius: 4px;
    border: none;
`

const ButtonCore = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgb(47, 48, 49);
    color: white;
    padding: 4px 14px;
    border-radius: 4px;
    font-size: 14px;
`