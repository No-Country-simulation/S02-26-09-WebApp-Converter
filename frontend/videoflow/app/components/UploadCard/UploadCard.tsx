"use client";
import { useState, useRef, useEffect } from "react";
import { FileVideoCamera } from "lucide-react";
import UploadIcon from "../UI/icons/upload-icon";

type UploadCardProps = {
    onUploadComplete?: (file: File) => void;
};
export default function UploadCard({ onUploadComplete }: UploadCardProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(10);
    const [status, setStatus] = useState<"idle" | "uploading" | "completed">("idle");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const completedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const MAX_SIZE = 500 * 1024 * 1024;

    const handleFile = (selectedFile: File) => {
        //validamos
        if (!selectedFile.type.startsWith("video/")) {
            setError("Formatos compatibles: MP4-WebM-MOV-AVI");
            return;
        }
        if (selectedFile.size > MAX_SIZE) {
            setError("El archivo supera el tamaño máximo de 500MB");
            return;
        }

        setFile(selectedFile);
        setProgress(0);
        setStatus("uploading");

        //animación
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return prev;
                return prev + 8;
            });
        }, 150);

        // respuesta exitosa
        completedTimeoutRef.current = setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            setProgress(100);
            setStatus("completed");

            //avis al componente padre
            if (onUploadComplete) {
                onUploadComplete(selectedFile);
            }
        }, 2000);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (completedTimeoutRef.current) {
                clearTimeout(completedTimeoutRef.current);
            }
        };
    }, []);
    
    //inicia-termina el error
    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setError(null);
        }, 4000);

        return () => clearTimeout(timer);
    }, [error]);

    //"primera sección del carga de video responisve"
    return (
        <div className="mt-20 mb-18.25 w-full px-5 sm:px-12 md:px-39">
            <div className="mx-auto flex w-full flex-col gap-7.25 rounded-2xl border border-dashed border-[#797979] bg-[#F2F2F7] px-4 py-8 sm:px-6 lg:h-89.25 lg:w-178">
                {status === "idle" && (
                    <p className="m-auto flex h-5.5 w-22.5 items-center justify-center text-center text-gray-500">
                        <UploadIcon />
                    </p>
                )}

                {status === "uploading" && (
                    <p className="m-auto h-8 w-8">
                        <FileVideoCamera className="m-auto h-6 w-5.5 text-[#2F27CE]" />
                    </p>
                )}

                {status !== "completed" && (
                    <>
                        <p className="text-center text-lg font-semibold text-[#050315]">
                            Subí tu video
                        </p>
                    </>
                )}

                {status !== "completed" && (
                    <>
                        <p className="text-center text-sm font-semibold text-[#505050]">
                            Arrastrá y soltá tu video horizontal o hace clic
                            para explorar
                        </p>
                    </>
                )}
                {/*idle*/}
                {status === "idle" && (
                    <>
                        <label className="m-auto flex h-12.5 w-43.75 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2F27CE] px-6 py-3 text-white transition hover:bg-[#433BFF]">
                            <FileVideoCamera className="h-5 w-5" />
                            <span>Subir video</span>

                            <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) => {
                                    const selected = e.target.files?.[0];
                                    if (selected) handleFile(selected);
                                }}
                            />
                        </label>
                        <p className="text-center text-sm font-semibold text-[#505050]">
                            Formatos compatibles: MP4, WebM, MOV, AVI • Tamaño
                            máximo: 500 MB
                        </p>
                        {/*preguntar!!!!*/}
                        {error && (
                            <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center mb-15">
                                <div className="animate-errorOpen relative overflow-hidden rounded-md border border-red-500/60 bg-[#4d4c4c] px-8 py-4">
                                    <div className="absolute top-0 left-0 h-full w-1 bg-red-600" />
                                    <div className="absolute top-0 right-0 h-full w-1 bg-red-600" />
                                    <p className="text-center text-sm font-semibold tracking-wider text-red-400">
                                        ⚠ {error}
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/*uploading*/}
                {status === "uploading" && file && (
                    <div className="w-full">
                        <p className="mb-2 text-center text-sm text-gray-600">
                            {file.name}
                        </p>

                        <div className="rounde-[10px] m-auto h-5.5 w-full max-w-md overflow-hidden rounded-full bg-[#FFFFFF] p-1">
                            <div
                                className="h-3.5 rounded-full bg-[#2F27CE] transition-all duration-200"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>

                        <p className="mb-2 text-center text-sm text-gray-500">
                            Formatos compatibles: MP4, WebM, MOV, AVI • Tamaño
                            máximo: 500 MB
                        </p>
                    </div>
                )}

                {/*completed*/}
                {status === "completed" && file && (
                    <div className="m-auto flex w-full flex-col items-center justify-center gap-4">
                        <p className="h-8 text-center text-sm text-[#505050]">
                            Tu video se cargo con éxito
                        </p>
                        <p className="h-8 text-center font-semibold text-[#2F27CE]">
                            Carga completa!
                        </p>

                        <p className="h-8 text-center text-sm text-[#505050]">
                            Preparando video...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
