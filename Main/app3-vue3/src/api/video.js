import http from "./http.js"

export function addVideo(data) {
    console.log(data)
    return http({
        url: "/addVideo",
        method: "post",
        headers: {
            'Content-Type': "multipart/form-data"
        },
        data
    })
}