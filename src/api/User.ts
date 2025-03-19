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

    updateProfile: async function({
        name,
        headline,
        about,
        address,
        current_title,
        profile_picture,
    }: {
        name: string,
        about: string,
        address: string,
        current_title: string,
        profile_picture: Blob | null,
        headline: Blob | null
    }){
        return axios.post("/user/update-profile", {
            name,
            headline,
            location,
            about,
            address,
            current_title,
            profile_picture,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    addExperience: async function({
        company_id,
        title,
        location,
        start_date,
        end_date,
        description,
    }: {
        company_id: string,
        title: string,
        location: string,
        start_date: string,
        end_date: string | null,
        description: string,
    }){
        return axios.post("/user/experience/add-experience", {
            company_id,
            title,
            location,
            start_date,
            end_date,
            description,
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    deleteExperience: async function({
        id
    }: {
        id: string
    }){
        return axios.delete(`/user/experience/delete-experience/${id}`, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    updateExperience: async function({
        experience_id,
        company_id,
        title,
        location,
        start_date,
        end_date,
        description,
    }: {
        experience_id: string,
        company_id: string,
        title: string,
        location: string,
        start_date: string,
        end_date: string | null,
        description: string,
    }){
        return axios.patch(`/user/experience/update-experience`, {
            experience_id,
            company_id,
            title,
            location,
            start_date,
            end_date,
            description,
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
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
        id: string
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
        id: string,
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

    addSkill: async function({
        skill_id,
    }: {
        skill_id: string,
    }){
        return axios.post("/user/skills/add-skill", {
            skill_id,
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    deleteSkill: async function({
        id
    }: {
        id: string
    }){
        return axios.delete(`/user/skills/delete-skill/${id}`, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    search: async function({
        keyword
    }: {
        keyword: string
    }){
        return axios.get(`/user/search`, {
            params: {
                keyword
            }
        })
    }
}