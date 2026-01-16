import React from 'react';
import { Skill } from './types';

const skillsData: Skill[] = [
    {
        category: "Languages",
        items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"]
    },
    {
        category: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "Redux", "HTML5", "CSS3"]
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "Django", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
        category: "Tools & DevOps",
        items: ["Git", "Docker", "AWS", "Linux", "Jest", "CI/CD"]
    }
];

const Skills: React.FC = () => {
    return (
        <section id="skills" className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Technical Skills</h2>
                    <div className="w-16 h-1 bg-slate-300 mx-auto mb-6"></div>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        A comprehensive toolkit developed through academic rigor and personal projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillsData.map((skillGroup) => (
                        <div key={skillGroup.category} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">
                                {skillGroup.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-200 transition-colors cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
