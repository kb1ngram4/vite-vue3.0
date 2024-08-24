import axiosApi from "@/utils/api"

const getUserInfoApi = (data:object)=>{
    return axiosApi.post('/api/userInfo',data)
}

export {
    getUserInfoApi
}