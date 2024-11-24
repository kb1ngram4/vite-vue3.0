import axiosApi from "@/utils/api"
import type { ApiResponse } from '@/axios'
const getUserListApi = (data: object) => {
    return axiosApi.post('/api/userInfo', data)
}
const addUserApi = (data: object): Promise<ApiResponse<number>> => {
    return axiosApi.post('/api/addUser', data)
}

const getUserInfoApi = (id: number) => {
    return axiosApi.get(`/api/userInfo?id=${id}`)
}

const deleteUserApi = (data: object) => {
    return axiosApi.post('/api/deleteUser', data)
}


const getTree = () => {
    return axiosApi.get('/api/getParent')
}
const getChildren = (id: number) => {
    return axiosApi.get(`/api/children/${id}`)
}
export {
    getUserListApi, getUserInfoApi, addUserApi, deleteUserApi, getTree, getChildren
}