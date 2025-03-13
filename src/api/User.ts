import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const UserAPI = {
    login: async function({
        email,
        password,
    }: {
        email: string,
        password: string
    }){
        return axios.post("/user/login", {
            email,
            password
        })
    },

    validateToken: async function(){
        return axios.get("/restricted", {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    register: async function({
        name,
        email,
        password,
        about,
        address,
        currenttitle
    }: {
        name: string,
        email: string,
        password: string,
        about: string,
        address: string,
        currenttitle: string,
    }){
        return axios.post("/user/register", {
            name,
            email,
            password,
            about,
            address,
            currenttitle,
        })
    },

    setPersonalInfo: async function({
        name,
        headline,
        location,
    }: {
        name: string,
        headline: string,
        location: string,
    }){
        return axios.post("/user/personal-info", {
            name,
            headline,
            location,
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    getProfile: async function({
        slug
    }: {
        slug: string
    }){
        return axios.get(`/user/profile/${slug}`)
    },

    addEducation: async function({
        school_name,
        degree,
        field_of_study,
        start_date,
        end_date,
    }: {
        school_name: string,
        degree: string,
        field_of_study: string,
        start_date: string,
        end_date: string,
    }){
        return axios.post("/user/education/add-education", {
            school_name,
            degree,
            field_of_study,
            start_date,
            end_date,
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    deleteEducation: async function({
        id
    }: {
        id: number
    }){
        return axios.delete(`/user/education/delete-education/${id}`, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    updateEducation: async function({
        id,
        school_name,
        degree,
        field_of_study,
        start_date,
        end_date,
    }: {
        id: number,
        school_name: string,
        degree: string,
        field_of_study: string,
        start_date: string,
        end_date: string,
    }){
        return axios.patch(`/user/education/update-education`, {
            id,
            school_name,
            degree,
            field: field_of_study,
            start_date,
            end_date,
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },
}