"use client";
import { uploadVideo, getConversionStatus } from "../services/video.service";
import { useState, useEffect } from "react";
import UploadCard from "../components/UploadCard/UploadCard";
import VideoEditor from "../components/VideoEditor/VideoEditor";
import GeneratedVideo from "../components/GeneratedVideo/GeneratedVideo";
import { useRouter } from "next/navigation";
import CortoSuccess from "../components/CortoSuccess/CortoSuccess";
import ErrorGenerated from "../components/errores/error-generated";
import Timeline from "../components/Timeline/Timeline";

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
                        setHasError(true)
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
