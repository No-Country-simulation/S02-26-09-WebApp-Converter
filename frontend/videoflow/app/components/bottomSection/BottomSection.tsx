import { Upload } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

export default function BottomSection() {
    return (
        <section className="bg-[#DEDCFF] mt-12 mb-12">
            {/* Layout móvil: < 768px */}
            <div className="md:hidden px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-black leading-tight ">
                    Listo para crear tu primer short?
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Subí tu video y empezá a reutilizar tu
                    contenido en minutos.
                </p>
                <div className="flex justify-center py-2">
                    <Image
                        src="/short.jpg"
                        alt="Vista previa de video"
                        width={580}
                        height={502}
                        className="w-full max-w-125.5 sm:max-w-[502px]  h-auto rounded-2xl shadow-lg object-cover"
                    />
                </div>
                <div>
                    <button className="inline-flex items-center gap-2 cursor-pointer bg-[#433BFF] text-white  px-6 py-3 rounded-xl text-base font-semibold hover:bg-blue-800 transition-all">
                        <Upload className="w-5 h-5" />
                        Subir video
                    </button>
                </div>
            </div>

            {/* Layout tablet/desktop: >= 768px */}
            <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8 xl:gap-12 xl:mr-[227px] xl:ml-[227px] items-center px-6 md:px-[227px] lg:px-12 xl:px-20 2xl:px-32 py-8 md:py-10 lg:py-12">
                <div className="space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-black leading-tight">
                        Listo para crear tu primer short?
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-700 leading-relaxed">
                        Subí tu video y empezá a reutilizar
                        tu contenido en minutos.
                    </p>
                    <PrimaryButton />
                </div>
                <div className="flex justify-center md:justify-end">
                    <Image
                        src="/short.jpg"
                        alt="Vista previa de video"
                        width={702}
                        height={702}
                        className="w-full max-w-[502px] md:max-w-[502px] lg:max-w-[502px] xl:max-w-[502px] 2xl:max-w-[502px] h-auto rounded-2xl shadow-lg object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
