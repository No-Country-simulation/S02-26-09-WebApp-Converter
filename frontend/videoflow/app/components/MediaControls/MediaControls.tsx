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
};

export default function MediaControls({
    onPrev,
    onPlay,
    onNext,
    isPlaying,
    duration,
    currentTime,
    onGenerate,
}: Props) {
    //duración del video total
    const progress =
        duration > 0 ? (currentTime / duration) * 100 : 0;
    //duración del video y restante
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <div className="w-33.5 m-auto flex items-center justify-center gap-6 my-5 p-2">
                {/*anterior */}
                <button
                    onClick={onPrev}
                    className="group transition-transform active:scale-95 cursor-pointer"
                >
                    <PrevIcon />
                </button>

                {/*play-pause*/}
                <button
                    onClick={onPlay}
                    className="group transition-transform active:scale-95 cursor-pointer"
                >
                    {isPlaying ? (
                        <PlayIcon />
                    ) : (
                        <PauseIcon />
                    )}
                </button>

                {/*siguiente*/}
                <button
                    onClick={onNext}
                    className="group transition-transform active:scale-95 cursor-pointer"
                >
                    <NextIcon />
                </button>
            </div>

            {/*barra de tiempo*/}
            <div className="w-178 flex flex-col gap-2 mb-5">
                <div className="w-166.5 h-2.25 rounded-full bg-[#433BFF66] m-auto mt-1 relative overflow-hidden">
                    <div
                        className="h-full bg-[#2F27CE] transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="w-166.5 flex justify-between items-center  mt-0 text-[14px] m-auto ">
                    <p>{formatTime(currentTime)}</p>
                    <p>{formatTime(duration)}</p>
                </div>
            </div>
            {/*Barra decorte*/}
            <div className="w-178 flex flex-col gap-2 mt-5">
                <div className="w-166.5 flex justify-between items-center mt-0 text-[14px] m-auto pb-2">
                    <p className="text-[#000000] flex justify-center items-center gap-2">
                        <ScissorsIcon />
                        Seleccionar fragmento
                    </p>

                    <p>0:00 seleccionado</p>
                </div>
                <div className="relative flex items-center w-166.5 h-3.75 m-auto ">
                    {/* Barra azul */}
                    <div className="absolute w-166.5 h-2.25 rounded-full bg-[#2F27CE] "></div>
                    {/* Círculo izquierdo */}
                    <div className="absolute left-0 w-3.75 h-3.75 border border-[#2F27CE] bg-white rounded-full cursor-pointer"></div>
                    {/* Círculo derecho */}
                    <div className="absolute right-0 w-3.75 h-3.75 border border-[#2F27CE] bg-white rounded-full cursor-pointer"></div>
                </div>

                <div className="w-166.5 flex justify-between items-center mt-0 text-[14px] m-auto pb-2">
                    <p className="text-[#505050]">
                        Comenzar en{" "}
                        <span className="text-[#000000]">
                            0:00
                        </span>
                    </p>
                    <p className="text-[#505050]">
                        Fin{" "}
                        <span className="text-[#000000]">
                            0:42
                        </span>
                    </p>
                </div>
                <div className="w-166.5 flex justify-between items-cente mt-0 m-auto">
                    <button
                        onClick={() => redirect("/")}
                        className="w-17.5 h-10 rounded-xl  text-[#000000] text-sm cursor-pointer hover:bg-[#DEDCFF] hover:text-[#282399]"
                    >
                        Atrás
                    </button>
                    <button
                        onClick={onGenerate}
                        className="w-33 h-12.5 text-[#FAFAFA] font-semibold bg-[#2F27CE] text-sm rounded-[10px] cursor-pointer"
                    >
                        generar corto
                    </button>
                </div>
            </div>
        </>
    );
}
