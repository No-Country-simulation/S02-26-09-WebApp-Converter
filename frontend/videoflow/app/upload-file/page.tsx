"use client";

import { useState } from "react";
import UploadCard from "../components/UploadCard/UploadCard";
import VideoEditor from "../components/VideoEditor/VideoEditor";

const steps = [
    "Subir",
    "Seleccionar",
    "Generar",
    "Exportar",
];

function Timeline({
    currentStep,
}: {
    currentStep: number;
}) {
    //text-[#797979]
    return (
        <div
            className={`flex justify-center items-start gap-6 mx-auto text-black font-semibold mt-8`}
        >
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted =
                    stepNumber < currentStep;

                return (
                    <div
                        key={stepNumber}
                        className="flex items-start"
                    >
                        <div
                            className={`flex flex-col items-center ${index !== 0 && "text-[#797979]"}`}
                        >
                            <div
                                className={`
              flex justify-center items-center
              w-10 h-10
              rounded-full
              transition-all duration-300
              ${
                  isActive
                      ? "bg-[#2F27CE] border-4 border-fuchsia-100/60 text-white"
                      : isCompleted
                        ? "bg-indigo-100 border border-indigo-600 text-indigo-600"
                        : "bg-[#F2F2F7] border border-gray-300 text-gray-400"
              }
            `}
                            >
                                {stepNumber}
                            </div>

                            <p className="text-sm mt-2">
                                {label}
                            </p>
                        </div>

                        {/* Línea */}
                        {index < steps.length - 1 && (
                            <div className="flex items-center">
                                <div
                                    className={`
                w-14 h-0.5 mx-3 mt-5
                transition-all duration-300
                ${
                    isCompleted
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                }
              `}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function Upload() {
    const [currentStep, setCurrentStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);

    return (
        <>
            <Timeline currentStep={currentStep} />

            {currentStep === 1 && (
                <UploadCard
                    onUploadComplete={(uploadedFile) => {
                        setFile(uploadedFile);
                        setCurrentStep(2);
                    }}
                />
            )}

            {currentStep === 2 && file && (
                <VideoEditor
                    file={file}
                    onGenerate={() => {
                        setCurrentStep(3);
                    }}
                />
            )}

            {currentStep === 3 && (
                <div className="text-center mt-10 text-lg font-semibold">
                    a terminar
                </div>
            )}
        </>
    );
}
