export type GeneralProfile = {
    name: string;
    current_title: string;
    slug: string;
    role: string;
    profile_picture: string;
}

export type SeekerPersonalInfo = {
    name: string;
    headline: string;
    location: string;
    cover: string;
    profilePicture: string;
    about: string;
}

export type SeekerExperience = {
    id: string;
    title: string;
    company: string;
    company_id: string;
    location: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
}

export type SeekerEducation = {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date;
    description: string;
}

export type SeekerSkill = {    
    id?: string;
    skill_id: string;
    name: string;
}