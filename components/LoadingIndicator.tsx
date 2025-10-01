import { Loader2 } from "lucide-react";

export default function LoadingIndicator({ textColor }: { textColor: string }) {
    return (
        <div className="flex items-center justify-center">
            <Loader2 className={`animate-spin h-14 w-14 ${textColor ? textColor : 'text-blue-500'}`} />
        </div>
    );
}
