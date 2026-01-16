import { getFileContent } from "@/lib/files";
import LandingPage from "@/components/LandingPage";

// Helper to parse projects.md
function parseProjectsMd(content: string) {
    if (!content) return [];

    // Split by ## (Project titles)
    const sections = content.split(/^## /m).slice(1); // skip empty first part

    return sections.map(section => {
        const lines = section.split('\n').map(l => l.trim()).filter(l => l);
        const title = lines[0];

        const project: any = {
            title,
            links: { github: '', demo: '' },
            tech: []
        };

        // Extract description (What I built) and Tech
        const builtLine = lines.find(l => l.includes('**What I built:**'));
        if (builtLine) {
            project.description = builtLine.replace(/-\s*\*\*What I built:\*\*\s*/, '');
        }

        const techLine = lines.find(l => l.includes('**Tech:**'));
        if (techLine) {
            const rawTech = techLine.replace(/-\s*\*\*Tech:\*\*\s*/, '');
            project.tech = rawTech.split(/,|\//).map(t => t.trim()); // Split by comma or slash
        }

        const codeLine = lines.find(l => l.includes('**Code:**'));
        if (codeLine) {
            const match = codeLine.match(/\((.*?)\)/);
            if (match) project.links.github = match[1];
        }

        // Fallback description
        if (!project.description) {
            const desc = lines.find(l => l.startsWith('-') && !l.includes('**'));
            if (desc) project.description = desc.replace(/^-\s*/, '');
        }

        return project;
    });
}

function parseExperienceJson(content: string) {
    try {
        return JSON.parse(content || "{}");
    } catch {
        return { education: {}, experience: [] };
    }
}

function parseProfileJson(content: string) {
    try {
        return JSON.parse(content || "{}");
    } catch {
        return { name: "", summary: "", focus: [], links: {} };
    }
}

export default function PreviewPage() {
    const profileData = getFileContent("profile.json");
    const projectsData = getFileContent("projects.md");
    const experienceData = getFileContent("experience.json");
    const skillsData = getFileContent("skills.txt");
    const achievementsData = getFileContent("achievements.md");

    const profile = parseProfileJson(profileData || "");
    const projects = parseProjectsMd(projectsData || "");
    const experience = parseExperienceJson(experienceData || "");

    return (
        <LandingPage
            profile={profile}
            projects={projects}
            experience={experience}
            skills={skillsData || ""}
            achievements={achievementsData || ""}
        />
    );
}
