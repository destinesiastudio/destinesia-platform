const tabs = new Map()

export const getRefresh = () => Array.from(tabs.keys())
export const hasRefresh = (tabId) => tabs.has(tabId)

export const setRefresh = (tabId, frequency) => {
    console.log(`[Control Tower] - Set Refresh on Tab ${tabId} at ${frequency}ms`)
    if(frequency < 10000) {
        throw new Error('Refresh frequency is less than 10 seconds...')
    }

    delRefresh(tabId)

    const intervalId = setInterval(() => {
        chrome.tabs.reload(tabId)
        console.log(`[Control Tower] - Refreshing Tab ${tabId} now ${new Date()}`)
    }, frequency)
    tabs.set(tabId, intervalId)
}

export const delRefresh = (tabId) => {
    if(!tabs.has(tabId)) {
        return
    }

    const intervalId = tabs.get(tabId)
    clearInterval(intervalId)
    tabs.delete(tabId)
    console.log(`[Control Tower] - Refresh for Tab ${tabId} deleted`)
}