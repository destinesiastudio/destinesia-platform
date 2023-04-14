export const start = () => {
    chrome.storage.local.get('location', (items) => {
        if (typeof items.location !== 'undefined') {
            chrome.action.setPopup({popup: `./${items.location}`})
        }
    })
}

// chrome.contextMenus.create({
//     id : 'selectionGetter',
//     title : 'send selected text',
//     contexts : ['selection'],
// })

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//     //showing alert would require you to send a message to the active tab,
//     //handle it in the contentscript and send alert from there

//     //alternate lazy usage example:
//     new Notification('My extension', {
//         body: 'you selected: ' + info.selectionText,
//     });
// })

// chrome.tabs.onActivated.addListener(async (activeInfo) => {
//     try {
//         await chrome.tabs.sendMessage(activeInfo.tabId, { activeTabId: activeInfo.tabId })
//     } catch {
//         console.log('Tab does not have content script injected')
//     }
//     // (async () => {
//     //     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//     //     const response = await chrome.tabs.sendMessage(activeInfo.tabId, {greeting: "hello"});
//     //     // do something with response here, not outside the function
//     //     console.log(response)
//     // })()
// })

// let active = false


// const makeOrange = (colour: string) => {
//     document.body.style.backgroundColor = colour
// }

// chrome.action.onClicked.addListener(tab => {
//     active = !active
//     const colour = active ? 'orange' : 'white'
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id ? tab.id : -1 },
//         func: makeOrange,
//         args: [colour]
//     })
// })