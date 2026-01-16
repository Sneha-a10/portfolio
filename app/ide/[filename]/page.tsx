import { getFileContent, getAllFileNames } from "@/lib/files";
import { JsonDisplay } from "@/components/JsonDisplay";
import { MarkdownDisplay } from "@/components/MarkdownDisplay";
import { notFound } from "next/navigation";
import { File } from "lucide-react";

export async function generateStaticParams() {
    const files = getAllFileNames();
    return files.map((filename) => ({
        filename,
    }));
}

export default async function FilePage({ params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;

    if (filename === 'resume.pdf') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 mt-20">
                <File className="w-16 h-16 mb-4 text-red-400 opacity-50" />
                <p className="mb-4">PDF Preview not available in this minimal editor.</p>
                <a
                    href="/Sneha_Agarwal.pdf"
                    download
                    className="bg-ide-accent text-ide-bg px-4 py-2 font-bold hover:opacity-90 transition-opacity"
                >
                    Download Resume.pdf
                </a>
                {/* In a real app, we would serve static file or use an iframe */}
            </div>
        );
    }

    const content = getFileContent(filename);

    if (!content) return notFound();

    if (filename.endsWith('.json')) {
        return <JsonDisplay content={content} />;
    }
    if (filename.endsWith('.md')) {
        return <MarkdownDisplay content={content} filename={filename} />;
    }

    // Default text view
    return <pre className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{content}</pre>;
}
