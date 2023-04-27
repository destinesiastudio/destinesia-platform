import { createClient } from 'redis'

const client = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
})
client.on('error', err => console.log('Redis Client Error', err))

export const chatHistory = async user => {
    await client.connect()
    let history
    
    try {
        history = await client.lRange(`michael-ai:${user}`, 0, -1)

    } catch {
        history = undefined
    }

    await client.disconnect()

    return history
}

export const updateChatHistory = async (user, items) => {
    await client.connect()

    for (const item of items) {
        await client.rPush(`michael-ai:${user}`, JSON.stringify(item))
    }

    await client.disconnect()

    return true
}

export const clearChatHistory = async user => {
    await client.connect()
    
    await client.del(`michael-ai:${user}`)
    await client.disconnect()

    return true
}