chrome.storage.local.get('location', (items) => {
    if (typeof items.location !== 'undefined') {
        chrome.action.setPopup({popup: `./${items.location}`})
    }
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