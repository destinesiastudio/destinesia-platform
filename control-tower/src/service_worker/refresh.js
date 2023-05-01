const tabs = new Map()

export const getRefresh = () => Array.from(tabs.keys())
export const hasRefresh = (tabId) => tabs.has(tabId)

export const setRefresh = (tabId, frequency) => {
    console.log(`[Control Tower] - Set Refresh on Tab ${tabId} at ${frequency}ms`)
    if(frequency <= 1000) {
        throw new Error('Refresh frequency is less than 1 second...')
    }

    if(tabs.has(tabId)) {
        delRefresh(tabId)
    }

    const intervalId = setInterval(() => {
        chrome.tabs.reload(tabId)
        console.log(`[Control Tower] - Refreshing Tab ${tabId} now ${new Date()}`)
    }, frequency)
    tabs.set(tabId, intervalId)
}

export const delRefresh = (tabId) => {
    const intervalId = tabs.get(tabId)
    clearInterval(intervalId)
    tabs.delete(tabId)
}