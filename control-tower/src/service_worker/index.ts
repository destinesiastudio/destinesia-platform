import { delRefresh, getRefresh, setRefresh } from './refresh'

chrome.runtime.onMessage.addListener(async ({ task, data }, sender, sendResponse) => {
    switch(task) {
        case 'getControls':
            sendResponse(getControls())
            break
        case 'setRefresh':
            setRefresh(data.tabId, data.frequency)
            await chrome.runtime.sendMessage({ task: 'controlsChange', data: getControls() })
            break
        case 'delRefresh':
            delRefresh(data.tabId)
            await chrome.runtime.sendMessage({ task: 'controlsChange', data: getControls() })
            break
        default:
            throw new Error('No such task name exists...')
    }
})

const getControls = () => ({
    refresh: getRefresh()
})