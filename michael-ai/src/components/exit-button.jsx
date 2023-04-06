import React from 'react'
import styled from 'styled-components'

export const ExitButton = () => {
    const exit = () => {
        if (confirm('Are you sure you would like to exit Michael AI?') === true) {
            chrome.storage.local.remove('location', () => {
                chrome.action.setPopup({ popup: './popup.html' })
                window.location.href = '../popup.html'
            })
        }
    }

    return (
        <AbsoluteButton onClick={() => exit()} />
    )
}

const AbsoluteButton = styled.button`
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 32px;
    height: 20px;
    width: 20px;
    border: none;
    background: none;

    &:before,&:after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 20px;
        background-color: #F0F0F0;
        transform: rotate(45deg) translate(-50%, -50%);
        transform-origin: top left;
        content: '';
    }

    &:after {
        transform: rotate(-45deg) translate(-50%, -50%);
    }
`