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
            <div className="w-full h-full flex flex-col bg-gray-900">
                <iframe
                    src="/Sneha_Agarwal.pdf"
                    className="w-full h-full border-none"
                    title="Resume PDF"
                />
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
