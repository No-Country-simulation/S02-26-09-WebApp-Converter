"use client";

import { useState, useRef, useEffect } from "react";
import { FileVideoCamera } from "lucide-react";
import { CloudUpload } from "lucide-react";


type UploadCardProps = {
    onUploadComplete?: (file: File) => void;
};

export default function UploadCard({
    onUploadComplete,
}: UploadCardProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<
        "idle" | "uploading" | "completed"
    >("idle");

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const completedTimeoutRef =
        useRef<NodeJS.Timeout | null>(null);

    const startUpload = (selectedFile: File) => {
        setProgress(0);
        setStatus("uploading");

        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 5;

                if (next >= 100) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;

                    setStatus("completed");

                    //se rendicciona
                    completedTimeoutRef.current =
                        setTimeout(() => {
                            if (onUploadComplete) {
                                onUploadComplete(
                                    selectedFile,
                                );
                            }
                        }, 3000);

                    return 100;
                }

                return next;
            });
        }, 150);
    };

    const handleFile = (selectedFile: File) => {
        if (!selectedFile.type.startsWith("video/")) {
            setError("Formatos compatibles: MP4-WebM-MOV-AVI");
            return;
        }
        
        
        setFile(selectedFile);
        startUpload(selectedFile);
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

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setError(null);
        }, 4000);

        return () => clearTimeout(timer);
    }, [error]);



    return (
        <div className="w-178 h-89.25 rounded-2xl flex flex-col py-8 px-6 m-auto border border-[#797979] mt-10 border-dashed bg-[#F2F2F7] gap-7.25">
            {status === "idle" && (
                <p className="w-22.5 h-5.5 flex justify-center items-center text-center  m-auto text-gray-500">
                    <CloudUpload className="w-22.5 h-5.5 text-gray-500" />
                </p>
            )}

            {status === "uploading" && (
                <p className="w-8 h-8 m-auto">
                    <FileVideoCamera className="w-5.5 h-6 m-auto text-[#2F27CE]" />
                </p>
            )}

            {status !== "completed" && (
                <>
                    <p className="text-center text-[#050315] font-semibold text-lg">
                        Subí tu video
                    </p>
                </>
            )}

            {status !== "completed" && (
                <>
                    <p className="text-center font-semibold text-sm text-[#505050]">
                        Arrastrá y soltá tu video horizontal
                        o hace clic para explorar
                    </p>
                </>
            )}
            {/*idle*/}
            {status === "idle" && (
                <>
                    <label className="w-43.75 h-12.5 m-auto flex items-center justify-center gap-2 bg-[#2F27CE] text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-[#433BFF] transition">
                        <FileVideoCamera className="w-5 h-5" />
                        <span>Subir video</span>

                        <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                                const selected =
                                    e.target.files?.[0];
                                if (selected)
                                    handleFile(selected);
                            }}
                        />
                    </label>
                    <p className="text-center font-semibold text-sm text-[#505050]">
                        Formatos compatibles: MP4, WebM,
                        MOV, AVI • Tamaño máximo: 500 MB
                    </p>
                        {/*preguntar!!!!*/}
                    {error && (
                        <p className="w-80 bg-red-600 text-center m-auto text-white text-sm rounded-md p-2 animate-pulse">
                            {error}
                        </p>
                    )}
                </>
            )}

            {/*uploading*/}
            {status === "uploading" && file && (
                <div className="w-full">
                    <p className="text-sm text-gray-600 mb-2 text-center">
                        {file.name}
                    </p>

                    <div className="w-119 m-auto h-5.5  p-1 rounde-[10px] bg-[#FFFFFF] rounded-full overflow-hidden">
                        <div
                            className="h-3 rounded-full bg-[#2F27CE] transition-all duration-200"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>

                    <p className="text-sm text-center mb-2 text-gray-500">
                        Formatos compatibles: MP4, WebM,
                        MOV, AVI • Tamaño máximo: 500 MB
                    </p>
                </div>
            )}

            {/*completed*/}
            {status === "completed" && file && (
                <div className="w-166  flex flex-col m-auto justify-center items-center gap-4">
                    <p className="h-8 text-sm text-[#505050]">
                        Tu video se cargo con éxito
                    </p>
                    <p className=" h-8 text-[#2F27CE] font-semibold">
                        Carga completa!
                    </p>

                    <p className=" h-8 text-sm text-[#505050]">
                        Preparando video...
                    </p>
                </div>
            )}
        </div>
    );
}
