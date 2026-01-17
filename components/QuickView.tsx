import React from 'react';
import { Maximize2 } from 'lucide-react';
import Link from 'next/link';
import LandingPage from './LandingPage';

interface QuickViewProps {
    profileData: string;
    fullData?: any;
    activeFile?: string;
}

export function QuickView({ profileData, fullData, activeFile }: QuickViewProps) {
    let profile = {};
    try {
        profile = JSON.parse(profileData);
    } catch (e) {
        console.error("Failed to parse profile data", e);
    }

    // Use fullData if available, otherwise fallback (though fullData is expected)
    const data = fullData || { profile, projects: [], experience: { education: {}, experience: [] }, skills: "", achievements: "" };

    return (
        <div className="h-full flex flex-col bg-ide-bg relative border-l border-gray-800">


            <div className="flex-1 overflow-y-auto hide-scrollbar bg-ide-bg">
                <LandingPage
                    profile={data.profile}
                    projects={data.projects}
                    experience={data.experience}
                    skills={data.skills}
                    achievements={data.achievements}
                    activeFile={activeFile}
                    isQuickView={true}
                />
            </div>
        </div>
    );
}
