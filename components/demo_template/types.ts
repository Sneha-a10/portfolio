export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
    image: string;
}

export interface Skill {
    category: string;
    items: string[];
}

export interface Experience {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
}
