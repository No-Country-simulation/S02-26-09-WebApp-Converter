"use client";
import MediaControls from "../MediaControls/MediaControls";
import {
    useRef,
    useState,
    useEffect,
    useMemo,
} from "react";

type Props = {
    file: File;
    onGenerate: () => void;
};

export default function VideoEditor({
    file,
    onGenerate,
}: Props) {
    const originalRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoUrl = useMemo(() => {
        return URL.createObjectURL(file);
    }, [file]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(100);
    const barRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<
        "start" | "end" | null
    >(null);

    const handlePlayPause = () => {
        const video = originalRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handlePrev = () => {
        const video = originalRef.current;
        if (!video) return;

        video.currentTime = Math.max(
            0,
            video.currentTime - 5,
        );
    };

    const handleNext = () => {
        const video = originalRef.current;
        if (!video) return;

        video.currentTime = Math.min(
            duration,
            video.currentTime + 5,
        );
    };

    //barra para cortar

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (!dragging || !barRef.current) return;

            const rect =
                barRef.current.getBoundingClientRect();
            const percent =
                ((e.clientX - rect.left) / rect.width) *
                100;
            const clamped = Math.min(
                Math.max(percent, 0),
                100,
            );

            if (dragging === "start") {
                setStart(Math.min(clamped, end - 1));
            }

            if (dragging === "end") {
                setEnd(Math.max(clamped, start + 1));
            }
        };

        const stopDragging = () => setDragging(null);

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", stopDragging);

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMove,
            );
            window.removeEventListener(
                "mouseup",
                stopDragging,
            );
        };
    }, [dragging, start, end]);

    return (
        <div className="w-178 mx-auto mt-10  bg-[#F2F2F7] pb-8 rounded-2xl  border-[0.25px] border-gray-300/90 shadow-[0px_4px_17.6px_0px_#0000001A]">
            <video
                ref={originalRef}
                className="w-178 rounded-tr-2xl rounded-tl-2xl"
                src={videoUrl}
                onLoadedMetadata={(e) =>
                    setDuration(e.currentTarget.duration)
                }
                onTimeUpdate={(e) =>
                    setCurrentTime(
                        e.currentTarget.currentTime,
                    )
                }
            />

            <MediaControls
                onPrev={handlePrev}
                onPlay={handlePlayPause}
                onNext={handleNext}
                isPlaying={isPlaying}
                duration={duration}
                currentTime={currentTime}
                onGenerate={onGenerate}
            />
        </div>
    );
}
