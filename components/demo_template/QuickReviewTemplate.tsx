import React from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

// A wrapper component that renders the full demo layout
export default function QuickReviewTemplate({ profileData }: { profileData?: any }) {
    // If we have profileData, we can pass it down. 
    // Currently components perform their own static rendering or receive props.
    // Ideally we update them to accept props.

    return (
        <div className="bg-white text-slate-900 font-sans selection:bg-slate-200 w-full max-w-full overflow-x-hidden">
            {/* Removing the scale wrapper here as it should be handled by parent if needed */}
            <div>
                <Hero profile={profileData} />
                <About profile={profileData} />
                <Skills />
                <Projects />
                <Footer profile={profileData} />
            </div>
        </div>
    );
}
