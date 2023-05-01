import React, { useState } from 'react'
import styled from 'styled-components'
import { BorderedButton } from './BorderedButton'

export const RefreshControl = ({ onActivate }) => {
    const [rate, setRate] = useState(60)

    const addRefresh = async () => {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
            await chrome.runtime.sendMessage({ task: 'setRefresh', data: { tabId: tab.id, frequency: toMs(rate) } })
            onActivate(true)
        } catch {
            console.log('Tab querying failed')
        }
    }

    const toMs = seconds => seconds * 1000

    return (
        <View>
            <SliderView>
                <RangeSlider
                    type='range'
                    min='10'
                    max='120'
                    step='5'
                    onChange={e => setRate(e.target.value)}
                />
                <SliderText>{ rate } seconds</SliderText>
            </SliderView>
            <BorderedButton onClick={() => addRefresh()}>
                Auto Refresh
            </BorderedButton>
        </View>
    )
}

const View = styled.div`
    display: flex;
    flex-direction: row;
`

const SliderView = styled.div`
    margin-right: 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
`

const SliderText = styled.span`
    align-self: center;
    font-size: 12px;
`

const RangeSlider = styled.input`
`