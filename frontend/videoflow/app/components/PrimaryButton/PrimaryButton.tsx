import { FileVideoCamera } from "lucide-react";
export default function PrimaryButton() {
    return (
        <button className="flex items-center justify-center gap-2 min-w-40 md:w-44 mx-auto mt-8 sm:mt-10 md:mt-12 bg-blue-700 hover:bg-blue-600 border p-2 sm:p-3 rounded-lg text-white cursor-pointer transition-all">
            <FileVideoCamera className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">
                Empezá a crear
            </span>
        </button>
    );
}
