import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "EcoTrack Analytics",
    description: "A comprehensive dashboard for tracking environmental data from IoT sensors. Features real-time data visualization using D3.js and predictive analysis models.",
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "IoT"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=1"
  },
  {
    id: 2,
    title: "NeuroChat AI",
    description: "An intelligent chatbot interface capable of context-aware conversations. Integrated with natural language processing APIs to assist users with technical queries.",
    technologies: ["Python", "Flask", "OpenAI API", "Redis", "React"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=2"
  },
  {
    id: 3,
    title: "Algorithmic Trading Bot",
    description: "A high-frequency trading simulation platform. Implements complex sorting and pathfinding algorithms to optimize mock trade execution strategies.",
    technologies: ["C++", "Python", "Pandas", "Docker"],
    github: "#",
    image: "https://picsum.photos/600/400?random=3"
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
             <div className="w-16 h-1 bg-slate-200"></div>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors mt-4 md:mt-0">
            View all on GitHub <Github className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} className="text-slate-400 hover:text-slate-900 transition-colors" title="View Code">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} className="text-slate-400 hover:text-slate-900 transition-colors" title="Live Demo">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded border border-slate-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <a href="#" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
            View all on GitHub <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;