import { getFileContent } from "@/lib/files";
import { JsonDisplay } from "@/components/JsonDisplay";

export default function Home() {
    const profileData = getFileContent("profile.json");

    return (
        <JsonDisplay content={profileData || "{}"} />
    );
}
