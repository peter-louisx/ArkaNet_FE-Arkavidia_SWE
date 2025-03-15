import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const CompanyAPI = {
    getProfile: async function({
        slug
    }: {
        slug: string
    }){
        return axios.get(`/company/profile/${slug}`)
    },


}