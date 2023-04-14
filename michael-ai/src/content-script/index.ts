import { toggle, close } from './float-window'

console.debug('[Michael AI] injected successfully...')

chrome.runtime.onMessage.addListener(
  ({ task }, sender, sendResponse) => {
    if(task === 'floatWindow') {
      toggle()
    } else if(task === 'closeWindow') {
      close()
    }
  }
)