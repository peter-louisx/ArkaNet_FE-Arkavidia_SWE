import { getAuthToken } from "@/lib/session"
import axios from "./axios"
import { get } from "http"

export const JobAPI = {
    getJob: async function(id: string){
        return axios.get(`/job/detail/${id}`)
    },
    searchJobs: async function({
        title,
        location_type,
        job_type,
        min_salary,
        max_salary,
        experience_level,
        date_posted,
        sort_by,
    }: {
        title: string,
        location_type: string,
        job_type: string,
        min_salary: number,
        max_salary: number,
        experience_level: string,
        date_posted: string,
        sort_by: string,
    }){
        return axios.get(`/job/search`, {
            params: {
                title,
                location_type,
                job_type,
                min_salary,
                max_salary,
                experience_level,
                date_posted,
                sort_by
            }
        })
    },
    applyJob: async function({
        job_id,
        resume
    }: {
        job_id: string
        resume: Blob
    }){
        return axios.post(`/job/apply`, {
            resume,
            job_id
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    getApplications: async function(id: string){
        return axios.get(`/job/applicants/${id}`, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    changeApplicationStatus: async function(
        id: string,
        status: string
  ){
        return axios.post(`/job/update-application`, {
            applicant_id: id,
            status
        }, {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    }
}