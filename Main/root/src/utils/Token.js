export function getToken(key) {
    return window.localStorage.getItem(key)
}

export function setToken(key, value) {
    return window.localStorage.setItem(key, value)
}


export function clearToken() {
    return window.localStorage.clear()
}