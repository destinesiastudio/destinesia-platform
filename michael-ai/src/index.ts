import { createRoot } from 'react-dom/client'
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import hljs from 'highlight.js'
import { marked } from 'marked'
import App from './app'

// Initialise internationalisation
import en from './assets/en.json'
import zh from './assets/zh.json'
i18n.use(initReactI18next)
    .init({
        resources: { en, zh },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })

// Initialise marked & highlight.js
import 'highlight.js/styles/base16/material.css'
hljs.highlightAll()
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: true,
    smartypants: true,
    xhtml: false
})

// React DOM container setup
let container = document.createElement('div')
container.id = 'app'
document.body.style.margin = '0'
document.body.style.position = 'relative'
document.body.style.width = '30rem'
document.body.style.height = '35rem'
document.body.appendChild(container)
container.style.height = '100vh'
container.style.display = 'flex'
container.style.flexDirection = 'column'

const root = createRoot(container)
root.render(App())