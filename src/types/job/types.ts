export type Job = {
    id: string;
    company: string;
    company_slug: string;
    logo: string;
    title: string;
    location: string;
    location_type: string;
    type: string;
    experience: string;
    min_salary: number;
    max_salary: number;
    description: string;
    status: string;
    posted: string;
    skills: string[];
}

export type JobFilters = {
    jobType: string;
    experienceLevel: string;
    locationType: string;
    datePosted: string;
    salaryRange: number[];
    sortBy: string;
}