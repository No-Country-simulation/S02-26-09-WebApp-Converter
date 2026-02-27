import SuccessIcon from "../UI/icons/Success";
import { Timeline } from "@/app/upload-file/page";
export default function CortoSuccess() {
    
    return (
        <>
            <Timeline currentStep={4} />
            <div className="mt-20 flex w-full justify-center px-5 sm:px-12 md:px-39 lg:px-91 2xl:px-151">
                <div className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-300/90 bg-[#F2F2F7] text-center shadow-[0px_4px_17.6px_0px_#0000001A]">
                    <h2 className="py-8 text-[27px] font-semibold text-[#000000]">
                        Corto creado con éxito
                    </h2>

                    <div className="flex justify-center pt-10 pb-20">
                        <SuccessIcon />
                    </div>
                </div>
            </div>
        </>
    );
}
