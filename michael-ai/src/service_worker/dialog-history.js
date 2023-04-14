const _auth = `Bearer ${process.env.TOKEN}`
let _history = []

export const history = () => {
    return _history
}

export const addDialog = newDialogs => {
    _history = [..._history, ...newDialogs]
}

export const getHistory = async () => {
    const res = await fetch(
        process.env.BASE_URL + `/history?user=${process.env.USER}`,
        { headers: { 'Authorization': _auth } }
    )
    const { messages } = await res.json()
    if(messages) {
        _history = messages.map(el => JSON.parse(el))
    }
}

export const delHistory = async () => {
    await fetch(
        process.env.BASE_URL + `/history?user=${process.env.USER}`,
        { headers: { 'Authorization': _auth }, method: 'DELETE' }
    )

    _history = []
}