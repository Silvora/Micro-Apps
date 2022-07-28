import http from "./http.js"

export function addVideo(data, cd) {
    return http({
        url: "/addVideo",
        method: "post",
        headers: {
            'Content-Type': "multipart/form-data"
        },
        data,
        onUploadProgress: (progressEvent)=>{
            if (progressEvent.lengthComputable) {
                cd(progressEvent)
              }
        }
    })
}


export function getVideos(params) {
    return http({
        url: "/getVideos",
        method: "get",
        params
    })
}



export function getVideo(id) {
    return http({
        url: `/getVideo/${id}`,
        method: "get",
    })
}
