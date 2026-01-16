
export function parseProjectsMd(content: string) {
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
        // This is a naive parser based on the known format
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

        // Fallback description if "What I built" missing
        if (!project.description) {
            // Find first bullet that looks like a description
            const desc = lines.find(l => l.startsWith('-') && !l.includes('**'));
            if (desc) project.description = desc.replace(/^-\s*/, '');
        }

        return project;
    });
}

export function parseExperienceJson(content: string) {
    try {
        return JSON.parse(content || "{}");
    } catch {
        return { education: {}, experience: [] };
    }
}

export function parseProfileJson(content: string) {
    try {
        return JSON.parse(content || "{}");
    } catch {
        return { name: "", summary: "", focus: [], links: {} };
    }
}
