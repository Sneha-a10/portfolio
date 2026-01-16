import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export function getFileContent(fileName: string) {
    const fullPath = path.join(dataDirectory, fileName);
    if (!fs.existsSync(fullPath)) return null;
    return fs.readFileSync(fullPath, 'utf8');
}

export function getAllFileNames() {
    if (!fs.existsSync(dataDirectory)) return [];
    return fs.readdirSync(dataDirectory);
}
