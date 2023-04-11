import express from 'express'
import cors from 'cors'
import { openAIStream } from './gpt'
import { chatHistory, clearChatHistory } from './history'

const controllers = {}

const getHistory = async (req, res) => {
    const messages = await chatHistory(req.query.user)
    res.send({ messages })
    res.end()
}

const deleteHistory = async (req, res) => {
    res.send(await clearChatHistory(req.query.user))
    res.end()
}

const postGpt = async (req, res) => {
    const { prompt } = req.body
    const { user } = req.query
    const controller = new AbortController()
    clearController(user)
    controllers[user] = controller

    const headers = {
        'Content-Type': 'text/event-stream', // To tell client, it is event stream
        'Connection': 'keep-alive', // To tell client, not to close connection
        'Cache-Control': 'no-cache'
    }

    res.writeHead(200, headers)
    await openAIStream(user, prompt, res, controller.signal)
}

const interruptGpt = async (req, res) => {
    const { user } = req.query
    clearController(user)
    res.end()
}

const clearController = (user) => {
    if(controllers[user]) {
        controllers[user].abort()
        delete controllers[user]
    }
}

export const start = () => {
    const app = express()
    const port = 8080

    app.use(cors({ origin: '*' }))
    app.use(express.json())

    app.get('/history', getHistory)
    app.delete('/history', deleteHistory)
    app.post('/gpt', postGpt)
    app.post('/interrupt', interruptGpt)

    app.listen(port, () => console.log(`Listening on port ${port}...`))
}