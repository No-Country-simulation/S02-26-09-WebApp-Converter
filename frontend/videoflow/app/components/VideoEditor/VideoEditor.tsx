"use client";
import MediaControls from "../MediaControls/MediaControls";
import { useRef, useState, useEffect, useMemo } from "react";

type Props = {
    file: File;
    onGenerate: (startTime: number, endTime: number) => void;
};

export default function VideoEditor({ file, onGenerate }: Props) {
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
    const [dragging, setDragging] = useState<"start" | "end" | null>(null);
    // estados para tooltip y hover
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [hoverPosition, setHoverPosition] = useState(0);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const startTime = (start / 100) * duration;
    const endTime = (end / 100) * duration;

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

        video.currentTime = Math.max(0, video.currentTime - 5);
    };

    const handleNext = () => {
        const video = originalRef.current;
        if (!video) return;

        video.currentTime = Math.min(duration, video.currentTime + 5);
    };

    // adelantar o retroceder con la barra
    const handleSeek = (clientX: number) => {
        if (!progressBarRef.current || !duration) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = (clientX - rect.left) / rect.width;
        const clamped = Math.min(Math.max(percent, 0), 1);
        const newTime = clamped * duration;
        const video = originalRef.current;
        if (!video) return;
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // actualizar tooltip al hacer hover
    const handleHover = (clientX: number) => {
        if (!progressBarRef.current || !duration) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = (clientX - rect.left) / rect.width;
        const clamped = Math.min(Math.max(percent, 0), 1);

        setHoverPosition(clamped * 100);
        setHoverTime(clamped * duration);
    };

    
   useEffect(() => {
    const handleMove = (clientX: number) => {
        if (!dragging || !barRef.current) return;

        const rect = barRef.current.getBoundingClientRect();
        const percent = ((clientX - rect.left) / rect.width) * 100;
        const clamped = Math.min(Math.max(percent, 0), 100);

        if (dragging === "start") {
            setStart(Math.min(clamped, end - 1));
        }

        if (dragging === "end") {
            setEnd(Math.max(clamped, start + 1));
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    const stopDragging = () => setDragging(null);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", stopDragging);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", stopDragging);

        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", stopDragging);
    };
}, [dragging, start, end]);

    return (
        <div className="mt-10 mb-18.25 flex w-full justify-center px-5 sm:px-14.5 md:px-25">
            <div className="mx-auto w-full max-w-178 rounded-2xl border-[0.25px] border-gray-300/90 bg-[#F2F2F7] pb-8 shadow-[0px_4px_17.6px_0px_#0000001A]">
                <video
                    ref={originalRef}
                    className="w-full rounded-tl-2xl rounded-tr-2xl"
                    src={videoUrl}
                    onLoadedMetadata={(e) =>
                        setDuration(e.currentTarget.duration)
                    }
                    onTimeUpdate={(e) =>
                        setCurrentTime(e.currentTarget.currentTime)
                    }
                />

                <MediaControls
                    onPrev={handlePrev}
                    onPlay={handlePlayPause}
                    onNext={handleNext}
                    isPlaying={isPlaying}
                    duration={duration}
                    currentTime={currentTime}
                    onGenerate={() => onGenerate(startTime, endTime)}
                    progressBarRef={progressBarRef}
                    hoverTime={hoverTime}
                    hoverPosition={hoverPosition}
                    onSeek={handleSeek}
                    onHover={handleHover}
                    setHoverTime={setHoverTime}
                    barRef={barRef}
                    start={start}
                    end={end}
                    setDragging={setDragging}
                    startTime={startTime}
                    endTime={endTime}
                />
            </div>
        </div>
    );
}
