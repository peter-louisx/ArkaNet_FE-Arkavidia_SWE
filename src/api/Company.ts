import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const CompanyAPI = {
    login: async function({
        email,
        password
    }: {
        email: string,
        password: string
    }) {
        return axios.post("/company/login", {
            email,
            password
        })
    },
    register: async function({
        name,
        email,
        password,
        about,
        industry,
    }: {
        name: string,
        email: string,
        password: string,
        about: string,
        industry: string,
    }) {
        return axios.post("/company/register", {
            name,
            email,
            password,
            about,
            industry,
        })
    },

    getProfile: async function({
        slug
    }: {
        slug: string
    }){
        if(slug == 'avatar.png') return {
            data: {
                success: true,
                data: {
                    company_info: {
                        name: 'Company Name',
                        industry: 'Industry',
                        logo: '/avatar.png',
                        cover: '/cover.png',
                        about: 'About the company'
                    },
                    company_jobs: []
                }
            }
        }
        return axios.get(`/company/profile/${slug}`)
    },

    updateProfile: async function({
        company_id,
        name,
        industry,
        logo,
        cover,
        about,
    }: {
        company_id: string,
        name: string,
        industry: string,
        logo: Blob | null,
        cover: Blob | null
        about: string
    }){

        return axios.patch(`/company/update-profile`, {
            company_id,
            name,
            location,
            industry,
            logo,
            cover,
            about,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${await getAuthToken()}`
                
            }
        })
    },

    addJob: async function({
        company_id,
        title,
        description,
        location,
        location_type,
        job_type,
        min_salary,
        max_salary,
        experience,
        skills
    }: {
        company_id: string,
        title: string,
        description: string,
        location_type: string,
        location: string,
        job_type: string,
        min_salary: number,
        max_salary: number,
        experience: string,
        skills: string[]
    }){

        return axios.post(`/company/add-job`, {
            company_id,
            title,
            description,
            location,
            job_type,
            min_salary,
            max_salary,
            experience,
            skills,
            location_type
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    updateJob: async function({
        company_id,
        job_id,
        title,
        description,
        location,
        location_type,
        job_type,
        min_salary,
        max_salary,
        experience,
        skills
    }: {
        company_id: string,
        job_id: string,
        title: string,
        description: string,
        location_type: string,
        location: string,
        job_type: string,
        min_salary: number,
        max_salary: number,
        experience: string,
        skills: string[]
    }){

        return axios.patch(`/company/update-job`, {
            company_id,
            job_id,
            title,
            description,
            location,
            job_type,
            min_salary,
            max_salary,
            experience,
            skills,
            location_type
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    }
}