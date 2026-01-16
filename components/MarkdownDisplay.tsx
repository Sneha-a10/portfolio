import React from 'react';
import ReactMarkdown from 'react-markdown';

export function MarkdownDisplay({ content, filename }: { content: string, filename?: string }) {
    return (
        <div className="prose prose-invert prose-sm max-w-none font-mono">
            <ReactMarkdown
                components={{
                    h1: ({ ...props }) => <h1 className="text-xl font-bold text-ide-accent mb-4 border-b border-gray-800 pb-2 block" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-lg font-bold text-blue-400 mt-8 mb-3 block" {...props} />,
                    p: ({ ...props }) => <p className="mb-4 text-gray-300 leading-relaxed" {...props} />,
                    ul: ({ ...props }) => {
                        // Special styling for projects.md
                        if (filename === 'projects.md') {
                            return <ul className="list-none pl-4 border-l border-blue-500 mb-4 text-gray-400 space-y-2" {...props} />;
                        }
                        return <ul className="list-disc pl-5 mb-4 text-gray-400" {...props} />;
                    },
                    li: ({ ...props }) => <li className="mb-1 pl-1" {...props} />,
                    a: ({ ...props }) => <a className="text-ide-accent underline decoration-gray-600 hover:decoration-ide-accent underline-offset-4 transition-all" target="_blank" rel="noopener noreferrer" {...props} />,
                    code: ({ ...props }) => <code className="bg-gray-800 rounded px-1 py-0.5 text-orange-300 text-xs" {...props} />,
                    blockquote: ({ ...props }) => <blockquote className="border-l-2 border-ide-accent pl-4 py-1 my-4 text-gray-400 italic bg-gray-900/50" {...props} />,
                    strong: ({ ...props }) => <strong className="text-rose-400 font-bold" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
