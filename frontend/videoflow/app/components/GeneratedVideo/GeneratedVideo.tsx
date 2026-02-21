"use client";
import { useState } from "react";
import StepIcon from "../UI/icons/StepIcon";
import Check from "../UI/icons/check";

const steps = [
    "Analizando el contenido del video",
    "Extrayendo el fragmento",
    "Conversión a formato vertical",
    "Optimizando para las redes sociales",
    "Optimizando la calidad",
    "Finalizando tu corto",
];

export default function GeneratedVideo() {
    const [progress, setProgress] = useState(0);
    const [complete, setComplete] = useState(false);

    return (
        <div className="w-178 h-115.5 mx-auto mt-10 bg-[#F2F2F7] pb-8 rounded-2xl text-center  border-[0.25px] border-gray-300/90 shadow-[0px_4px_17.6px_0px_#0000001A]">
            <h3 className="text-center text-[#000000] font-semibold text-[21px] my-8">
                Creando tu corto
            </h3>
            <h5 className="text-center text-[#505050] font-semibold text-[17px] my-5">
                Solo tomará unos segundos
            </h5>
            <div className="w-119 mx-auto mt-8 h-5.5  p-1 rounde-[10px] bg-[#FFFFFF] rounded-full overflow-hidden">
                <div
                    className="h-3 rounded-full bg-[#2F27CE] transition-all duration-200"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>

            <div className="flex flex-col gap-3 justify-center items-start w-81.75 h-61 mx-auto mb-15 mt-5 text-[17px]">
                {steps.map((text, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center text-[#505050]"
                    >
                        <p className="text-[#505050]">
                            {complete ? <Check /> : <StepIcon />}
                        </p>
                        <p>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
