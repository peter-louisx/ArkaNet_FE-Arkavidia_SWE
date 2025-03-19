import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const NotificationAPI = {
    getNotifications: async function(){
        return axios.get(`/notification/list`, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },
    readNotification: async function(id: string){
        return axios.post(`/notification/read/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },
}