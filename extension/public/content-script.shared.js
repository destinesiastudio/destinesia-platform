console.debug('[Destinesia Platform] injected successfully...')

const src = chrome.runtime.getURL("./michael-ai/content-script.js");
import(src)