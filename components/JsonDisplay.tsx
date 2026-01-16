import React from 'react';

export function JsonDisplay({ content }: { content: string }) {
    let data;
    try {
        data = JSON.parse(content);
    } catch (e) {
        return <pre className="text-red-500">Invalid JSON: {content}</pre>;
    }

    const jsonString = JSON.stringify(data, null, 2);

    const highlighted = jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let style = '';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                // Key: Salmon/Pink
                style = 'color: var(--syntax-key);';
            } else {
                // String: Cream/Purple
                style = 'color: var(--syntax-string);';

                // Check for links within string values (excluding keys)
                const innerContent = match.slice(1, -1);
                if (innerContent.startsWith('http://') || innerContent.startsWith('https://')) {
                    return `<a href="${innerContent}" target="_blank" rel="noopener noreferrer" style="${style} cursor: pointer;">${match}</a>`;
                }
                if (innerContent === 'Sneha_Agarwal.pdf') {
                    return `<a href="/${innerContent}" target="_blank" rel="noopener noreferrer" style="${style} cursor: pointer;">${match}</a>`;
                }
            }
        } else if (/true|false/.test(match)) {
            style = 'color: #79c0ff;'; // Boolean (Light Blue)
        } else if (/null/.test(match)) {
            style = 'color: #6e7681;'; // Null (Gray)
        } else {
            style = 'color: #d2a8ff;'; // Number (Purple)
        }
        return `<span style="${style}">${match}</span>`;
    });

    return (
        <pre
            className="font-mono text-sm leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: highlighted }}
        />
    );
}
