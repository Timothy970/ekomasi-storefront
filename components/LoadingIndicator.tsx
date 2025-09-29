import { Loader2 } from "lucide-react";

export default function LoadingIndicator({ textColor }: { textColor: string }) {
    return (
        <div className="flex items-center justify-center">
            <Loader2 className={`animate-spin h-12 w-12 text-blue-500 ${textColor}`} />
        </div>
    );
}
