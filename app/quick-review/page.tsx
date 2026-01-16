import React from 'react';
import QuickReviewTemplate from '@/components/demo_template/QuickReviewTemplate';
import { getFileContent } from '@/lib/files';

export default function QuickReviewPage() {
    const profileJson = getFileContent("profile.json");
    const profile = profileJson ? JSON.parse(profileJson) : {};

    return (
        <div className="fixed inset-0 w-full max-w-[100vw] h-full overflow-y-auto overflow-x-hidden bg-white">
            <QuickReviewTemplate profileData={profile} />
        </div>
    );
}
