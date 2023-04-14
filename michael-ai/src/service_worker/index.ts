import { history, getHistory, delHistory } from './dialog-history'
import { generateResponse, interrupt } from './gpt'

getHistory()

chrome.runtime.onMessage.addListener(({ task, data }, sender, sendResponse) => {
    switch(task) {
        case 'history':
            sendResponse(history())
            break
        case 'delHistory':
            delHistory()
            break
        case 'generateResponse':
            generateResponse(data)
            break
        case 'interrupt':
            interrupt()
            break
    }
})

chrome.contextMenus.create({
    id : 'selectionGetter',
    title : 'Send to AI',
    contexts : ['selection'],
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    // if(tab !== undefined && tab.id !== undefined) {
    //     chrome.tabs.sendMessage(tab.id, { selectionText: info.selectionText })
    // }
    chrome.runtime.sendMessage({
        msg: 'sendToAi', 
        data: { selectionText: info.selectionText }
    })
})