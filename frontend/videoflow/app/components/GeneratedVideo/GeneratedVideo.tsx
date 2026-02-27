"use client";
import { useState, useEffect } from "react";
import StepIcon from "../UI/icons/StepIcon";
import Check from "../UI/icons/check";

type Props = {
    onGenerate: () => void;
};

const steps = [
    "Analizando el contenido del video",
    "Extrayendo el fragmento",
    "Conversión a formato vertical",
    "Optimizando para las redes sociales",
    "Optimizando la calidad",
    "Finalizando tu corto",
];

export default function GeneratedVideo({ onGenerate }: Props) {
    const [progress, setProgress] = useState(0);
    const [complete, setComplete] = useState(false);

    // Barra de progreso
    useEffect(() => {
        let value = 0;

        const interval = setInterval(() => {
            value += 1;
            setProgress(value);

            if (value >= 100) {
                clearInterval(interval);
                setComplete(true);
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (complete) {
            const timer = setTimeout(() => {
                onGenerate();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [complete, onGenerate]);

    // Barra de progreso 1, 2, 3, 4  confirmado
    const getStepStatus = (index: number) => {
        const stepProgress = 100 / steps.length;
        return progress >= (index + 1) * stepProgress;
    };

    return (
        <div className="mt-20 flex w-full justify-center px-5 sm:px-12 md:px-39 lg:px-91 2xl:px-151">
            <div className="w-full rounded-2xl border-[0.25px] border-gray-300/90 bg-[#F2F2F7] text-center shadow-[0px_4px_17.6px_0px_#0000001A] sm:w-180 md:w-180">
                <h3 className="my-8 text-center text-[21px] font-semibold text-[#000000]">
                    Creando tu corto
                </h3>
                <h5 className="my-5 text-center text-[17px] font-semibold text-[#505050]">
                    Solo tomará unos segundos
                </h5>

                {/* Barra de progreso */}
                <div className="m-auto h-5.5 w-97.5 sm:w-md overflow-hidden rounded-full bg-[#FFFFFF] p-1">
                    <div
                        className="h-3 rounded-full bg-[#2F27CE] transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mx-auto mt-5 mb-15 flex h-auto w-full max-w-81.75 flex-col items-start justify-center gap-3 px-4 text-[15px] sm:px-0 sm:text-[17px]">
                    {steps.map((text, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 text-[#505050]"
                        >
                            <p className="shrink-0 text-[#505050]">
                                {getStepStatus(index) ? (
                                    <Check />
                                ) : (
                                    <StepIcon />
                                )}
                            </p>
                            <p className="text-left">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
