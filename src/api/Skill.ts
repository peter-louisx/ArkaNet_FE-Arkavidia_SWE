import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const SkillAPI = {

    getSkills : async function(){
        return axios.get(`/skill/list`)
    }
}