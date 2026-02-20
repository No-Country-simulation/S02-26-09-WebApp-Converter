import { redirect } from "next/navigation";

type Props = {
    onPrev?: () => void;
    onPlay?: () => void;
    onNext?: () => void;
    isPlaying: boolean;
};

export default function MediaControls({
    onPrev,
    onPlay,
    onNext,
    isPlaying,
}: Props) {
    return (
        <>
            <div className="w-33.5 m-auto flex items-center justify-center gap-6 my-5 p-2">
                {/*anterior */}
                <button
                    onClick={onPrev}
                    className="group transition-transform active:scale-95 cursor-pointer"
                >
                    <svg
                        transform="rotate(180)"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                    >
                        <path
                            d="M13 4C13 4 13 11.8674 13 12C13 12.1326 12.9473 12.2598 12.8536 12.3536C12.7598 12.4473 12.6326 12.5 12.5 12.5C12.3674 12.5 12.2402 12.4473 12.1464 12.3536C12.0527 12.2598 12 12.1326 12 12V4C12 3.86739 12.0527 3.74021 12.1464 3.64645C12.2402 3.55268 12.3674 3.5 12.5 3.5C12.6326 3.5 12.7598 3.55268 12.8536 3.64645C12.9473 3.74021 13 3.86739 13 4ZM10.5 8C10.5003 8.16635 10.4584 8.33006 10.3783 8.47585C10.2982 8.62164 10.1824 8.74477 10.0419 8.83375L4.53 12.3431C4.38001 12.439 4.20703 12.4929 4.02911 12.4991C3.8512 12.5053 3.67488 12.4637 3.51856 12.3785C3.36224 12.2933 3.23165 12.1677 3.14044 12.0148C3.04922 11.862 3.00072 11.6874 3 11.5094V4.49062C3.00072 4.3126 3.04922 4.13804 3.14044 3.98516C3.23165 3.83228 3.36224 3.70669 3.51856 3.62151C3.67488 3.53632 3.8512 3.49467 4.02911 3.50089C4.20703 3.50711 4.38001 3.56098 4.53 3.65687L10.0419 7.16625C10.1824 7.25523 10.2982 7.37836 10.3783 7.52415C10.4584 7.66994 10.5003 7.83365 10.5 8ZM9.48875 8L4 4.505V11.4956L9.48875 8Z"
                            fill="#505050"
                        />
                    </svg>
                </button>

                {/*play  */}
                <button
                    onClick={onPlay}
                    className="group transition-transform active:scale-95 cursor-pointer"
                >
                    <svg
                        viewBox="0 0 100 100"
                        className="w-11 h-11"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="#2F27CE"
                            className="group-hover:opacity-90 transition-opacity"
                        />
                        {isPlaying ? (
                            <>
                                <rect
                                    x="38"
                                    y="30"
                                    width="8"
                                    height="40"
                                    rx="2"
                                    fill="white"
                                />
                                <rect
                                    x="54"
                                    y="30"
                                    width="8"
                                    height="40"
                                    rx="2"
                                    fill="white"
                                />
                            </>
                        ) : (
                            <path
                                d="M42 35L65 50L42 65V35Z"
                                fill="#FFFFFF"
                            />
                        )}
                    </svg>
                </button>

                {/*siguiente*/}
                <button
                    onClick={onNext}
                    className="group transition-transform active:scale-95 cursor-pointer"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                    >
                        <path
                            d="M13 4C13 4 13 11.8674 13 12C13 12.1326 12.9473 12.2598 12.8536 12.3536C12.7598 12.4473 12.6326 12.5 12.5 12.5C12.3674 12.5 12.2402 12.4473 12.1464 12.3536C12.0527 12.2598 12 12.1326 12 12V4C12 3.86739 12.0527 3.74021 12.1464 3.64645C12.2402 3.55268 12.3674 3.5 12.5 3.5C12.6326 3.5 12.7598 3.55268 12.8536 3.64645C12.9473 3.74021 13 3.86739 13 4ZM10.5 8C10.5003 8.16635 10.4584 8.33006 10.3783 8.47585C10.2982 8.62164 10.1824 8.74477 10.0419 8.83375L4.53 12.3431C4.38001 12.439 4.20703 12.4929 4.02911 12.4991C3.8512 12.5053 3.67488 12.4637 3.51856 12.3785C3.36224 12.2933 3.23165 12.1677 3.14044 12.0148C3.04922 11.862 3.00072 11.6874 3 11.5094V4.49062C3.00072 4.3126 3.04922 4.13804 3.14044 3.98516C3.23165 3.83228 3.36224 3.70669 3.51856 3.62151C3.67488 3.53632 3.8512 3.49467 4.02911 3.50089C4.20703 3.50711 4.38001 3.56098 4.53 3.65687L10.0419 7.16625C10.1824 7.25523 10.2982 7.37836 10.3783 7.52415C10.4584 7.66994 10.5003 7.83365 10.5 8ZM9.48875 8L4 4.505V11.4956L9.48875 8Z"
                            fill="#505050"
                        />
                    </svg>
                </button>
            </div>

            {/*barra de tiempo*/}
            <div className="w-178 flex flex-col gap-2 mb-5">
                <div className="w-166.5 h-2.25 rounded-full bg-[#433BFF66] m-auto mt-1"></div>
                <div className="w-166.5 flex justify-between items-center  mt-0 text-[14px] m-auto ">
                    <p>00:00</p> <p>00:43</p>
                </div>
            </div>
            {/*Barra decorte*/}
            <div className="w-178 flex flex-col gap-2 mt-5">
                <div className="w-166.5 flex justify-between items-center mt-0 text-[14px] m-auto pb-2">
                    <p className="text-[#000000] flex justify-center items-center gap-2">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.1 5.1L16.5 15.5M6.1 11.9L16.5 1.5M0.5 3.5C0.5 4.29565 0.816071 5.05871 1.37868 5.62132C1.94129 6.18393 2.70435 6.5 3.5 6.5C4.29565 6.5 5.05871 6.18393 5.62132 5.62132C6.18393 5.05871 6.5 4.29565 6.5 3.5C6.5 2.70435 6.18393 1.94129 5.62132 1.37868C5.05871 0.816071 4.29565 0.5 3.5 0.5C2.70435 0.5 1.94129 0.816071 1.37868 1.37868C0.816071 1.94129 0.5 2.70435 0.5 3.5ZM0.5 13.5C0.5 14.2956 0.816071 15.0587 1.37868 15.6213C1.94129 16.1839 2.70435 16.5 3.5 16.5C4.29565 16.5 5.05871 16.1839 5.62132 15.6213C6.18393 15.0587 6.5 14.2956 6.5 13.5C6.5 12.7044 6.18393 11.9413 5.62132 11.3787C5.05871 10.8161 4.29565 10.5 3.5 10.5C2.70435 10.5 1.94129 10.8161 1.37868 11.3787C0.816071 11.9413 0.5 12.7044 0.5 13.5Z"
                                stroke="#2F27CE"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Seleccionar fragmento
                    </p>

                    <p>0:00 seleccionado</p>
                </div>
                <div className="relative flex items-center w-166.5 h-3.75 m-auto ">
                    {/* Barra azul */}
                    <div className="absolute w-166.5 h-2.25 rounded-full bg-[#2F27CE] "></div>

                    {/* Círculo */}
                    <div className="relative w-3.75 h-3.75 border border-[#2F27CE] bg-white rounded-full cursor-pointer"></div>
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
                        onClick={()=>redirect("/")}
                        className="w-17.5 h-10 rounded-xl  text-[#000000] text-sm cursor-pointer hover:bg-[#DEDCFF] hover:text-[#282399]"
                    >
                        Atrás
                    </button>
                    <button className="w-33 h-12.5 text-[#FAFAFA] font-semibold bg-[#2F27CE] text-sm rounded-[10px] cursor-pointer">
                        generar corto
                    </button>
                </div>
            </div>
        </>
    );
}
