import { Video } from "lucide-react";

export default function CameraIcon() {
    return (
        <div className="w-10 h-10 flex items-center justify-center bg-[#2F27CE] rounded-lg">
            <Video
                className="w-6 h-6 text-white"
                strokeWidth={1.5}
            />
        </div>
    );
}
