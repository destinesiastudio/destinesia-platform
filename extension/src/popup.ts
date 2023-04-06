// console.log(window.location.href)
const openApp = (appId: number) => () => {
    const appName = 'michael-ai/index.html'
    console.log(`Open App ${appName}`)
    // window.location.href = ''
    chrome.storage.local.set({ "location": appName }, () => {
        chrome.action.setPopup({popup: `./${appName}`})
        window.location.href = appName
    })
}

const menuBtns = document.getElementsByClassName('menu-btn')
menuBtns[0].addEventListener("click", openApp(0))