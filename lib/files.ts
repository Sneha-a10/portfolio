import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');
const projectsDirectory = path.join(process.cwd(), 'projects');

export function getFileContent(fileName: string) {
    // Decode if it came from URL
    const decodedName = decodeURIComponent(fileName);

    // Check if it's a project file
    if (decodedName.startsWith('projects/')) {
        const projectName = decodedName.replace('projects/', '');
        const fullPath = path.join(projectsDirectory, projectName);
        if (fs.existsSync(fullPath)) return fs.readFileSync(fullPath, 'utf8');
        return null;
    }

    // Default to data directory
    const fullPath = path.join(dataDirectory, decodedName);
    if (fs.existsSync(fullPath)) return fs.readFileSync(fullPath, 'utf8');
    return null;
}

export function getAllFileNames() {
    const files: string[] = [];

    if (fs.existsSync(dataDirectory)) {
        files.push(...fs.readdirSync(dataDirectory));
    }

    if (fs.existsSync(projectsDirectory)) {
        const projectFiles = fs.readdirSync(projectsDirectory);
        files.push(...projectFiles.map(f => `projects/${f}`));
    }

    return files;
}
