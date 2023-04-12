chrome.storage.local.get('location', (items) => {
    if (typeof items.location !== 'undefined') {
        chrome.action.setPopup({popup: `./${items.location}`})
    }
})

chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log(activeInfo.tabId);

    (async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(activeInfo.tabId, {greeting: "hello"});
        // do something with response here, not outside the function
        console.log(response)
    })()
})

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