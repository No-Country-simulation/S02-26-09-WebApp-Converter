"use client";
import ErrorIcon from "../UI/icons/Error-Icon";
import RetryIcon from "../UI/icons/retry-Icon";
import Timeline from "../Timeline/Timeline";

export default function ErrorGenerated({ onRetry }: { onRetry: () => void }) {
    return (
        <>
            <Timeline currentStep={1} />
            <div className="mt-20 mb-18.25 flex w-full justify-center px-5 py-10">
                <div className="mx-auto flex max-h-89 min-h-89.25 w-151 max-w-3xl flex-col items-center justify-center rounded-2xl border border-gray-300/90 bg-[#F2F2F7] text-center shadow-[0px_4px_17.6px_0px_#0000001A]">
                    <h2 className="py-8 text-[27px] font-semibold text-[#000000]">
                        Algo salió mal
                    </h2>

                    <div className="mb-8 flex items-center justify-center">
                        <ErrorIcon className="animate-shakeSoft text-red-600" />
                    </div>

                    <button
                        onClick={onRetry}
                        className="group mb-15 flex h-10.5 w-34.5 cursor-pointer items-center justify-between gap-2 rounded-[10px] bg-[#E10A0A33] px-4.5 py-2 transition-all duration-300 hover:bg-red-600"
                    >
                        <p className="font-medium text-red-600 transition-colors duration-300 group-hover:text-white">
                            Reintentar
                        </p>

                        <div className="text-red-600 transition-colors duration-300 group-hover:text-white">
                            <RetryIcon />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}
