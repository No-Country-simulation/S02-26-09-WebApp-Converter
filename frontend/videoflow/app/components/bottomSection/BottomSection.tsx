import { Upload } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

export default function BottomSection() {
    return (
        <section className="bg-[#DEDCFF] mt-[80px] mb-[80px] ">
            {/* Layout móvil: < 768px */}

            <div className="mx-[50px] md:mx-[100px] lg:mx-[187px] xl:mx-[187px] 2xl:mx-[350px] md:hidden py-[60.5px] md:py-[80px] md:max-w-125.5 lg:max-w-125.5 xl:max-w-125.5 2xl:max-w-125.5 ">
                <h2 className="flex md:justify-center justify-start text-[33px] font-bold text-black leading-tight ">
                    Listo para crear tu primer short?
                </h2>
                <p className="flex md:justify-center justify-start text-[21px] text-black leading-relaxed ">
                    Subí tu video y empezá a reutilizar tu
                    contenido en minutos.
                </p>
                    <div className="flex md:justify-center justify-start my-[27px] ">
                    <Image
                        src="/short.jpg"
                        alt="Vista previa de video"
                        width={588}
                        height={303}
                        className="h-auto rounded-2xl shadow-lg object-cover "
                    />
                </div>
                <div className="flex justify-start">
                    <button className="inline-flex items-center justify-center gap-2 cursor-pointer bg-[#433BFF] text-white w-[179px] h-[57px] rounded-[10px] text-base font-semibold hover:bg-blue-800 transition-all">
                        <Upload className="w-5 h-5" />
                        Subir video
                    </button>
                </div>
            </div>
            
            {/* Layout tablet/desktop: >= 768px */}
            <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-center mx-[50px] md:mx-[100px] lg:mx-[187px] xl:mx-[187px] 2xl:mx-[350px] py-8 md:py-10 lg:py-[60px]">
    <div className="space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-5 2xl:space-y-6">

        <h2 className="text-[20px] md:text-[26px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px] font-bold text-black leading-tight">
            Listo para crear tu primer short?
        </h2>
        <p className="text-[14px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] text-black leading-relaxed">
            Subí tu video y empezá a reutilizar
            tu contenido en minutos.
        </p>
        <PrimaryButton />
    </div>
    <div className="flex justify-end items-start">
        <Image
            src="/short.jpg"
            alt="Vista previa de video"
            width={502}
            height={326}
            className="w-auto h-auto md:w-[280px] lg:w-[320px] xl:w-[380px] 2xl:w-[450px] rounded-[10px] shadow-lg object-cover"
        />
    </div>
</div>
            
        </section>
    );
}
