console.debug('[Michael AI] injected successfully...')
  
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.debug('[Michael AI] received a message...')

    if(request.selectionText) {
      console.log(`Active tab: ${document.title}`)
      console.log('selectionText', request.selectionText)
    }
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    // if (request.greeting === "hello")
    //   sendResponse({farewell: "goodbye"});
  }
)