"use client";
import { useSearchParams } from "next/navigation";
import DownloadIcon from "../UI/icons/Download-icon";
import { useRef, useState } from "react";
import Link from "next/link";
import { Timeline } from "@/app/upload-file/page";
import PlayDownloadIcon from "../UI/icons/play-Download-icon";
import { Volume2, VolumeOff } from "lucide-react";

export default function Download() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [quality, setQuality] = useState("");
    const [volume, setVolume] = useState(0.9);
    const [prevVolume, setPrevVolume] = useState(0.5);
    const [showVolume, setShowVolume] = useState(false);
    const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showControls, setShowControls] = useState(true);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    //obtenemos el video
    const searchParams = useSearchParams();
    const videoUrl = searchParams.get("videoUrl");

    if (!videoUrl) {
        return <p className="text-center">No se pudo obtener el video!</p>;
    }
    //descarga
    const handleDownload = async () => {
        try {
            const response = await fetch(videoUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "Shortify-corto.mp4";
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error descargando el video:", error);
        }
    };

    //tiempo del video
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };


    const handleToggle = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    //calidad
    const handleMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;

        setDuration(video.duration);

        const height = video.videoHeight;

        if (height >= 2160) setQuality("4K");
        else if (height >= 1440) setQuality("1440p");
        else if (height >= 1080) setQuality("1080p");
        else if (height >= 720) setQuality("720p");
        else if (height >= 480) setQuality("480p");
        else setQuality(`${height}p`);
    };

    //volumen
    const handleVolumeChange = (value: number) => {
        setVolume(value);
        if (videoRef.current) {
            videoRef.current.volume = value;
        }
    };

    //alternar mute
    const toggleVolume = () => {
        if (!videoRef.current) return;

        if (volume === 0) {
            const newVolume = prevVolume || 1;
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
        } else {
            setPrevVolume(volume);
            videoRef.current.volume = 0;
            setVolume(0);
        }
    };

    const startTemporaryVisibility = (
        setter: React.Dispatch<React.SetStateAction<boolean>>,
        ref: React.MutableRefObject<NodeJS.Timeout | null>
    ) => {
        setter(true);

        if (ref.current) {
            clearTimeout(ref.current);
        }

        ref.current = setTimeout(() => {
            setter(false);
        }, 4000);
    };

    const showVolumeTemporarily = () =>
        startTemporaryVisibility(setShowVolume, volumeTimeoutRef);

    const showControlsTemporarily = () =>
        startTemporaryVisibility(setShowControls, controlsTimeoutRef);
    return (
        <>
            <Timeline currentStep={4} />
            <section className="mx-auto mt-15 mb-18.25 flex flex-col items-center gap-10 lg:h-130.5 lg:w-230 lg:flex-row lg:justify-between">
                <div
                    className="12px relative mt-10 h-105 w-full max-w-81.25 rounded-xl border border-[#00000047] lg:mt-13 lg:h-118 lg:w-81.25"
                    onMouseMove={showControlsTemporarily}
                    onTouchStart={showControlsTemporarily}
                >
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        className="h-full w-full rounded-xl object-cover"
                        onTimeUpdate={(e) =>
                            setCurrentTime(e.currentTarget.currentTime)
                        }
                        onLoadedMetadata={handleMetadata}
                        onEnded={() => setIsPlaying(false)}
                    />

                    <div
                        onClick={handleToggle}
                        className={`absolute inset-0 z-10 flex items-center justify-center rounded-xl transition ${
                            !isPlaying && showControls ? "bg-black/40" : ""
                        } ${showControls ? "cursor-pointer" : "pointer-events-none"}`}
                    >
                        <div
                            className={`transition-all duration-300 ${
                                showControls
                                    ? "scale-100 opacity-100"
                                    : "scale-75 opacity-0"
                            }`}
                        >
                            <PlayDownloadIcon isPlaying={isPlaying} />
                        </div>
                    </div>

                    <div className="absolute right-3 bottom-3 z-20 rounded-md bg-gray-500 px-2 py-1 text-[10px] text-white">
                        {formatTime(currentTime)}
                    </div>
                    {/*Botón de volumen */}
                    <div
                        className="absolute right-3 bottom-12 z-30"
                        onMouseEnter={showVolumeTemporarily}
                        onMouseLeave={showVolumeTemporarily}
                        onTouchStart={showVolumeTemporarily}
                    >
                        <button
                            onClick={() => {
                                toggleVolume();
                                showVolumeTemporarily();
                            }}
                            className="rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition"
                        >
                            {volume === 0 ? (
                                <VolumeOff className="h-4 w-4 cursor-pointer" />
                            ) : (
                                <Volume2 className="h-4 w-4 cursor-pointer" />
                            )}
                        </button>
                    </div>

                    {/*Barra vertica*/}
                    <div
                        onMouseEnter={() => setShowVolume(true)}
                        onMouseLeave={showVolumeTemporarily}
                        onTouchStart={() => setShowVolume(true)}
                        className={`absolute right-6 bottom-24 z-20 transition-all duration-300 ${
                            showVolume
                                ? "translate-y-0 opacity-100"
                                : "pointer-events-none translate-y-4 opacity-0"
                        }`}
                    >
                        <div className="relative flex h-28 w-2 items-end overflow-hidden rounded-full bg-white/20">
                            {/* Nivel visible*/}
                            <div
                                className="w-full bg-white transition-all duration-200"
                                style={{ height: `${volume * 100}%` }}
                            />

                            {/* Input invisible*/}
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) =>
                                    handleVolumeChange(Number(e.target.value))
                                }
                                className="absolute inset-0 cursor-pointer opacity-0"
                                style={{
                                    writingMode: "vertical-lr",
                                    direction: "rtl",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex w-full max-w-104.75 flex-col lg:mb-24 lg:h-106.75 lg:w-104.75">
                    <div className="gap-6">
                        <p className="text-[21px] font-medium text-[#050315]">
                            Tu corto ya está listo
                        </p>

                        <p className="font-inter text-[14px] leading-[130%] font-normal text-[#505050]">
                            Descargá tu video vertical optimizado para
                            plataformas de redes sociales.
                        </p>
                    </div>

                    {/*Info*/}
                    <div className="mt-7 flex w-full flex-col gap-2 rounded-[15px] bg-[#F2F2F7] p-6.25 lg:h-45.75 lg:w-104.75">
                        <div className="flex justify-between">
                            <p className="text-[#505050]">Duración</p>
                            <p className="text-[#000000]">
                                {formatTime(duration)}
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-[#505050]">Formato</p>
                            <p className="text-[#000000]">mp4</p>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-[#505050]">Calidad</p>
                            <p className="text-[#000000]">{quality}</p>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-[#505050]">Plataformas</p>
                            <p className="text-[#000000]">
                                TikTok, Reels, Shorts
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 w-full lg:h-30 lg:w-104.75">
                        <button
                            onClick={handleDownload}
                            className="flex h-12.5 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#2F27CE] px-6 py-3 text-[#FAFAFA]"
                        >
                            <DownloadIcon />
                            Descargar
                        </button>

                        <Link
                            href="/upload-file"
                            className="mt-4 flex h-12.5 w-full items-center justify-center rounded-xl bg-[#F2F2F7] px-5 py-2.5 text-center text-[#000000]"
                        >
                            Crear otro corto
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
