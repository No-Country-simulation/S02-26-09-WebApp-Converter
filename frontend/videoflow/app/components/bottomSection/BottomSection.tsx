import Image from "next/image";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

export default function BottomSection() {
    return (
        <section className="mt-20 bg-[#F2F2F7]">
            {/* Layout móvil: < 768px */}

            <div className="mx-12.5 py-[60.5px] md:mx-25 md:hidden md:max-w-125.5 md:py-20 lg:mx-46.75 lg:max-w-125.5  2xl:mx-87.5 2xl:max-w-125.5">
                <h2 className="flex justify-start text-[33px] leading-tight font-bold text-black md:justify-center">
                    Listo para crear tu primer short?
                </h2>
                <p className="flex justify-start text-[21px] leading-relaxed text-black md:justify-center">
                    Subí tu video y empezá a reutilizar tu contenido en minutos.
                </p>
                <div className="my-6.75 flex justify-start md:justify-center">
                    <Image
                        src="/short.jpg"
                        alt="Vista previa de video"
                        width={588}
                        height={303}
                        className="h-auto rounded-2xl object-cover shadow-lg"
                    />
                </div>
                <PrimaryButton />
            </div>

            {/* Layout tablet/desktop: >= 768px */}
            <div className="mx-12.5 hidden grid-cols-2 items-center gap-6 py-8 md:mx-25 md:grid md:py-10 lg:mx-46.75 lg:gap-8 lg:py-15  xl:gap-10 2xl:gap-12">
                <div className="space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-5 2xl:space-y-6">
                    <h2 className="text-[20px] leading-tight font-bold text-black md:text-[26px] lg:text-[32px] xl:text-[38px] 2xl:text-[48px]">
                        Listo para crear tu primer short?
                    </h2>
                    <p className="text-[14px] leading-relaxed text-black md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]">
                        Subí tu video y empezá a reutilizar tu contenido en
                        minutos.
                    </p>
                    <PrimaryButton />
                </div>
                <div className="flex items-start justify-end">
                    <Image
                        src="/short.jpg"
                        alt="Vista previa de video"
                        width={502}
                        height={326}
                        className="h-auto w-auto rounded-[10px] object-cover shadow-lg md:w-70 lg:w-[320px] xl:w-95 2xl:w-112.5"
                    />
                </div>
            </div>
        </section>
    );
}
