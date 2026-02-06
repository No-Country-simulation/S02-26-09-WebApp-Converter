import { FileVideoCamera } from "lucide-react";
export default function PrimaryButton() {
    return (
        <button className="flex items-center justify-center gap-2 min-w-40 md:w-44 mx-auto mt-8 sm:mt-10 md:mt-12 bg-[#2F27CE] text-[#FAFAFA] hover:bg-blue-800  p-2 sm:p-3 rounded-lg cursor-pointer transition-all">
            <FileVideoCamera className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-semibold">
                Empezá a crear
            </span>
        </button>
    );
}
