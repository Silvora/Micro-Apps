export function GetToken(key){
    return window.localStorage.getItem(key)
}

export function SetToken(key,value){
    window.localStorage.setItem(key,value)
}

export function ClearToken(){
    window.localStorage.clear()
}