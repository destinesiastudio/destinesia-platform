import { delRefresh, getRefresh, setRefresh } from './refresh'

chrome.runtime.onMessage.addListener(async (a, sender, sendResponse) => {
    console.log('service', a)
    const { task, data } = a
    if(!a) {
        return
    }
    switch(task) {
        case 'getActivities':
            sendResponse(getActivities())
            break
        case 'setRefresh':
            setRefresh(data.tabId, data.frequency)
            await chrome.runtime.sendMessage({ task: 'activitiesChange', data: getActivities() })
            break
        case 'delRefresh':
            delRefresh(data.tabId)
            await chrome.runtime.sendMessage({ task: 'activitiesChange', data: getActivities() })
            break
        default:
            throw new Error('No such task exists...')
    }
})

chrome.tabs.onRemoved.addListener((tabId, removed) => {
    console.log(`[Control Tower] - Tab ${tabId} closed by user`)
    delRefresh(tabId)
    chrome.runtime.sendMessage({ task: 'activitiesChange', data: getActivities() })
})

const getActivities = () => ({
    refresh: getRefresh()
})