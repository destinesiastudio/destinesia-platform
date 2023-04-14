let _isFloated = false
let _previousTabId = undefined

export const toggleFloat = async (tabId) => {
    _isFloated = !_isFloated

    if(_isFloated === true) {
        onTabChange(tabId)
    } else {
        try {
            console.log('closing window on tab: ', _previousTabId)
            await chrome.tabs.sendMessage(_previousTabId, { task: 'closeWindow' })
        } catch {
            console.log('Tab targeted by CLOSING does not have content script injected', _previousTabId)
        }

        _previousTabId = undefined
    }
}

export const onTabChange = async (tabId) => {
    if(_isFloated === false) {
        return
    }

    if(_previousTabId !== undefined) {
        try {
            console.log('closing window on tab: ', _previousTabId)
            await chrome.tabs.sendMessage(_previousTabId, { task: 'closeWindow' })
        } catch {
            console.log('Tab targeted by CLOSING does not have content script injected', _previousTabId)
        }
    }

    if(tabId) {
        try {
            console.log('floating window on tab: ', tabId)
            await chrome.tabs.sendMessage(tabId, { task: 'floatWindow' })
        } catch {
            console.log('Tab targeted by FLOAT does not have content script injected', tabId)
        }
    }

    _previousTabId = tabId
}