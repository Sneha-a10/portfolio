import React from 'react';
import { Terminal, Cpu, Globe } from 'lucide-react';

const About: React.FC<{ profile?: any }> = ({ profile }) => {
    const summary = profile?.summary || profile?.bio || "I am a Computer Science Engineer with a passion for solving complex problems.";

    return (
        <section id="about" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">About Me</h2>
                    <div className="w-16 h-1 bg-slate-200 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-slate-800">
                            Driven by logic, inspired by design.
                        </h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {summary}
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Whether I'm optimizing database queries or crafting pixel-perfect interfaces, I focus on scalability and user experience. I love learning new technologies and applying them to build real-world solutions.
                        </p>
                        <div className="pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="block text-3xl font-bold text-slate-900 mb-1">3+</span>
                                    <span className="text-sm text-slate-500">Years Coding</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="block text-3xl font-bold text-slate-900 mb-1">10+</span>
                                    <span className="text-sm text-slate-500">Projects Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                            <Terminal className="w-8 h-8 text-slate-700 mb-4" />
                            <h4 className="text-lg font-semibold text-slate-900 mb-2">Backend Development</h4>
                            <p className="text-slate-500 text-sm"> robust server-side logic, API design, and database management using Node.js, Python, and SQL.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                            <Globe className="w-8 h-8 text-slate-700 mb-4" />
                            <h4 className="text-lg font-semibold text-slate-900 mb-2">Frontend Development</h4>
                            <p className="text-slate-500 text-sm">Responsive, accessible, and performant UIs built with React, TypeScript, and Tailwind CSS.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                            <Cpu className="w-8 h-8 text-slate-700 mb-4" />
                            <h4 className="text-lg font-semibold text-slate-900 mb-2">System Design</h4>
                            <p className="text-slate-500 text-sm">Architecting scalable and maintainable software solutions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
