"use client"
import { FileVideoCamera } from "lucide-react";
import { useRouter } from "next/navigation";
export default function PrimaryButton() {
    const router=useRouter();

    

    return (
        <button
            onClick={() => router.push("/upload-file")}
            className="inline-flex items-center gap-2 cursor-pointer bg-[#2F27CE] text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-[#433BFF] transition-all"
        >
            <FileVideoCamera className="w-5 h-5" />
            <span className="text-sm sm:text-base font-semibold">
                Subir video
            </span>
        </button>
    );
}
