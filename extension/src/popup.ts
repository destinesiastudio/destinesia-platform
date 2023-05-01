// console.log(window.location.href)
const openApp = (appId: string) => () => {
    const appName = `${appId}/index.html`
    console.log(`Open App ${appName}`)
    // window.location.href = ''
    chrome.storage.local.set({ "location": appName }, () => {
        chrome.action.setPopup({popup: `./${appName}`})
        window.location.href = appName
    })
}

const menuBtns = document.getElementsByClassName('menu-btn')
menuBtns[0].addEventListener("click", openApp('michael-ai'))
menuBtns[1].addEventListener("click", openApp('control-tower'))