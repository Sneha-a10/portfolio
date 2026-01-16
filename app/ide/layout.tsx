import { EditorLayout } from "@/components/EditorLayout";
import { getFileContent } from "@/lib/files";
import { parseProfileJson, parseProjectsMd, parseExperienceJson } from "@/lib/parsers";

export default function IDELayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const profileData = getFileContent("profile.json");
    const projectsData = getFileContent("projects.md");
    const experienceData = getFileContent("experience.json");
    const skillsData = getFileContent("skills.txt");
    const achievementsData = getFileContent("achievements.md");

    const profile = parseProfileJson(profileData || "");
    const projects = parseProjectsMd(projectsData || "");
    const experience = parseExperienceJson(experienceData || "");

    const fullData = {
        profile,
        projects,
        experience,
        skills: skillsData || "",
        achievements: achievementsData || ""
    };

    return (
        <EditorLayout
            profileData={profileData || "{}"}
            fullData={fullData}
        >
            {children}
        </EditorLayout>
    );
}
