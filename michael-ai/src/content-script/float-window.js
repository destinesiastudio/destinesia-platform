import { dragElement } from "./draggable"

let _container = undefined

export const toggle = () => {
    console.debug('[Michael AI] Floating window...')
    const extensionOrigin = 'chrome-extension://' + chrome.runtime.id
    if (!location.ancestorOrigins.contains(extensionOrigin)) {
        if(_container !== undefined) {
            return
        }

        _container = document.createElement('div')
        _container.style.position = 'absolute'
        _container.style.top = '0'
        _container.style.right = '0'
        _container.style.width = '30rem'
        _container.style.height = '35rem'
        _container.style.zIndex = '1000'

        const header = document.createElement('div')
        header.style.position = 'absolute'
        header.style.top = '0'
        header.style.left = '0'
        header.style.right = '100px'
        header.style.height = '70px'
        //Make the DIV element draggagle:
        dragElement(_container, header)
        
        const iframe = document.createElement('iframe')
        iframe.src = chrome.runtime.getURL('michael-ai/index.html')
        // iframe.style.position = 'absolute'
        // iframe.style.top = '0'
        // iframe.style.right = '0'
        iframe.style.width = '30rem'
        iframe.style.height = '35rem'
        // iframe.style.zIndex = '1000'

        _container.appendChild(header)
        _container.appendChild(iframe)
        document.body.appendChild(_container)
    } else {
      console.debug('[Michael AI] Recursion detected...')
    }
}

export const close = () => {
    console.debug('[Michael AI] Closing window...')
    if(_container !== undefined) {
        document.body.removeChild(_container)
        _container = undefined
    }
}