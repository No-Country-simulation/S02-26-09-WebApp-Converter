import { redirect } from "next/navigation";
import ScissorsIcon from "../UI/icons/Scissors";
import PrevIcon from "../UI/icons/PrevIcon";
import PlayIcon from "../UI/icons/playIcon";
import PauseIcon from "../UI/icons/pauseIcon";
import NextIcon from "../UI/icons/NextIcon";

type Props = {
    onPrev?: () => void;
    onPlay?: () => void;
    onNext?: () => void;
    isPlaying: boolean;
    duration: number;
    currentTime: number;
    onGenerate?: () => void;
    progressBarRef: React.RefObject<HTMLDivElement | null>;
    hoverTime: number | null;
    hoverPosition: number;
    onSeek: (clientX: number) => void;
    onHover: (clientX: number) => void;
    setHoverTime: React.Dispatch<React.SetStateAction<number | null>>;
    barRef: React.RefObject<HTMLDivElement | null>;
    start: number;
    end: number;
    setDragging: React.Dispatch<React.SetStateAction<"start" | "end" | null>>;
    startTime: number;
    endTime: number;
};

export default function MediaControls({
    onPrev,
    onPlay,
    onNext,
    isPlaying,
    duration,
    currentTime,
    onGenerate,
    hoverTime,
    hoverPosition,
    onSeek,
    onHover,
    progressBarRef,
    setHoverTime,
    barRef,
    start,
    end,
    setDragging,
    startTime,
    endTime,
}: Props) {
    //duración del video total
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    //duración del video y restante
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <div className="m-auto my-5 flex w-33.5 items-center justify-center gap-6 p-2">
                {/*anterior */}
                <button
                    onClick={onPrev}
                    className="group cursor-pointer transition-transform active:scale-95"
                >
                    <PrevIcon />
                </button>

                {/*play-pause*/}
                <button
                    onClick={onPlay}
                    className="group cursor-pointer transition-transform active:scale-95"
                >
                    {isPlaying ? <PlayIcon /> : <PauseIcon />}
                </button>

                {/*siguiente*/}
                <button
                    onClick={onNext}
                    className="group cursor-pointer transition-transform active:scale-95"
                >
                    <NextIcon />
                </button>
            </div>

            {/*barra de tiempo*/}
            <div className="mb-5 flex w-full flex-col gap-2 px-4 sm:px-6">
                <div
                    ref={progressBarRef}
                    className="relative m-auto mt-1 h-2.25 w-full cursor-pointer overflow-hidden rounded-full bg-[#433BFF66]"
                    onClick={(e) => onSeek(e.clientX)}
                    onMouseMove={(e) => onHover(e.clientX)}
                    onMouseLeave={() => setHoverTime(null)}
                    onTouchStart={(e) => onSeek(e.touches[0].clientX)}
                >
                    {/* Tooltip */}
                    {hoverTime !== null && (
                        <div
                            className="absolute -top-7 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white"
                            style={{ left: `${hoverPosition}%` }}
                        >
                            {formatTime(hoverTime)}
                        </div>
                    )}

                    <div
                        className="h-full bg-[#2F27CE] transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-0 flex w-full items-center justify-between text-[14px]">
                    <p>{formatTime(currentTime)}</p>
                    <p>{formatTime(duration)}</p>
                </div>
            </div>
            {/*Barra decorte*/}
            <div className="mt-5 flex w-full flex-col gap-2 px-4 sm:px-6">
                <div className="mt-0 flex w-full items-center justify-between pb-2 text-[14px]">
                    <p className="flex items-center justify-center gap-2 text-[#000000]">
                        <ScissorsIcon />
                        Seleccionar fragmento
                    </p>
                    <p>{formatTime(endTime - startTime)} seleccionado</p>
                </div>
                <div
                    ref={barRef}
                    className="relative flex h-3.75 w-full items-center"
                >
                    {/* fondo */}
                    <div className="absolute h-2.25 w-full rounded-full bg-indigo-300"></div>

                    {/* zona seleccionada */}
                    <div
                        className="absolute h-2.25 rounded-full bg-[#2F27CE]"
                        style={{
                            left: `${start}%`,
                            width: `${end - start}%`,
                        }}
                    />

                    {/* círculo start */}
                    <div
                        onMouseDown={() => setDragging("start")}
                        className="absolute h-3.75 w-3.75 cursor-pointer rounded-full border border-[#2F27CE] bg-white"
                        style={{
                            left: `${start}%`,
                            transform: "translateX(-50%)",
                        }}
                    ></div>

                    {/* círculo end */}
                    <div
                        onMouseDown={() => setDragging("end")}
                        className="absolute h-3.75 w-3.75 cursor-pointer rounded-full border border-[#2F27CE] bg-white"
                        style={{
                            left: `${end}%`,
                            transform: "translateX(-50%)",
                        }}
                    ></div>
                </div>

                <div className="mt-0 flex w-full items-center justify-between pb-2 text-[14px]">
                    <p className="text-[#505050]">
                        Comenzar en{" "}
                        <span className="text-[#000000]">
                            {formatTime(startTime)}
                        </span>
                    </p>
                    <p className="text-[#505050]">
                        Fin{" "}
                        <span className="text-[#000000]">
                            {formatTime(endTime)}
                        </span>
                    </p>
                </div>

                <div className="mt-0 flex w-full items-center justify-between">
                    <button
                        onClick={() => redirect("/")}
                        className="h-10 w-17.5 cursor-pointer rounded-xl text-sm text-[#000000] hover:bg-[#DEDCFF] hover:text-[#282399]"
                    >
                        Atrás
                    </button>
                    <button
                        onClick={onGenerate}
                        className="h-12.5 w-33 cursor-pointer rounded-[10px] bg-[#2F27CE] text-sm font-semibold text-[#FAFAFA]"
                    >
                        generar corto
                    </button>
                </div>
            </div>
        </>
    );
}
