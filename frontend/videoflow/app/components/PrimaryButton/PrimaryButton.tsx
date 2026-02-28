"use client"
import { FileVideoCamera } from "lucide-react";
import { useRouter } from "next/navigation";
export default function PrimaryButton() {
    const router=useRouter();

    

    return (
        <button
            onClick={() => router.push("/upload-file")}
            className="inline-flex h-14.25 w-44.75 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#2F27CE] text-base font-semibold text-white transition-all hover:bg-[#433BFF]"
        >
            <FileVideoCamera className="h-5 w-5" />
            <span className="text-sm font-semibold sm:text-base">
                Subir video
            </span>
        </button>
    );
}
