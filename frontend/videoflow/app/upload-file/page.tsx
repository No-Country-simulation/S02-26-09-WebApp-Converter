"use client";
import { uploadVideo, getConversionStatus } from "../services/video.service";
import { useState,useEffect } from "react";
import UploadCard from "../components/UploadCard/UploadCard";
import VideoEditor from "../components/VideoEditor/VideoEditor";
import GeneratedVideo from "../components/GeneratedVideo/GeneratedVideo";
import { useRouter } from "next/navigation";
import CortoSuccess from "../components/CortoSuccess/CortoSuccess";



const steps = ["Subir", "Seleccionar", "Generar", "Descargar"];

export function Timeline({ currentStep }: { currentStep: number }) {
    return (
        <div className=" mt-17.5 mb-20 flex w-full justify-center items-center text-gray-400 px-5 sm:px-12 md:px-39 lg:px-0 m-auto">
            <div
                className={` flex justify-center items-center h-16.5 w-full max-w-117.5  gap-2 font-semibold sm:gap-4 md:gap-6`}
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
                                            ? " animate-stepActive border-4 border-fuchsia-100/60 bg-[#2F27CE] text-white"
                                            : isCompleted
                                              ? "border border-indigo-600 bg-indigo-100 text-indigo-600"
                                              : "border border-gray-300 bg-[#F2F2F7] text-gray-400"
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
    const showSuccess = currentStep === 4 && !!outputUrl;
    const router=useRouter();

    //generate
    const handleGenerate = async () => {
        if (!file) return;

        try {
            setCurrentStep(3);

            const data = await uploadVideo(file);
            const jobId = data.id;

            const interval = setInterval(async () => {
                try {
                    const updated = await getConversionStatus(jobId);

                    if (updated.status === "COMPLETED") {
                        clearInterval(interval);
                        setOutputUrl(
                            `http://localhost:8080${updated.outputUrl}`
                        );
                        setCurrentStep(4)
                    }

                    if (updated.status === "FAILED") {
                        clearInterval(interval);
                        console.error("Falló la conversión");
                    }
                } catch (error) {
                    console.error("Error consultando estado:", error);
                    clearInterval(interval);
                }
            }, 2000);
        } catch (error) {
            console.error("Error subiendo video:", error);
        }
    }; 
    
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
    return (
        <>
            {/* Barra de progreso 1, 2, 3, 4 */}

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
                <VideoEditor file={file} onGenerate={handleGenerate} />
            )}

            {currentStep === 3 && (
                <div className="mt-10 text-center text-lg font-semibold">
                    <GeneratedVideo
                        onGenerate={() => {
                            handleGenerate();
                        }}
                    />
                </div>
            )}
        
        </>
    );
}
