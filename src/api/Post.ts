import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const PostAPI = {
    createPost: async function({
        content,
        asset,
    }:{
        content: string,
        asset: File | null
    }){
        return axios.post(`/post/create`, {
            content,
            asset
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    updatePost: async function({
        id,
        content,
        asset,
    }:{
        id: string,
        content: string,
        asset: File | null
    }){
        return axios.patch(`/post/update`, {
            id,
            content,
            asset
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    deletePost: async function(id: string){
        return axios.delete(`/post/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

}