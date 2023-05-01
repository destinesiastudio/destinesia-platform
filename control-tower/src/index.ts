import { createRoot } from 'react-dom/client'
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { App } from './App'

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