import CameraIcon from "./CameraIcon";

export default function Logo() {
    return (
        <div className="flex items-center gap-3">
            <CameraIcon />
            <h3 className="text-base font-inter font-semibold text-black">
                Shortify
            </h3>
        </div>
    );
}
