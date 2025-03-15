import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const JobAPI = {
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
    }
}