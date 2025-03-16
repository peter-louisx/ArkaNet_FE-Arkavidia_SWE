export type CompanyHeader = {
    id: string;
    name: string;
    logo: string;
    cover: string;
    about: string;
    industry: string;
}

export type CompanySkill = {
    id: string | null;
    skill_id: string;
    name: string;
}

export type CompanyJob = {
    id: string;
    title: string;
    location: string;
    location_type: string;
    job_type: string;
    experience: string;
    max_salary: number;
    min_salary: number;
    posted: string;
    description: string;
    skills: CompanySkill[];
}