import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const ChatAPI = {
    getMessages: async function(room: string){
        return axios.get(`/chat/messages/${room}`, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },
    sendMessage: async function({
        room_id,
        message
    }: {
        room_id: string
        message: string
    }){
        return axios.post(`/chat/send`, {
            room_id,
            message
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },
    getChatRoom: async function(userId: string){
        return axios.get(`/chat/room/${userId}`, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },
    getRooms: async function(){
        return axios.get(`/chat/rooms`, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    }
  
}