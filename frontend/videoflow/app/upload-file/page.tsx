"use client";
import { uploadVideo, getConversionStatus } from "../services/video.service";
import { useState, useEffect } from "react";
import UploadCard from "../components/UploadCard/UploadCard";
import VideoEditor from "../components/VideoEditor/VideoEditor";
import GeneratedVideo from "../components/GeneratedVideo/GeneratedVideo";
import { useRouter } from "next/navigation";
import CortoSuccess from "../components/CortoSuccess/CortoSuccess";
import ErrorGenerated from "../components/errores/error-generated";

const steps = ["Subir", "Seleccionar", "Generar", "Descargar"];

export function Timeline({ currentStep }: { currentStep: number }) {
    return (
        <div className="m-auto mt-17.5 mb-20 flex w-full items-center justify-center px-5 text-gray-400 sm:px-12 md:px-39 lg:px-0">
            <div
                className={`flex h-16.5 w-full max-w-117.5 items-center justify-center gap-2 font-semibold sm:gap-4 md:gap-6`}
            >
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div
                            key={stepNumber}
                            className="relative flex items-start gap-4 sm:w-50 sm:gap-6"
                        >
                            {/*círculo */}
                            <div
                                className={`flex flex-col items-center justify-center`}
                            >
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-300 sm:h-10 sm:w-10 sm:text-base ${
                                        isActive
                                            ? "animate-stepActive border-4 border-fuchsia-100/60 bg-[#2F27CE] text-white"
                                            : isCompleted
                                              ? "border border-indigo-600 bg-indigo-100 text-indigo-600"
                                              : "bg-[#F2F2F7] text-gray-400"
                                    }`}
                                >
                                    {stepNumber}
                                </div>
                            </div>

                            {/* Línea */}
                            {index < steps.length - 1 && (
                                <div className="flex items-center">
                                    <div
                                        className={`mt-4 h-0.5 w-8 transition-all duration-300 sm:mt-5 sm:w-7.5 md:w-14 ${
                                            isCompleted
                                                ? "bg-indigo-600"
                                                : "bg-gray-300"
                                        }`}
                                    />
                                </div>
                            )}

                            <div
                                className={`absolute ${index == 0 && "text-black"} top-12 left-4 -translate-x-1/2 text-center text-xs whitespace-nowrap sm:text-sm`}
                            >
                                {label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function Upload() {
    const [currentStep, setCurrentStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const [outputUrl, setOutputUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const router = useRouter();
    const showSuccess = currentStep === 4 && !!outputUrl;
    const [hasError, setHasError] = useState(false);

    const API = process.env.NEXT_PUBLIC_API_URL;

    // GENERATE
    const handleGenerate = async (startTime?: number, endTime?: number) => {
        if (!file) return;

        try {
            setHasError(false);
            setCurrentStep(3);
            setProgress(5);

          
            const data = await uploadVideo(file, startTime, endTime);
            const jobId = data.id;

            const interval = setInterval(async () => {
                try {
                    const updated = await getConversionStatus(jobId);

                    // progreso visual
                    setProgress((prev) => {
                        if (prev < 100) return prev + 5;
                        return prev;
                    });

                    if (updated.status === "COMPLETED") {
                        clearInterval(interval);

                        setProgress(100);
                        setOutputUrl(`${API}${updated.outputUrl}`);

                        //equeña pausa barra
                        setTimeout(() => {
                            setCurrentStep(4);
                        }, 2000);
                    }

                    if (updated.status === "FAILED") {
                        clearInterval(interval);
                        console.error("Falló la conversión");
                    }
                } catch (error) {
                    console.error("Error consultando estado:", error);
                    clearInterval(interval);
                    setHasError(true);
                }
            }, 2000);
        } catch (error) {
            console.error("Error subiendo video:", error);
            setHasError(true);
        }
    };

    // rediccionamos
    useEffect(() => {
        if (!showSuccess) return;

        const timer = setTimeout(() => {
            router.push(`/Download?videoUrl=${encodeURIComponent(outputUrl!)}`);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showSuccess, outputUrl, router]);

    if (showSuccess) {
        return <CortoSuccess />;
    }

    if (hasError) {
        return (
            <ErrorGenerated
                onRetry={() => {
                    setHasError(false);
                    setCurrentStep(1);
                    setFile(null);
                    setOutputUrl(null);
                    setProgress(0);
                }}
            />
        );
    }
    return (
        <>
            <Timeline currentStep={currentStep} />

            {currentStep === 1 && (
                <UploadCard
                    onUploadComplete={(uploadedFile) => {
                        setFile(uploadedFile);
                        setTimeout(() => setCurrentStep(2), 1000);
                    }}
                />
            )}

            {currentStep === 2 && file && (
                <VideoEditor file={file} onGenerate={handleGenerate} />
            )}

            {currentStep === 3 && <GeneratedVideo progress={progress} />}
        </>
    );
}
